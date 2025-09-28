import supabase from "../supabase";

// export const getProduct = async (id) => {
//   const { data, error } = await supabase
//     .from("products")
//     .select("*")
//     .eq("id", id)
//     .single();
//   if (error) throw error;
//   return data;
// };

export const getProduct = async (id) => {
  const { data, error } = await supabase
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
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};
