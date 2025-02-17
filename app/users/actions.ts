"use server";

import { createClient } from "@/utils/supabase/server";
import type { Database } from "@/database.types";


export async function getUser(id: number) {
  const supabase = await createClient<Database>();
  const { data: user, error } = await supabase.from("users").select().eq('id', id);
  if (error) throw error;
  return user[0];
}
