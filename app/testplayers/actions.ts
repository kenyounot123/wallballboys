"use server"

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function getAllUsers() {
    const supabase = await createClient();
    const { data: users, error } = await supabase.from("users").select("*").range(0,9)

    if (error) {
        redirect("/error")
    }

    return users
}