"use server";

import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import {
  buildInvoiceDraft,
  buildPaymentDraft,
  calculateInvoicePaymentSummary,
  getNextInvoiceNumber,
  PaymentMethod
} from "@/lib/invoices";

function invoiceError(jobId: string, message: string): never {
  redirect(`/jobs/${jobId}?error=${encodeURIComponent(message)}`);
}

function paymentRedirect(invoiceId: string, status: "success" | "error", message: string): never {
  redirect(`/invoices?highlight=${invoiceId}&${status}=${encodeURIComponent(message)}`);
}

function isPaymentMethod(value: FormDataEntryValue | null): value is PaymentMethod {
  return value === "cash" || value === "bank_transfer" || value === "duitnow" || value === "tng_ewallet";
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

export async function recordPaymentForInvoiceAction(invoiceId: string, formData: FormData) {
  const supabase = createServerSupabaseClient();
  if (!supabase) {
    paymentRedirect(invoiceId, "error", "Supabase is not configured yet. Add environment variables to record payments.");
  }

  const methodValue = formData.get("method");
  if (!isPaymentMethod(methodValue)) {
    paymentRedirect(invoiceId, "error", "Choose a valid payment method.");
  }

  let draft;
  try {
    draft = buildPaymentDraft({
      invoiceId,
      amount: String(formData.get("amount") ?? ""),
      method: methodValue,
      notes: String(formData.get("notes") ?? "")
    });
  } catch (error) {
    paymentRedirect(invoiceId, "error", error instanceof Error ? error.message : "Payment could not be recorded.");
  }

  const { data: invoice, error: invoiceErrorResult } = await supabase
    .from("invoices")
    .select("id,total,payments(amount)")
    .eq("id", invoiceId)
    .single();

  if (invoiceErrorResult || !invoice) {
    paymentRedirect(invoiceId, "error", invoiceErrorResult?.message ?? "Invoice not found.");
  }

  const { error: insertError } = await supabase.from("payments").insert(draft);
  if (insertError) {
    paymentRedirect(invoiceId, "error", insertError.message);
  }

  const existingPayments = Array.isArray(invoice.payments) ? invoice.payments : [];
  const summary = calculateInvoicePaymentSummary(invoice.total, [...existingPayments, { amount: draft.amount }]);
  const { error: updateError } = await supabase
    .from("invoices")
    .update({ payment_status: summary.paymentStatus })
    .eq("id", invoiceId);

  if (updateError) {
    paymentRedirect(invoiceId, "error", updateError.message);
  }

  paymentRedirect(invoiceId, "success", "Payment recorded.");
}
