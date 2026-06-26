"use server";

import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/auth-utils";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { validateLoginInput } from "@/lib/validators";

function loginError(message: string, next: string): never {
  redirect(`/login?next=${encodeURIComponent(next)}&error=${encodeURIComponent(message)}`);
}

export async function signInAction(formData: FormData) {
  const next = String(formData.get("next") || "/dashboard");
  const result = validateLoginInput({
    email: formData.get("email"),
    password: formData.get("password")
  });

  if (!result.ok) {
    loginError(result.errors.join(" "), next);
  }
  const credentials = result.data;

  if (!isSupabaseConfigured()) {
    loginError("Supabase Auth is not configured yet. Add your Supabase environment variables first.", next);
  }

  const supabase = createServerSupabaseClient();
  if (!supabase) {
    loginError("Supabase Auth is not configured yet. Add your Supabase environment variables first.", next);
  }

  const { error } = await supabase.auth.signInWithPassword(credentials);
  if (error) {
    loginError(error.message, next);
  }

  redirect(next);
}

export async function signOutAction() {
  const supabase = createServerSupabaseClient();
  if (supabase) {
    await supabase.auth.signOut();
  }

  redirect("/login");
}
