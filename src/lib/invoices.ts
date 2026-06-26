type InvoiceDraftInput = {
  invoiceNumber: string;
  jobId: string;
  customerId: string;
  jobPrice: number | string;
  discount?: number | string;
  issuedDate: string;
};

type PaymentAmount = {
  amount: number | string;
};

export type InvoicePaymentStatus = "paid" | "unpaid" | "partial";
export type PaymentMethod = "cash" | "bank_transfer" | "duitnow" | "tng_ewallet";

type PaymentDraftInput = {
  invoiceId: string;
  amount: number | string;
  method: PaymentMethod;
  notes?: string | null;
};

export function getNextInvoiceNumber(existingNumbers: string[], year = new Date().getFullYear()) {
  const prefix = `HA-${year}-`;
  const latest = existingNumbers
    .filter((invoiceNumber) => invoiceNumber.startsWith(prefix))
    .map((invoiceNumber) => Number(invoiceNumber.slice(prefix.length)))
    .filter(Number.isFinite)
    .sort((a, b) => b - a)[0] ?? 0;

  return `${prefix}${String(latest + 1).padStart(4, "0")}`;
}

function amount(value: number | string | undefined) {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function calculateInvoicePaymentSummary(totalValue: number | string, payments: PaymentAmount[]) {
  const total = amount(totalValue);
  const paidAmount = payments.reduce((sum, payment) => sum + amount(payment.amount), 0);
  const balanceDue = Math.max(total - paidAmount, 0);
  const paymentStatus: InvoicePaymentStatus = balanceDue <= 0 ? "paid" : paidAmount > 0 ? "partial" : "unpaid";

  return {
    paidAmount,
    balanceDue,
    paymentStatus
  };
}

export function buildPaymentDraft(input: PaymentDraftInput) {
  const paymentAmount = amount(input.amount);
  if (paymentAmount <= 0) {
    throw new Error("Payment amount must be greater than zero.");
  }

  return {
    invoice_id: input.invoiceId,
    amount: paymentAmount,
    method: input.method,
    notes: input.notes?.trim() || null
  };
}

export function buildInvoiceDraft(input: InvoiceDraftInput) {
  const subtotal = amount(input.jobPrice);
  const discount = Math.min(amount(input.discount), subtotal);

  return {
    invoice_number: input.invoiceNumber,
    job_id: input.jobId,
    customer_id: input.customerId,
    subtotal,
    discount,
    total: subtotal - discount,
    payment_status: "unpaid" as const,
    issued_date: input.issuedDate
  };
}
