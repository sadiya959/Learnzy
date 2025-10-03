import supabase from "./supabaseClient";

export const signUp = async (fullname, email, password) => {
  // User signup
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { fullname }, 
    },
  });

  if (error) {
    console.error("Error signing up:", error.message);
    return { error: error.message };
  }

  if (data?.user) {
    const { error: profileError } = await supabase
      .from("users")
      .insert({
        id: data.user.id,
        fullname,
      });

    if (profileError) {
      console.error("Error creating user profile:", profileError.message);
      return { error: profileError.message };
    }
  }

  return { user: data.user };
};


export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    console.error("Error signing in:", error?.message || "No user found");
    return { error: error?.message || "No user found" };
  }

  // Fetch role only if login succeeded
  const { data: profile, error: profileError } = await supabase
    .from("users")
    .select("role")
    .eq("id", data.user.id)
    .single();

  if (profileError) {
    console.error("Error fetching user role:", profileError.message);
    return { error: profileError.message };
  }

  return { user: data.user, role: profile?.role, session: data.session };
};



export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) return { error: error.message };
  return {error};
};