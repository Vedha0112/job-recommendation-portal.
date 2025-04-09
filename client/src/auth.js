import supabase from './supabaseClient';

export async function signUpUser(email, password) {
    const { user, error } = await supabase.auth.signUp({ email, password });
    if (error) {
        console.error("Signup error:", error.message);
    } else {
        console.log("User signed up:", user);
    }
}

export async function loginUser(email, password) {
    const { user, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
        console.error("Login error:", error.message);
    } else {
        console.log("User logged in:", user);
    }
}
