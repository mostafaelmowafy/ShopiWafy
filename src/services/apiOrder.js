import supabase from "../supabase";

// ✅ Orders
export const applyDiscount = (total, coupon) => {
  if (!coupon) return total;

  if (coupon.discount_type === "percentage") {
    return total - (total * coupon.discount_value) / 100;
  }

  if (coupon.discount_type === "fixed") {
    return Math.max(total - coupon.discount_value, 0);
  }

  return total;
};

export const createOrder = async ({ userId, items, coupon }) => {
  // 1. جلب أخر طلب pending
  const { data: existingOrder } = await supabase
    .from("orders")
    .select("id")
    .eq("user_id", userId)
    .eq("status", "pending")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  let order = existingOrder;

  if (existingOrder) {
    // 2. تحقق إذا أُضيفت عليه عناصر قبل كده
    const { data: existingItems } = await supabase
      .from("order_items")
      .select("id")
      .eq("order_id", existingOrder.id);

    // لو فيه عناصر، رجّع الطلب القديم دون تعديل
    if (existingItems?.length > 0) {
      return existingOrder;
    }
  } else {
    // 3. ما فيش طلب سابق → أنشئ طلب جديد
    const originalTotal = items.reduce(
      (sum, item) => sum + item.product_variants.price * item.quantity,
      0
    );
    console.log(originalTotal);
    const discountedTotal = applyDiscount(originalTotal, coupon);

    const { data: newOrder } = await supabase
      .from("orders")
      .insert([
        {
          user_id: userId,
          total: discountedTotal,
          status: "pending",
          coupon_code: coupon?.code || null,
        },
      ])
      .select()
      .single();

    order = newOrder;
  }

  // 4. تجهيز بيانات order_items
  const orderItems = items.map((item) => ({
    order_id: order.id,
    product_id: item.products.id,
    quantity: item.quantity,
    price: item.products.price,
  }));

  // 5. إدراج العناصر مع تتبع الأخطاء
  const { data: itemsData, error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems)
    .select();

  if (itemsError) {
    console.error("order_items insert failed:", itemsError);
    throw itemsError;
  }

  console.log("Inserted order_items:", itemsData);
  return order;
};

export const completeOrder = async (orderId) => {
  const { data: order, error: updateError } = await supabase
    .from("orders")
    .update({
      status: "prepares",
      updated_at: new Date().toISOString(),
    })
    .eq("id", orderId)
    .select()
    .single();

  if (updateError) throw updateError;

  // 2. بعد النجاح، امسح كل بنود السلة للمستخدم صاحب الطلب
  const { error: deleteCartError } = await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", order.user_id);

  if (deleteCartError) throw deleteCartError;

  return order;
};

export const changeOrderStatus = async ({ orderId, status }) => {
  console.log("Changing order", orderId, "to status", status);
  const { data: order, error: updateError } = await supabase
    .from("orders")
    .update({
      status: status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", orderId)
    .select()
    .single();

  if (updateError) throw updateError;

  return order;
};
export const cancelOrder = async (orderId, status = "cancelled") => {
  const { data: order, error: updateError } = await supabase
    .from("orders")
    .update({
      status: status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", orderId)
    .select()
    .single();

  if (updateError) throw updateError;

  return order;
};

export const validateCoupon = async (code, userId) => {
  const { data, error } = await supabase
    .from("coupons")
    .select("*")
    .eq("code", code)
    .single();

  if (error || !data) return null;

  const now = new Date();
  if (data.expires_at && new Date(data.expires_at) < now) return null;

  if (!data.is_global && data.user_id !== userId) return null;

  return data;
};

export const getOrders = async (userId) => {
  if (userId == "all") {
    const { data, error } = await supabase
      .from("orders")
      .select("*, order_items(*, products(*))")
      .order("created_at", { ascending: false });
    return data;
  } else {
    const { data, error } = await supabase
      .from("orders")
      .select("*, order_items(*, products(*))")
      .eq("user_id", userId);

    return data;
  }
};

export const getOrder = async (orderId) => {
  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*, products(*))")
    .eq("id", orderId)
    .single();

  if (error) {
    console.error("getOrder error:", error);
    throw error;
  }

  return data;
};

export async function getDailySalesForMonth(
  month = new Date().getMonth() + 1,
  year = new Date().getFullYear()
) {
  const days = [];
  const totalDays = new Date(year, month, 0).getDate(); // عدد أيام الشهر

  for (let day = 1; day <= totalDays; day++) {
    const date = new Date(year, month - 1, day);
    const key = date.toLocaleDateString("en-GB"); // "01/09/2025"
    days.push({ day: key, total: 0 });
  }

  const { data, error } = await supabase
    .from("orders")
    .select("created_at, total");

  if (error) throw error;

  const dailyTotals = Object.fromEntries(days.map((d) => [d.day, d]));

  data.forEach((order) => {
    const date = new Date(order.created_at);
    const orderMonth = date.getMonth() + 1;
    const orderYear = date.getFullYear();

    if (orderMonth === month && orderYear === year) {
      const dayKey = date.toLocaleDateString("en-GB"); // مثال: "28/09/2025"
      dailyTotals[dayKey].total += order.total;
    }
  });

  return Object.values(dailyTotals);
}
