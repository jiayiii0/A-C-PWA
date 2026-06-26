import { CreditCard, ReceiptText, WalletCards } from "lucide-react";
import { recordPaymentForInvoiceAction } from "@/app/invoices/actions";
import { AppShell } from "@/components/app-shell";
import { fieldClass, FormField } from "@/components/form-field";
import { PrintButton } from "@/components/print-button";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { getInvoices } from "@/lib/data";
import { money } from "@/lib/utils";

const paymentMethods = [
  { value: "cash", label: "Cash" },
  { value: "bank_transfer", label: "Bank transfer" },
  { value: "duitnow", label: "DuitNow" },
  { value: "tng_ewallet", label: "TNG eWallet" }
] as const;

function invoiceTone(status: "paid" | "partial" | "unpaid") {
  return status === "paid" ? "green" : status === "partial" ? "amber" : "red";
}

export default async function InvoicesPage({
  searchParams
}: {
  searchParams?: { highlight?: string; success?: string; error?: string };
}) {
  const invoices = await getInvoices();
  const outstandingTotal = invoices.reduce((sum, invoice) => sum + invoice.balanceDue, 0);
  const paidTotal = invoices.reduce((sum, invoice) => sum + invoice.paidAmount, 0);
  const pendingCount = invoices.filter((invoice) => invoice.balanceDue > 0).length;

  return (
    <AppShell>
      <SectionCard title="Invoices and payments" eyebrow="Finance">
        {searchParams?.success ? (
          <div className="mb-5 rounded-2xl border border-success/20 bg-success/10 px-4 py-3 text-sm font-semibold text-emerald-700">
            {searchParams.success}
          </div>
        ) : null}
        {searchParams?.error ? (
          <div className="mb-5 rounded-2xl border border-danger/20 bg-danger/10 px-4 py-3 text-sm font-semibold text-red-700">
            {searchParams.error}
          </div>
        ) : null}

        <div className="mb-5 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-line bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-muted">Outstanding</p>
            <p className="mt-2 text-2xl font-black text-ink">{money(outstandingTotal)}</p>
          </div>
          <div className="rounded-2xl border border-line bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-muted">Paid collected</p>
            <p className="mt-2 text-2xl font-black text-success">{money(paidTotal)}</p>
          </div>
          <div className="rounded-2xl border border-line bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-muted">Needs follow-up</p>
            <p className="mt-2 text-2xl font-black text-ink">{pendingCount}</p>
          </div>
        </div>

        <div className="grid gap-4">
          {invoices.map((invoice) => {
            const paymentAction = recordPaymentForInvoiceAction.bind(null, invoice.id);

            return (
              <div key={invoice.id} className={`rounded-2xl border bg-white p-5 transition hover:border-primary/30 hover:shadow-card ${searchParams?.highlight === invoice.id ? "border-primary shadow-card" : "border-line"}`}>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"><ReceiptText className="h-6 w-6" /></div>
                    <div>
                      <p className="font-bold text-ink">{invoice.invoiceNumber}</p>
                      <p className="mt-1 text-sm text-muted">{invoice.customer} - Issued {invoice.issuedDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-lg font-black text-ink">{money(invoice.total)}</p>
                    <StatusBadge tone={invoiceTone(invoice.status)}>{invoice.status.toUpperCase()}</StatusBadge>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-muted">Paid</p>
                    <p className="mt-1 text-lg font-black text-success">{money(invoice.paidAmount)}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-muted">Balance</p>
                    <p className="mt-1 text-lg font-black text-ink">{money(invoice.balanceDue)}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-muted">Discount</p>
                    <p className="mt-1 text-lg font-black text-ink">{money(invoice.discount)}</p>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm text-muted print:bg-white">
                  <div className="grid gap-2 sm:grid-cols-2">
                    <p><span className="font-semibold text-ink">Company:</span> Housely A/C</p>
                    <p><span className="font-semibold text-ink">Customer:</span> {invoice.customer}</p>
                    <p><span className="font-semibold text-ink">Invoice:</span> {invoice.invoiceNumber}</p>
                    <p><span className="font-semibold text-ink">Subtotal:</span> {money(invoice.subtotal)}</p>
                    <p><span className="font-semibold text-ink">Total:</span> {money(invoice.total)}</p>
                    <p><span className="font-semibold text-ink">Balance due:</span> {money(invoice.balanceDue)}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-3 print:hidden">
                  {invoice.balanceDue > 0 ? (
                    <form action={paymentAction} className="rounded-2xl border border-line bg-white p-4">
                      <div className="flex items-center gap-2 text-sm font-bold text-ink">
                        <WalletCards className="h-4 w-4 text-cyan" aria-hidden="true" />
                        Record payment
                      </div>
                      <div className="mt-4 grid gap-3 md:grid-cols-[1fr_1fr_1.2fr_auto] md:items-end">
                        <FormField label="Amount">
                          <input className={fieldClass} name="amount" type="number" min="0.01" step="0.01" placeholder={String(invoice.balanceDue)} />
                        </FormField>
                        <FormField label="Method">
                          <select className={fieldClass} name="method" defaultValue="duitnow">
                            {paymentMethods.map((method) => (
                              <option key={method.value} value={method.value}>{method.label}</option>
                            ))}
                          </select>
                        </FormField>
                        <FormField label="Notes">
                          <input className={fieldClass} name="notes" placeholder="Receipt, bank ref, or reminder" />
                        </FormField>
                        <button type="submit" className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-blue-700">
                          <CreditCard className="h-4 w-4" aria-hidden="true" />
                          Save
                        </button>
                      </div>
                    </form>
                  ) : null}
                  <PrintButton />
                </div>
              </div>
            );
          })}
        </div>
      </SectionCard>
    </AppShell>
  );
}
