import { createClientSupabase } from "@/lib/supabase/client";

async function getCurrentUser() {
  const supabase = createClientSupabase();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw error;
  if (!user) throw new Error("User not authenticated");

  return { supabase, user };
}

export async function updateUserProfile(user: object, displayName: string, photoURL?: string) {
  const { supabase } = await getCurrentUser();

  const { error } = await supabase
    .from("user_profiles")
    .update({
      full_name: displayName,
      avatar_url: photoURL ?? null,
      updated_at: new Date().toISOString()
    })
    .eq("id", user.id);

  if (error) throw error;

  return true;
}

// export async function updateUserEmail(newEmail: string) {
//   const { supabase } = await getCurrentUser();

//   const { data, error } = await supabase.auth.updateUser({
//     email: newEmail,
//   });

//   if (error) throw error;

//   return data;
// }

// export async function updateUserPassword(newPassword: string) {
//   const { supabase } = await getCurrentUser();

//   const { data, error } = await supabase.auth.updateUser({
//     password: newPassword,
//   });

//   if (error) throw error;

//   return data;
// }

// export async function deleteUserAccount() {
//   const { supabase } = await getCurrentUser();

//   const { error } = await supabase.rpc("delete_current_user");

//   if (error) throw error;

//   return true;
// }