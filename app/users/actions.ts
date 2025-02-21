"use server";

import { createClient } from "@/utils/supabase/server";
import type { Database } from "@/database.types";

// TODO: This is a temporary function to get a user by id. will be replaced with authentication
export async function getUser(id: number) {
  const supabase = await createClient<Database>();
  const { data: user, error } = await supabase.from("users").select().eq('id', id);
  if (error) throw error;
  return user[0];
}

export async function getUsers(ids: number[]) {
  const supabase = await createClient<Database>();
  const { data: users, error } = await supabase
    .from("users")
    .select()
    .in('id', ids);
  
  if (error) throw error;
  return users;
}

