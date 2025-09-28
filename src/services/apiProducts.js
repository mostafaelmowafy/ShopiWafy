import { useSearchParams } from "react-router-dom";
import supabase from "../supabase";

// export const getProducts = async () => {
//   const { data, error } = await supabase.from("products").select("*");
//   if (error) throw error;

//   return data;
// };

export const getProducts = async () => {
  const { data: products, error } = await supabase.from("products").select(`
      *,
      product_variants (
        id,
        stock,
        price,
        sizes ( name )
      )
    `);
  if (error) throw error;

  // const { data: stocks, error: error2 } = await supabase
  //   .from("product_variants")
  //   .select("product_id, stock");

  // دمج الكمية داخل كل منتج
  const productsWithStock = products.map((product) => {
    const totalStock = product.product_variants.reduce(
      (sum, variant) => sum + variant.stock,
      0
    );
    return { ...product, totalStock };
  });

  return productsWithStock;
};

export const getCategories = async () => {
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, parent_id")
    .order("id", { ascending: true });

  if (error) throw error;
  return data;
};

export const getProductsByCategory = async (categoryId) => {
  if (!categoryId || categoryId === "all") {
    return getProducts();
  }
  // هات كل الفئات
  const { data: categories, error: catError } = await supabase
    .from("categories")
    .select("id, parent_id");

  if (catError) throw catError;

  // هات كل الأبناء للفئة المختارة
  const childIds = categories
    .filter((cat) => cat.parent_id === categoryId)
    .map((cat) => cat.id);

  // ضيف الـ id نفسه لو الفئة ممكن يكون ليها منتجات مباشرة
  const idsToSearch = [categoryId, ...childIds];

  // هات المنتجات اللي category_id بتاعها في القائمة
  const { data: products, error } = await supabase
    .from("products")
    .select(
      `
      *,
      product_variants (
        id,
        stock,
        price,
        sizes ( name )
      )
    `
    )
    .in("category_id", idsToSearch);

  if (error) throw error;

  const productsWithStock = products.map((product) => {
    const totalStock = product.product_variants.reduce(
      (sum, variant) => sum + variant.stock,
      0
    );
    return { ...product, totalStock };
  });

  return productsWithStock;
};
