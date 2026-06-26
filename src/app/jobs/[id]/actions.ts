"use server";

import { redirect } from "next/navigation";
import { createServerSupabaseClient, getCurrentUser } from "@/lib/supabase-server";
import { buildServicePhotoPath, isUploadableImage, SERVICE_PHOTO_BUCKET } from "@/lib/storage";
import { validateServiceRecordInput } from "@/lib/validators";

async function uploadPhotos(
  supabase: NonNullable<ReturnType<typeof createServerSupabaseClient>>,
  jobId: string,
  stage: "before" | "after",
  files: File[]
) {
  const uploaded: string[] = [];

  for (let index = 0; index < files.length; index += 1) {
    const file = files[index];
    if (!isUploadableImage(file)) continue;

    const path = buildServicePhotoPath(jobId, stage, file.name, index);
    const { error } = await supabase.storage.from(SERVICE_PHOTO_BUCKET).upload(path, file, {
      cacheControl: "3600",
      upsert: true
    });

    if (error) {
      throw new Error(error.message);
    }

    uploaded.push(path);
  }

  return uploaded;
}

function jobError(jobId: string, message: string): never {
  redirect(`/jobs/${jobId}?error=${encodeURIComponent(message)}`);
}

export async function saveServiceRecordAction(jobId: string, formData: FormData) {
  const result = validateServiceRecordInput({
    status: formData.get("status"),
    remarks: formData.get("remarks"),
    parts_used: formData.get("parts_used"),
    total_price: formData.get("total_price"),
    warranty_days: formData.get("warranty_days")
  });

  if (!result.ok) {
    jobError(jobId, result.errors.join(" "));
  }
  const serviceRecord = result.data;

  const supabase = createServerSupabaseClient();
  if (!supabase) {
    jobError(jobId, "Supabase is not configured yet. Add environment variables to enable saving service records.");
  }

  const user = await getCurrentUser();
  if (!user) {
    redirect(`/login?next=${encodeURIComponent(`/jobs/${jobId}`)}`);
  }

  const { data: job, error: jobLoadError } = await supabase
    .from("jobs")
    .select("id,customer_id,service_type,scheduled_date,price")
    .eq("id", jobId)
    .single();

  if (jobLoadError || !job) {
    jobError(jobId, jobLoadError?.message ?? "Job not found.");
  }

  const beforePhotos = await uploadPhotos(supabase, jobId, "before", formData.getAll("before_photos").filter((item): item is File => item instanceof File));
  const afterPhotos = await uploadPhotos(supabase, jobId, "after", formData.getAll("after_photos").filter((item): item is File => item instanceof File));

  const { error: updateError } = await supabase.from("jobs").update({ status: serviceRecord.status }).eq("id", jobId);
  if (updateError) {
    jobError(jobId, updateError.message);
  }

  if (serviceRecord.status === "completed") {
    const { error: recordError } = await supabase.from("service_records").insert({
      job_id: job.id,
      customer_id: job.customer_id,
      technician_id: user.id,
      service_type: job.service_type,
      service_date: job.scheduled_date,
      before_photo_urls: beforePhotos,
      after_photo_urls: afterPhotos,
      remarks: serviceRecord.remarks,
      parts_used: serviceRecord.parts_used,
      total_price: serviceRecord.total_price || job.price,
      warranty_days: serviceRecord.warranty_days
    });

    if (recordError) {
      jobError(jobId, recordError.message);
    }
  }

  redirect(`/jobs/${jobId}?saved=1`);
}
