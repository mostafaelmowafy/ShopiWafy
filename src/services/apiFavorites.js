import toast from "react-hot-toast";
import supabase from "../supabase";

// ✅ Favorites
export const getFavorites = async (userId) => {
  const { data, error } = await supabase
    .from("favorites")
    .select("*, products(*)")
    .eq("user_id", userId);

  if (error) throw error;

  return data;
};

export const addToFavorites = async ({ userId, productId }) => {
  // 1. جيب الصف الحالي (إن وجد)
  const { data: existing, error: fetchErr } = await supabase
    .from("favorites")
    .select("id")
    .match({ user_id: userId, product_id: productId })
    .single();

  if (fetchErr && fetchErr.code !== "PGRST116") throw fetchErr;
  // PGRST116 = no rows found

  if (existing) {
    toast("It's already one of your fav!", {
      icon: "🙄",
    });
    return null;
  }

  const { data, error } = await supabase
    .from("favorites")
    .insert([{ user_id: userId, product_id: productId }]);
  if (error) throw error;
  return data;
};

export const removeFromFavorites = async (favoriteId) => {
  const { data, error } = await supabase
    .from("favorites")
    .delete()
    .eq("id", favoriteId);

  if (error) throw error;

  return data;
};
