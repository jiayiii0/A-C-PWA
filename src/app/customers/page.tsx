import Link from "next/link";
import { Plus, Search, Snowflake } from "lucide-react";
import { ActionButton } from "@/components/action-button";
import { AppShell } from "@/components/app-shell";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { getCustomers } from "@/lib/data";

export default async function CustomersPage() {
  const customers = await getCustomers();

  return (
    <AppShell>
      <SectionCard title="Customers" eyebrow="CRM" action={<ActionButton href="/customers/new" icon={Plus}>Add customer</ActionButton>}>
        <div className="mb-5 flex items-center gap-3 rounded-2xl border border-line bg-slate-50 px-4 py-3">
          <Search className="h-5 w-5 text-muted" aria-hidden="true" />
          <input className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400" placeholder="Search by customer, phone, or address" />
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {customers.map((customer) => (
            <Link key={customer.id} href={`/customers/${customer.id}`} className="rounded-2xl border border-line bg-white p-5 transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-card">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-bold text-ink">{customer.name}</p>
                  <p className="mt-1 text-sm text-muted">{customer.phone}</p>
                </div>
                <StatusBadge tone={customer.contractStatus === "Active" ? "green" : customer.contractStatus === "Expiring Soon" ? "amber" : "slate"}>
                  {customer.contractStatus}
                </StatusBadge>
              </div>
              <p className="mt-4 text-sm leading-6 text-muted">{customer.address}</p>
              <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary">
                <Snowflake className="h-4 w-4" aria-hidden="true" />
                {customer.units} units · Next service {customer.nextService}
              </div>
            </Link>
          ))}
        </div>
      </SectionCard>
    </AppShell>
  );
}
