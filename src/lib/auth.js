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


export async function getUserProfile(userId) {
  // Get current session
  const { data: sessionData } = await supabase.auth.getSession();

  // Try to fetch existing profile
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  // If ther is no profile create a new profile
  if (error && error.code === "PGRST116") {
    console.log("No profile found, creating one for:", userId);

    // Get user data
    const { data: userData } = await supabase.auth.getUser();

    const fullname =
      userData?.user?.user_metadata?.fullname ||
      userData?.user?.email?.split("@")[0] ||
      "New User";

    const { data: newProfile, error: profileError } = await supabase
      .from("users")
      .insert({
        id: userId,
        role: "student",
        fullname,
      })
      .select()
      .single();

    if (profileError) {
      console.error("Error creating profile:", profileError);
      throw profileError;
    } else {
      console.log("Profile created successfully:", newProfile);
      return newProfile;
    }
  }

  // General error
  if (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }

  // console.log("Existing profile found:", data);
  return data;
}

// Update profile
export const updateUserProfile = async (profileId, updates) => {
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", profileId)
    .select();

  if (error) throw error;
  return data[0];
};



export function onAuthChange(callback){

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
            callback(session?.user || null, event)
    })

    return () => data.subscription.unsubscribe();
}



export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error signing out:", error.message);
    return { error: error.message };
  }
  return { success: true };
};
