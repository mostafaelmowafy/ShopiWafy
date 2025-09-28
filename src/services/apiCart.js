import supabase from "../supabase";

// ✅ Cart
export const getCartItems = async (userId) => {
  const { data, error } = await supabase
    .from("cart_items")
    .select(
      `
  id,
  quantity,
  products ( * ),
  product_variants (
    id,
    stock,
    price,
    sizes ( name )
  )
`
    )
    .eq("user_id", userId);

  if (error) throw error;

  return data;
};

export const addToCart = async ({
  userId,
  productId,
  variantId,
  quantity = 1,
}) => {
  // 1. جيب الصف الحالي (إن وجد)
  const { data: existing, error: fetchErr } = await supabase
    .from("cart_items")
    .select("id, quantity")
    .match({ user_id: userId, product_variant_id: variantId })
    .single();

  if (fetchErr && fetchErr.code !== "PGRST116") throw fetchErr;
  // PGRST116 = no rows found

  // 2. لو موجود، زود الكمية
  if (existing) {
    const newQty = existing.quantity + quantity;
    const { data, error } = await supabase
      .from("cart_items")
      .update({ quantity: newQty })
      .eq("id", existing.id);
    if (error) throw error;
    return data;
  }

  // 3. لو مش موجود، أدخله أول مرّة
  const { data, error } = await supabase.from("cart_items").insert([
    {
      user_id: userId,
      product_id: productId,
      product_variant_id: variantId,
      quantity,
    },
  ]);
  if (error) throw error;
  return data;
};

export const removeFromCart = async (cartItemId) => {
  return await supabase.from("cart_items").delete().eq("id", cartItemId);
};

export const updateCart = async ({ cartItemId, newValue }) => {
  const { data, error } = await supabase
    .from("cart_items")
    .update({ quantity: newValue })
    .eq("id", cartItemId)
    .select();

  if (error) throw error;

  return { data };
};

export async function clearCartItems(userId) {
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", userId);

  if (error) {
    console.error("Delete error:", error.message);
    throw error;
  }
}
