import Link from "next/link";
import { CalendarDays, Filter, Plus } from "lucide-react";
import { ActionButton } from "@/components/action-button";
import { AppShell } from "@/components/app-shell";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { jobs, technicians } from "@/lib/mock-data";
import { jobTone, labelize, money } from "@/lib/utils";

export default function SchedulePage() {
  return (
    <AppShell>
      <SectionCard title="Schedule" eyebrow="Calendar" action={<ActionButton href="/schedule" icon={Plus}>Create job</ActionButton>}>
        <div className="mb-5 grid gap-3 md:grid-cols-3">
          <button className="focus-ring rounded-2xl bg-primary px-4 py-3 text-sm font-bold text-white">Day view</button>
          <button className="focus-ring rounded-2xl border border-line bg-white px-4 py-3 text-sm font-bold text-muted hover:bg-slate-50">Month view</button>
          <button className="focus-ring inline-flex items-center justify-center gap-2 rounded-2xl border border-line bg-white px-4 py-3 text-sm font-bold text-muted hover:bg-slate-50">
            <Filter className="h-4 w-4" /> Filter
          </button>
        </div>
        <div className="grid gap-5 lg:grid-cols-[16rem_1fr]">
          <aside className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm font-bold text-ink">Technicians</p>
            <div className="mt-3 space-y-2">
              {technicians.map((tech) => (
                <label key={tech} className="flex items-center gap-3 rounded-2xl bg-white px-3 py-2 text-sm font-semibold text-muted">
                  <input type="checkbox" defaultChecked className="h-4 w-4 accent-primary" /> {tech}
                </label>
              ))}
            </div>
          </aside>
          <div className="space-y-3">
            {jobs.map((job) => (
              <Link key={job.id} href={`/jobs/${job.id}`} className="grid gap-3 rounded-2xl border border-line bg-white p-4 transition hover:border-primary/30 hover:shadow-card sm:grid-cols-[6rem_1fr_auto] sm:items-center">
                <div className="rounded-2xl bg-primary/10 p-3 text-center text-primary">
                  <CalendarDays className="mx-auto h-5 w-5" />
                  <p className="mt-1 text-sm font-black">{job.time}</p>
                </div>
                <div>
                  <p className="font-bold text-ink">{job.customer}</p>
                  <p className="mt-1 text-sm text-muted">{labelize(job.serviceType)} · {job.technician} · {money(job.price)}</p>
                </div>
                <StatusBadge tone={jobTone(job.status)}>{labelize(job.status)}</StatusBadge>
              </Link>
            ))}
          </div>
        </div>
      </SectionCard>
    </AppShell>
  );
}
