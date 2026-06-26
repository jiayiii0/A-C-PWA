import { ReceiptText } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PrintButton } from "@/components/print-button";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { getInvoices } from "@/lib/data";
import { money } from "@/lib/utils";

export default async function InvoicesPage({ searchParams }: { searchParams?: { highlight?: string } }) {
  const invoices = await getInvoices();

  return (
    <AppShell>
      <SectionCard title="Invoices and payments" eyebrow="Finance">
        <div className="grid gap-4">
          {invoices.map((invoice) => (
            <div key={invoice.id} className={`rounded-2xl border bg-white p-5 transition hover:border-primary/30 hover:shadow-card ${searchParams?.highlight === invoice.id ? "border-primary shadow-card" : "border-line"}`}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"><ReceiptText className="h-6 w-6" /></div>
                  <div>
                    <p className="font-bold text-ink">{invoice.invoiceNumber}</p>
                    <p className="mt-1 text-sm text-muted">{invoice.customer} · Issued {invoice.issuedDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-lg font-black text-ink">{money(invoice.total)}</p>
                  <StatusBadge tone={invoice.status === "paid" ? "green" : invoice.status === "partial" ? "amber" : "red"}>{invoice.status.toUpperCase()}</StatusBadge>
                </div>
              </div>
              <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm text-muted print:bg-white">
                <div className="grid gap-2 sm:grid-cols-2">
                  <p><span className="font-semibold text-ink">Company:</span> Housely A/C</p>
                  <p><span className="font-semibold text-ink">Customer:</span> {invoice.customer}</p>
                  <p><span className="font-semibold text-ink">Invoice:</span> {invoice.invoiceNumber}</p>
                  <p><span className="font-semibold text-ink">Total:</span> {money(invoice.total)}</p>
                </div>
              </div>
              <PrintButton />
            </div>
          ))}
        </div>
      </SectionCard>
    </AppShell>
  );
}
