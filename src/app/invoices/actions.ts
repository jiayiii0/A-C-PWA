"use server";

import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { buildInvoiceDraft, getNextInvoiceNumber } from "@/lib/invoices";

function invoiceError(jobId: string, message: string): never {
  redirect(`/jobs/${jobId}?error=${encodeURIComponent(message)}`);
}

export async function generateInvoiceForJobAction(jobId: string, formData: FormData) {
  const supabase = createServerSupabaseClient();
  if (!supabase) {
    invoiceError(jobId, "Supabase is not configured yet. Add environment variables to generate invoices.");
  }

  const discount = Number(formData.get("discount") ?? 0);
  const issuedDate = new Date().toISOString().slice(0, 10);

  const { data: existingInvoice } = await supabase
    .from("invoices")
    .select("id")
    .eq("job_id", jobId)
    .maybeSingle();

  if (existingInvoice) {
    redirect(`/invoices?highlight=${existingInvoice.id}`);
  }

  const { data: job, error: jobErrorResult } = await supabase
    .from("jobs")
    .select("id,customer_id,price,status")
    .eq("id", jobId)
    .single();

  if (jobErrorResult || !job) {
    invoiceError(jobId, jobErrorResult?.message ?? "Job not found.");
  }

  if (job.status !== "completed") {
    invoiceError(jobId, "Complete the job before generating an invoice.");
  }

  const { data: existingInvoices, error: invoiceListError } = await supabase
    .from("invoices")
    .select("invoice_number");

  if (invoiceListError) {
    invoiceError(jobId, invoiceListError.message);
  }

  const invoiceNumbers = existingInvoices?.map((invoice) => invoice.invoice_number) ?? [];
  const draft = buildInvoiceDraft({
    invoiceNumber: getNextInvoiceNumber(invoiceNumbers, new Date(issuedDate).getFullYear()),
    jobId: job.id,
    customerId: job.customer_id,
    jobPrice: job.price,
    discount,
    issuedDate
  });

  const { data: invoice, error: insertError } = await supabase
    .from("invoices")
    .insert(draft)
    .select("id")
    .single();

  if (insertError || !invoice) {
    invoiceError(jobId, insertError?.message ?? "Invoice could not be created.");
  }

  redirect(`/invoices?highlight=${invoice.id}`);
}
