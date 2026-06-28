import { CalendarPlus, ClipboardList, CreditCard, DollarSign, Plus, Users, Wrench } from "lucide-react";
import { ActionButton } from "@/components/action-button";
import { AppShell } from "@/components/app-shell";
import { MetricCard } from "@/components/metric-card";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { getContracts, getInvoices, getTodayJobs } from "@/lib/data";
import { jobTone, labelize, money } from "@/lib/utils";

export default async function DashboardPage() {
  const [todayJobs, contracts, invoices] = await Promise.all([getTodayJobs(), getContracts(), getInvoices()]);
  const pendingPayments = invoices.filter((invoice) => invoice.balanceDue > 0);
  const outstandingTotal = pendingPayments.reduce((sum, invoice) => sum + invoice.balanceDue, 0);
  const paidTotal = invoices.reduce((sum, invoice) => sum + invoice.paidAmount, 0);

  return (
    <AppShell>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Today's jobs" value={String(todayJobs.length)} helper="2 technicians scheduled" icon={Wrench} accent="blue" />
        <MetricCard label="Upcoming services" value="2" helper="Within the next 7 days" icon={CalendarPlus} accent="cyan" />
        <MetricCard label="Pending payments" value={String(pendingPayments.length)} helper={money(outstandingTotal) + " to collect"} icon={CreditCard} accent="amber" />
        <MetricCard label="Monthly revenue" value={money(paidTotal)} helper="Collected invoice payments" icon={DollarSign} accent="green" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <SectionCard title="Today&apos;s jobs" eyebrow="Field work" action={<ActionButton href="/schedule" icon={CalendarPlus} variant="plain">View schedule</ActionButton>}>
          <div className="space-y-3">
            {todayJobs.map((job) => (
              <div key={job.id} className="rounded-2xl border border-line bg-white p-4 transition hover:border-primary/40 hover:shadow-card">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-bold text-ink">{job.customer}</p>
                    <p className="mt-1 text-sm text-muted">{labelize(job.serviceType)} at {job.time} with {job.technician}</p>
                  </div>
                  <StatusBadge tone={jobTone(job.status)}>{labelize(job.status)}</StatusBadge>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Quick actions" eyebrow="Owner shortcuts">
          <div className="grid gap-3">
            <ActionButton href="/customers/new" icon={Users}>Add customer</ActionButton>
            <ActionButton href="/jobs/new" icon={Plus} variant="secondary">Add job</ActionButton>
            <ActionButton href="/contracts" icon={ClipboardList} variant="plain">View contracts</ActionButton>
          </div>
          <div className="mt-5 rounded-2xl bg-slate-50 p-4">
            <p className="text-sm font-bold text-ink">Expiring soon</p>
            <p className="mt-1 text-sm text-muted">{contracts.filter((contract) => contract.status === "Expiring Soon").length} contract needs renewal follow-up.</p>
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}
