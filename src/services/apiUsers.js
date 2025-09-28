import useUser from "../components/authentication/useUser";
import supabase from "../supabase";

// ✅ Auth
export const signup = async ({ email, password, fullName }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { fullName, avatar: "", role: "admin" },
    },
  });
  if (error) throw new Error(error.message);

  return data;
};

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getUsers() {
  const { data, error } = await supabase.from("profiles").select("*");
  if (error) throw new Error(error.message);
  return data;
}
export async function getUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data: userData, error } = await supabase.auth.getUser();
  const userId = userData?.user?.id;

  if (!userId) return null;

  const { data: profile, error: error1 } = await supabase
    .from("profiles")
    .select("full_name, avatar_url, role")
    .eq("id", userId)
    .single();

  if (error1) throw new Error(error1.message);
  return profile;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export const addProduct = async (product) => {
  return await supabase.from("products").insert([product]);
};

// ✅ Profile
export const getProfile = async (userId) => {
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  return data;
};

export const updateProfile = async ({
  userId,
  full_name,
  phone_number,
  address,
}) => {
  if (!full_name) return toast.error("Please enter your full name");
  const { error } = await supabase
    .from("profiles")
    .update({ full_name, phone_number, address })
    .eq("id", userId);

  if (error) throw error;

  // .حدث  user_metadata
  const { data, error: error2 } = await supabase.auth.updateUser({
    data: { fullName: full_name },
  });
  if (error2) throw error2;
  return data; // يحتوي على user وِفقًا للتوثيق الجديد
};

// 2. تحديث الإيميل عبر Auth API (يرسِل رابط التحقق للمستخدم)
// export const updateUserEmail = async (newEmail) => {
//   const { data, error } = await supabase.auth.updateUser({
//     email: newEmail,
//   });

//   if (error) throw error;
//   return data; // يحتوي على user وِفقًا للتوثيق الجديد
// };

// ✅ Upload Image
export const uploadProductImage = async (file) => {
  const fileName = `${Date.now()}_${file.name}`;
  const { error } = await supabase.storage
    .from("product-images")
    .upload(fileName, file, {
      contentType: file.type,
      upsert: false,
    });

  if (error) throw error;

  const { data } = supabase.storage
    .from("product-images")
    .getPublicUrl(fileName);

  return data.publicUrl;
};
