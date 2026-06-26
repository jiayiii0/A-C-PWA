import { Camera, CheckCircle2, MapPin, MessageCircle, Save } from "lucide-react";
import { ActionButton } from "@/components/action-button";
import { AppShell } from "@/components/app-shell";
import { fieldClass, FormField } from "@/components/form-field";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { generateInvoiceForJobAction } from "@/app/invoices/actions";
import { saveServiceRecordAction } from "@/app/jobs/[id]/actions";
import { buildWhatsAppUrl } from "@/lib/business-rules";
import { getJobById } from "@/lib/data";
import { jobTone, labelize, money } from "@/lib/utils";

export default async function JobDetailPage({ params, searchParams }: { params: { id: string }; searchParams?: { error?: string; saved?: string } }) {
  const job = await getJobById(params.id);
  const message = `Hi ${job.customer}, this is Housely A/C about your ${labelize(job.serviceType)} service scheduled on ${job.date} at ${job.time}.`;
  const action = saveServiceRecordAction.bind(null, params.id);
  const invoiceAction = generateInvoiceForJobAction.bind(null, params.id);

  return (
    <AppShell>
      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <SectionCard title={job.customer} eyebrow={labelize(job.serviceType)}>
          <div className="space-y-4">
            <StatusBadge tone={jobTone(job.status)}>{labelize(job.status)}</StatusBadge>
            <p className="text-sm leading-6 text-muted">{job.date} at {job.time} · Assigned to {job.technician} · {money(job.price)}</p>
            <div className="rounded-2xl bg-slate-50 p-4 text-sm text-muted"><MapPin className="mb-2 h-5 w-5 text-primary" />{job.address}</div>
            <div className="grid gap-3 sm:grid-cols-2">
              <ActionButton href={buildWhatsAppUrl(job.customerWhatsapp, message)} icon={MessageCircle} variant="secondary">WhatsApp customer</ActionButton>
              <ActionButton href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(job.address)}`} icon={MapPin}>Navigate</ActionButton>
            </div>
          </div>
        </SectionCard>
        <SectionCard title="Invoice" eyebrow="Billing">
          <form action={invoiceAction} className="grid gap-4">
            <p className="text-sm leading-6 text-muted">
              Generate an invoice after the job is marked completed. The invoice can be printed or saved as PDF from the browser.
            </p>
            <FormField label="Discount">
              <input className={fieldClass} name="discount" type="number" min="0" step="0.01" placeholder="0" />
            </FormField>
            <button type="submit" className="focus-ring inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 font-bold text-white shadow-lg shadow-primary/20 hover:bg-blue-700">
              Generate invoice
            </button>
          </form>
        </SectionCard>
        <SectionCard title="Service record" eyebrow="Technician update">
          {searchParams?.error ? (
            <div className="mb-5 rounded-2xl border border-danger/20 bg-danger/10 px-4 py-3 text-sm font-semibold text-red-700">
              {searchParams.error}
            </div>
          ) : null}
          {searchParams?.saved ? (
            <div className="mb-5 rounded-2xl border border-success/20 bg-success/10 px-4 py-3 text-sm font-semibold text-emerald-700">
              Service record saved.
            </div>
          ) : null}
          <form action={action} className="grid gap-5">
            <FormField label="Job status"><select className={fieldClass} name="status" defaultValue={job.status}><option value="confirmed">Confirmed</option><option value="in_progress">In progress</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option></select></FormField>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="focus-ring block cursor-pointer rounded-2xl border border-dashed border-line bg-slate-50 p-6 text-center text-sm font-bold text-muted hover:bg-white">
                <Camera className="mx-auto mb-2 h-6 w-6 text-primary" /> Upload before photos
                <input className="sr-only" type="file" name="before_photos" accept="image/*" multiple />
              </label>
              <label className="focus-ring block cursor-pointer rounded-2xl border border-dashed border-line bg-slate-50 p-6 text-center text-sm font-bold text-muted hover:bg-white">
                <Camera className="mx-auto mb-2 h-6 w-6 text-cyan" /> Upload after photos
                <input className="sr-only" type="file" name="after_photos" accept="image/*" multiple />
              </label>
            </div>
            <FormField label="Remarks"><textarea className={fieldClass} name="remarks" rows={4} placeholder="Service findings and customer notes" /></FormField>
            <div className="grid gap-4 sm:grid-cols-3">
              <FormField label="Parts used"><input className={fieldClass} name="parts_used" placeholder="Optional" /></FormField>
              <FormField label="Total price"><input className={fieldClass} name="total_price" type="number" min="0" step="0.01" defaultValue={job.price} /></FormField>
              <FormField label="Warranty days"><input className={fieldClass} name="warranty_days" type="number" min="0" step="1" placeholder="0" /></FormField>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <button type="submit" className="focus-ring inline-flex items-center justify-center gap-2 rounded-2xl bg-success px-5 py-3 font-bold text-white shadow-lg shadow-emerald-500/20"><CheckCircle2 className="h-5 w-5" /> Save service record</button>
              <button type="submit" className="focus-ring inline-flex items-center justify-center gap-2 rounded-2xl border border-line bg-white px-5 py-3 font-bold text-ink hover:bg-slate-50"><Save className="h-5 w-5" /> Save status update</button>
            </div>
          </form>
        </SectionCard>
      </div>
    </AppShell>
  );
}
