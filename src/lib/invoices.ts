type InvoiceDraftInput = {
  invoiceNumber: string;
  jobId: string;
  customerId: string;
  jobPrice: number | string;
  discount?: number | string;
  issuedDate: string;
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
