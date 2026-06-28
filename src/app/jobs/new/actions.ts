"use server";

import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { validateJobInput } from "@/lib/validators";

async function findTechnicianId(supabase: NonNullable<ReturnType<typeof createServerSupabaseClient>>, fullName: string) {
  const { data, error } = await supabase
    .from("users")
    .select("id")
    .eq("role", "technician")
    .eq("full_name", fullName)
    .maybeSingle();

  if (error || !data?.id) return null;
  return data.id as string;
}

export async function createJobAction(formData: FormData) {
  const result = validateJobInput({
    customer_id: formData.get("customer_id"),
    technician_name: formData.get("technician_name"),
    service_type: formData.get("service_type"),
    scheduled_date: formData.get("scheduled_date"),
    scheduled_time: formData.get("scheduled_time"),
    status: formData.get("status"),
    address: formData.get("address"),
    price: formData.get("price"),
    notes: formData.get("notes")
  });

  if (!result.ok) {
    redirect(`/jobs/new?error=${encodeURIComponent(result.errors.join(" "))}`);
  }

  const supabase = createServerSupabaseClient();
  if (!supabase) {
    redirect(`/jobs/new?error=${encodeURIComponent("Supabase is not configured yet. Add environment variables to create jobs.")}`);
  }

  const { technician_name: technicianName, ...jobData } = result.data;
  const assignedTo = await findTechnicianId(supabase, technicianName);
  const { data, error } = await supabase
    .from("jobs")
    .insert({ ...jobData, assigned_to: assignedTo })
    .select("id")
    .single();

  if (error || !data?.id) {
    redirect(`/jobs/new?error=${encodeURIComponent(error?.message ?? "Unable to create job.")}`);
  }

  redirect(`/jobs/${data.id}?success=${encodeURIComponent("Job created.")}`);
}
