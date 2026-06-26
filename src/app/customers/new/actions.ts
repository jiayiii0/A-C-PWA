"use server";

import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { validateCustomerInput } from "@/lib/validators";

export async function createCustomerAction(formData: FormData) {
  const result = validateCustomerInput({
    name: formData.get("name"),
    phone: formData.get("phone"),
    whatsapp: formData.get("whatsapp"),
    address: formData.get("address"),
    customer_type: formData.get("customer_type"),
    notes: formData.get("notes")
  });

  if (!result.ok) {
    redirect(`/customers/new?error=${encodeURIComponent(result.errors.join(" "))}`);
  }

  const supabase = createServerSupabaseClient();
  if (!supabase) {
    redirect(`/customers/new?error=${encodeURIComponent("Supabase is not configured yet. Add environment variables to enable saving.")}`);
  }

  const { error } = await supabase.from("customers").insert(result.data);
  if (error) {
    redirect(`/customers/new?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/customers");
}
