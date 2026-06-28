import Link from "next/link";
import { CalendarDays, Clock3, MapPin, MessageCircle, Plus, Route, Wrench } from "lucide-react";
import { ActionButton } from "@/components/action-button";
import { AppShell } from "@/components/app-shell";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { buildWhatsAppUrl } from "@/lib/business-rules";
import { getJobs } from "@/lib/data";
import { buildScheduleDays, ScheduleDay } from "@/lib/schedule";
import { jobTone, labelize, money } from "@/lib/utils";
import { Job } from "@/types/domain";

const focusDate = "2026-06-26";

function DispatchSummary({ selectedDay, jobs }: { selectedDay?: ScheduleDay; jobs: Job[] }) {
  const installationCount = jobs.filter((job) => job.serviceType === "installation").length;
  const totalValue = jobs.reduce((sum, job) => sum + job.price, 0);

  return (
    <SectionCard title="Daily dispatch" eyebrow="Schedule" action={<ActionButton href="/jobs/new" icon={Plus}>Create job</ActionButton>}>
      <div className="rounded-2xl border border-line bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-cyan">Focus day</p>
            <h2 className="mt-2 text-2xl font-black text-ink">{selectedDay?.date ?? "No scheduled jobs"}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
              Plan one day at a time, keep the route short, and open customer jobs quickly without browsing through the full customer database.
            </p>
          </div>
          {selectedDay ? <StatusBadge tone={selectedDay.capacity.tone}>{selectedDay.capacity.label}</StatusBadge> : null}
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-muted">Orders</p>
            <p className="mt-2 text-2xl font-black text-ink">{jobs.length}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-muted">Installation</p>
            <p className="mt-2 text-2xl font-black text-ink">{installationCount}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-muted">Value</p>
            <p className="mt-2 text-2xl font-black text-ink">{money(totalValue)}</p>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

function JobActionCard({ job }: { job: Job }) {
  const whatsappMessage = `Hi ${job.customer}, this is Housely A/C. I am on the way for your ${labelize(job.serviceType)} service today at ${job.time}.`;

  return (
    <section className="glass-card p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xl font-black text-ink">{job.customer}</p>
          <p className="mt-1 text-sm font-semibold text-muted">{job.time} - {labelize(job.serviceType)}</p>
        </div>
        <StatusBadge tone={jobTone(job.status)}>{labelize(job.status)}</StatusBadge>
      </div>
      <p className="mt-4 text-sm leading-6 text-muted">{job.address}</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <Link className="focus-ring inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 font-bold text-white" href={`/jobs/${job.id}`}>
          <Wrench className="h-5 w-5" /> Open job
        </Link>
        <Link className="focus-ring inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-cyan/10 px-4 py-3 font-bold text-cyan" href={buildWhatsAppUrl(job.customerWhatsapp, whatsappMessage)}>
          <MessageCircle className="h-5 w-5" /> WhatsApp
        </Link>
        <Link className="focus-ring inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-line bg-white px-4 py-3 font-bold text-ink" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(job.address)}`}>
          <MapPin className="h-5 w-5" /> Navigate
        </Link>
      </div>
    </section>
  );
}

function TodayRoute({ jobs }: { jobs: Job[] }) {
  return (
    <SectionCard title="Today&apos;s route" eyebrow="Field actions">
      <div className="grid gap-4 xl:grid-cols-2">
        {jobs.map((job) => (
          <JobActionCard key={job.id} job={job} />
        ))}
      </div>
    </SectionCard>
  );
}

function UpcomingWorkload({ days, selectedDate }: { days: ScheduleDay[]; selectedDate?: string }) {
  return (
    <SectionCard title="Upcoming workload" eyebrow="Day planner">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {days.map((day) => (
          <div key={day.date} className={`rounded-2xl border bg-white p-4 ${day.date === selectedDate ? "border-primary shadow-card" : "border-line"}`}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-black text-ink">{day.date}</p>
                <p className="mt-1 text-sm text-muted">{day.jobs.length} orders</p>
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
  );
}

function AllScheduledJobs({ jobs }: { jobs: Job[] }) {
  return (
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
              <p className="mt-1 text-sm text-muted">{job.time} - {labelize(job.serviceType)} - {money(job.price)}</p>
            </div>
            <div className="flex items-center gap-2">
              <Route className="h-4 w-4 text-muted" />
              <StatusBadge tone={jobTone(job.status)}>{labelize(job.status)}</StatusBadge>
            </div>
          </Link>
        ))}
      </div>
    </SectionCard>
  );
}

export default async function SchedulePage() {
  const jobs = await getJobs();
  const scheduleDays = buildScheduleDays(jobs);
  const selectedDay = scheduleDays.find((day) => day.date === focusDate) ?? scheduleDays[0];
  const selectedJobs = selectedDay?.jobs ?? [];

  return (
    <AppShell>
      <div className="grid gap-6">
        <DispatchSummary selectedDay={selectedDay} jobs={selectedJobs} />
        <TodayRoute jobs={selectedJobs} />
        <UpcomingWorkload days={scheduleDays} selectedDate={selectedDay?.date} />
        <AllScheduledJobs jobs={jobs} />
      </div>
    </AppShell>
  );
}
