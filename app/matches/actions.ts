"use server";
import { createClient } from "@/utils/supabase/server";
import type { Database } from "@/database.types";
import type { InsertMatch } from "@/types/matches";

export async function createMatch(formData: FormData) {
  const supabase = await createClient<Database>();

  const match = {
    creator: 1,
    status: "invalidated",
  } as InsertMatch;

  const { data, error } = await supabase.from("matches").insert(match).select();
  if (error) throw error;
  console.log(data);
}
