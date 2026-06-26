import { Printer, ReceiptText } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { getInvoices } from "@/lib/data";
import { money } from "@/lib/utils";

export default async function InvoicesPage() {
  const invoices = await getInvoices();

  return (
    <AppShell>
      <SectionCard title="Invoices and payments" eyebrow="Finance">
        <div className="grid gap-4">
          {invoices.map((invoice) => (
            <div key={invoice.id} className="rounded-2xl border border-line bg-white p-5 transition hover:border-primary/30 hover:shadow-card">
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
              <button className="focus-ring mt-4 inline-flex items-center gap-2 rounded-2xl border border-line bg-white px-4 py-2 text-sm font-bold text-muted hover:bg-slate-50" type="button">
                <Printer className="h-4 w-4" /> Print or save PDF
              </button>
            </div>
          ))}
        </div>
      </SectionCard>
    </AppShell>
  );
}
