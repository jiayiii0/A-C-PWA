import { Camera, CheckCircle2, MapPin, MessageCircle, Save } from "lucide-react";
import { ActionButton } from "@/components/action-button";
import { AppShell } from "@/components/app-shell";
import { fieldClass, FormField } from "@/components/form-field";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { jobs } from "@/lib/mock-data";
import { jobTone, labelize, money } from "@/lib/utils";

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const job = jobs.find((item) => item.id === params.id) ?? jobs[0];

  return (
    <AppShell>
      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <SectionCard title={job.customer} eyebrow={labelize(job.serviceType)}>
          <div className="space-y-4">
            <StatusBadge tone={jobTone(job.status)}>{labelize(job.status)}</StatusBadge>
            <p className="text-sm leading-6 text-muted">{job.date} at {job.time} · Assigned to {job.technician} · {money(job.price)}</p>
            <div className="rounded-2xl bg-slate-50 p-4 text-sm text-muted"><MapPin className="mb-2 h-5 w-5 text-primary" />{job.address}</div>
            <div className="grid gap-3 sm:grid-cols-2">
              <ActionButton href="https://wa.me/60127789011" icon={MessageCircle} variant="secondary">WhatsApp customer</ActionButton>
              <ActionButton href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(job.address)}`} icon={MapPin}>Navigate</ActionButton>
            </div>
          </div>
        </SectionCard>
        <SectionCard title="Service record" eyebrow="Technician update">
          <form className="grid gap-5">
            <FormField label="Job status"><select className={fieldClass} defaultValue={job.status}><option value="confirmed">Confirmed</option><option value="in_progress">In progress</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option></select></FormField>
            <div className="grid gap-4 sm:grid-cols-2">
              <button type="button" className="focus-ring rounded-2xl border border-dashed border-line bg-slate-50 p-6 text-center text-sm font-bold text-muted hover:bg-white"><Camera className="mx-auto mb-2 h-6 w-6 text-primary" /> Upload before photos</button>
              <button type="button" className="focus-ring rounded-2xl border border-dashed border-line bg-slate-50 p-6 text-center text-sm font-bold text-muted hover:bg-white"><Camera className="mx-auto mb-2 h-6 w-6 text-cyan" /> Upload after photos</button>
            </div>
            <FormField label="Remarks"><textarea className={fieldClass} rows={4} placeholder="Service findings, parts used, warranty notes" /></FormField>
            <div className="grid gap-3 sm:grid-cols-2">
              <button type="button" className="focus-ring inline-flex items-center justify-center gap-2 rounded-2xl bg-success px-5 py-3 font-bold text-white shadow-lg shadow-emerald-500/20"><CheckCircle2 className="h-5 w-5" /> Mark completed</button>
              <button type="button" className="focus-ring inline-flex items-center justify-center gap-2 rounded-2xl border border-line bg-white px-5 py-3 font-bold text-ink hover:bg-slate-50"><Save className="h-5 w-5" /> Save draft</button>
            </div>
          </form>
        </SectionCard>
      </div>
    </AppShell>
  );
}
