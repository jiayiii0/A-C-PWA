import { CalendarPlus, MapPin, MessageCircle, Snowflake } from "lucide-react";
import { ActionButton } from "@/components/action-button";
import { AppShell } from "@/components/app-shell";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { getCustomerById, getJobs } from "@/lib/data";
import { jobTone, labelize } from "@/lib/utils";

export default async function CustomerDetailPage({ params }: { params: { id: string } }) {
  const [customer, jobs] = await Promise.all([getCustomerById(params.id), getJobs()]);
  const customerJobs = jobs.filter((job) => job.customer === customer.name);

  return (
    <AppShell>
      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <SectionCard title={customer.name} eyebrow={customer.type}>
          <div className="space-y-4">
            <p className="text-sm leading-6 text-muted">{customer.notes}</p>
            <div className="rounded-2xl bg-slate-50 p-4 text-sm text-muted"><MapPin className="mb-2 h-5 w-5 text-primary" />{customer.address}</div>
            <div className="grid gap-3 sm:grid-cols-2">
              <ActionButton href={`https://wa.me/${customer.whatsapp}`} icon={MessageCircle} variant="secondary">WhatsApp</ActionButton>
              <ActionButton href="/schedule" icon={CalendarPlus}>Schedule job</ActionButton>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Service history" eyebrow="Records">
          <div className="space-y-3">
            {customerJobs.map((job) => (
              <div key={job.id} className="rounded-2xl border border-line bg-white p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-bold text-ink">{labelize(job.serviceType)}</p>
                  <StatusBadge tone={jobTone(job.status)}>{labelize(job.status)}</StatusBadge>
                </div>
                <p className="mt-2 text-sm text-muted">{job.date} · {job.time} · {job.technician}</p>
              </div>
            ))}
            <div className="rounded-2xl bg-cyan/10 p-4 text-sm font-semibold text-cyan">
              <Snowflake className="mb-2 h-5 w-5" /> {customer.units} air conditioner units on file. Next service: {customer.nextService}.
            </div>
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}
