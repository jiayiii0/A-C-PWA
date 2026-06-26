import Link from "next/link";
import { MapPin, MessageCircle, Wrench } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { StatusBadge } from "@/components/status-badge";
import { buildWhatsAppUrl } from "@/lib/business-rules";
import { getTodayJobs } from "@/lib/data";
import { jobTone, labelize } from "@/lib/utils";

export default async function TechnicianPage() {
  const today = await getTodayJobs();

  return (
    <AppShell>
      <div className="space-y-4">
        {today.map((job) => (
          <section key={job.id} className="glass-card p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xl font-black text-ink">{job.customer}</p>
                <p className="mt-1 text-sm font-semibold text-muted">{job.time} · {labelize(job.serviceType)}</p>
              </div>
              <StatusBadge tone={jobTone(job.status)}>{labelize(job.status)}</StatusBadge>
            </div>
            <p className="mt-4 text-sm leading-6 text-muted">{job.address}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <Link className="focus-ring inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 font-bold text-white" href={`/jobs/${job.id}`}><Wrench className="h-5 w-5" /> Open job</Link>
              <Link className="focus-ring inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-cyan/10 px-4 py-3 font-bold text-cyan" href={buildWhatsAppUrl(job.customerWhatsapp, `Hi ${job.customer}, this is Housely A/C. I am on the way for your ${labelize(job.serviceType)} service today at ${job.time}.`)}><MessageCircle className="h-5 w-5" /> WhatsApp</Link>
              <Link className="focus-ring inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-line bg-white px-4 py-3 font-bold text-ink" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(job.address)}`}><MapPin className="h-5 w-5" /> Navigate</Link>
            </div>
          </section>
        ))}
      </div>
    </AppShell>
  );
}
