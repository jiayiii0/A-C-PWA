import Link from "next/link";
import { AlertTriangle, CalendarDays, CheckCircle2, Clock3, MapPin, MessageCircle, Plus, Route, Wrench } from "lucide-react";
import { ActionButton } from "@/components/action-button";
import { AppShell } from "@/components/app-shell";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { buildWhatsAppUrl } from "@/lib/business-rules";
import { getJobs, getTechnicians } from "@/lib/data";
import { buildScheduleDays } from "@/lib/schedule";
import { jobTone, labelize, money } from "@/lib/utils";

const focusDate = "2026-06-26";

export default async function SchedulePage() {
  const [jobs, technicians] = await Promise.all([getJobs(), getTechnicians()]);
  const scheduleDays = buildScheduleDays(jobs);
  const selectedDay = scheduleDays.find((day) => day.date === focusDate) ?? scheduleDays[0];
  const selectedJobs = selectedDay?.jobs ?? [];
  const totalStops = selectedJobs.length;
  const totalValue = selectedJobs.reduce((sum, job) => sum + job.price, 0);
  const activeTechnicians = Array.from(new Set(selectedJobs.map((job) => job.technician)));

  return (
    <AppShell>
      <div className="grid gap-6">
        <SectionCard title="Daily dispatch" eyebrow="Schedule" action={<ActionButton href="/schedule" icon={Plus}>Create job</ActionButton>}>
          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-2xl border border-line bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-cyan">Focus day</p>
                  <h2 className="mt-2 text-2xl font-black text-ink">{selectedDay?.date ?? "No scheduled jobs"}</h2>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
                    Show only the jobs that matter today. Use the day cards below to jump between small daily routes instead of scrolling through hundreds of customers.
                  </p>
                </div>
                {selectedDay ? <StatusBadge tone={selectedDay.capacity.tone}>{selectedDay.capacity.label}</StatusBadge> : null}
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-muted">Stops</p>
                  <p className="mt-2 text-2xl font-black text-ink">{totalStops}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-muted">Team</p>
                  <p className="mt-2 text-2xl font-black text-ink">{activeTechnicians.length || technicians.length}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-muted">Value</p>
                  <p className="mt-2 text-2xl font-black text-ink">{money(totalValue)}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-line bg-slate-50 p-5">
              <div className="flex items-start gap-3">
                {selectedDay?.capacity.tone === "red" ? <AlertTriangle className="mt-1 h-5 w-5 text-danger" /> : <CheckCircle2 className="mt-1 h-5 w-5 text-success" />}
                <div>
                  <p className="font-black text-ink">Capacity rule</p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {selectedDay?.capacity.helper ?? "No jobs selected."}
                  </p>
                  <p className="mt-3 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-ink">
                    Recommended: {selectedDay?.capacity.recommendedJobs ?? "Choose a day"}
                  </p>
                </div>
              </div>
              <div className="mt-5 rounded-2xl bg-white p-4">
                <p className="text-sm font-bold text-ink">Technician filter</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {technicians.map((tech) => (
                    <span key={tech} className="rounded-2xl border border-line bg-white px-3 py-2 text-sm font-semibold text-muted">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Today&apos;s route" eyebrow="Field actions">
          <div className="grid gap-4 xl:grid-cols-2">
            {selectedJobs.map((job) => (
              <section key={job.id} className="glass-card p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xl font-black text-ink">{job.customer}</p>
                    <p className="mt-1 text-sm font-semibold text-muted">{job.time} - {labelize(job.serviceType)} - {job.technician}</p>
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
        </SectionCard>

        <SectionCard title="Upcoming workload" eyebrow="Day planner">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {scheduleDays.map((day) => (
              <div key={day.date} className={`rounded-2xl border bg-white p-4 ${day.date === selectedDay?.date ? "border-primary shadow-card" : "border-line"}`}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-black text-ink">{day.date}</p>
                    <p className="mt-1 text-sm text-muted">{day.jobs.length} stops</p>
                  </div>
                  <StatusBadge tone={day.capacity.tone}>{day.capacity.label}</StatusBadge>
                </div>
                <div className="mt-4 space-y-2">
                  {day.jobs.slice(0, 3).map((job) => (
                    <p key={job.id} className="flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2 text-sm font-semibold text-muted">
                      <Clock3 className="h-4 w-4 text-primary" />
                      {job.time} {job.customer}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="All scheduled jobs" eyebrow="Search-friendly list">
          <div className="space-y-3">
            {jobs.map((job) => (
              <Link key={job.id} href={`/jobs/${job.id}`} className="grid gap-3 rounded-2xl border border-line bg-white p-4 transition hover:border-primary/30 hover:shadow-card sm:grid-cols-[7rem_1fr_auto] sm:items-center">
                <div className="rounded-2xl bg-primary/10 p-3 text-center text-primary">
                  <CalendarDays className="mx-auto h-5 w-5" />
                  <p className="mt-1 text-sm font-black">{job.date}</p>
                </div>
                <div>
                  <p className="font-bold text-ink">{job.customer}</p>
                  <p className="mt-1 text-sm text-muted">{job.time} - {labelize(job.serviceType)} - {job.technician} - {money(job.price)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Route className="h-4 w-4 text-muted" />
                  <StatusBadge tone={jobTone(job.status)}>{labelize(job.status)}</StatusBadge>
                </div>
              </Link>
            ))}
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}
