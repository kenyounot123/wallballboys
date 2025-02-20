"use server";

import { createClient } from "@/utils/supabase/server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function getSession() {
  //   const supabase = createServerComponentClient({ cookies });
  const supabase = await createClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error("Error retrieving session:", error);
    return null;
  }

  return session; // Contains user info, access token, etc.
}

export async function signOut() {
  // async function signOut() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();
}

export async function signIn() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.BASE_URL}/auth/callback`,
    },
  });

  console.log("hitting sign in ===> ", data);

  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function getUsers() {
  const supabase = await createClient();
  const session = await getSession();

  if (!session) {
    return null;
  }

  const email = session.user.email;

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  return {
    session,
    user
  };
}
