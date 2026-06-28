import {
  BarChart3,
  CalendarCheck,
  Download,
  FileText,
  MoreHorizontal,
  PhoneCall,
  Send,
  TrendingUp,
  WalletCards
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { StatusBadge } from "@/components/status-badge";
import { cn, money } from "@/lib/utils";

const metrics = [
  { label: "Net income", value: money(12901), change: "+20.3% from last month", tone: "green", icon: WalletCards },
  { label: "Jobs this month", value: "42", change: "+8 services completed", tone: "blue", icon: CalendarCheck },
  { label: "Average job value", value: money(307), change: "+7.8% from last month", tone: "green", icon: TrendingUp },
  { label: "Outstanding", value: money(860), change: "2 invoices need follow-up", tone: "amber", icon: FileText }
] as const;

const serviceMix = [
  { label: "Normal cleaning", value: "35%", color: "bg-cyan" },
  { label: "Chemical wash", value: "26%", color: "bg-success" },
  { label: "Repair", value: "22%", color: "bg-primary" },
  { label: "Installation", value: "11%", color: "bg-warning" },
  { label: "Gas top up", value: "6%", color: "bg-slate-500" }
];

const monthlyRevenue = [6800, 7600, 7200, 9100, 8700, 10200, 9600, 11300, 10800, 12100, 11800, 12900];
const monthlyJobs = [22, 25, 23, 31, 29, 34, 32, 38, 35, 40, 37, 42];
const followUps = [
  { title: "Collect pending payment", helper: "2 invoices still outstanding this month.", icon: WalletCards },
  { title: "Confirm next service", helper: "1 contract reminder should be checked.", icon: CalendarCheck },
  { title: "Call back customer", helper: "1 repair quotation needs decision.", icon: PhoneCall }
];

function ReportMetricCard({ metric }: { metric: (typeof metrics)[number] }) {
  const Icon = metric.icon;

  return (
    <section className="rounded-2xl border border-line bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-semibold text-muted">{metric.label}</p>
        <MoreHorizontal className="h-5 w-5 text-slate-300" aria-hidden="true" />
      </div>
      <div className="mt-5 flex items-end justify-between gap-3">
        <div>
          <p className="text-2xl font-black text-ink">{metric.value}</p>
          <p className={cn("mt-2 text-xs font-semibold", metric.tone === "amber" ? "text-amber-600" : "text-success")}>{metric.change}</p>
        </div>
        <div className={cn("rounded-2xl p-3", metric.tone === "amber" ? "bg-warning/10 text-warning" : metric.tone === "blue" ? "bg-primary/10 text-primary" : "bg-success/10 text-success")}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

function MiniLineChart() {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <div className="relative h-72 overflow-hidden">
        <div className="absolute inset-0 grid grid-rows-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="border-b border-dashed border-slate-200" />
          ))}
        </div>
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 720 260" preserveAspectRatio="none" role="img" aria-label="Revenue and jobs trend">
          <polyline
            fill="none"
            points={monthlyRevenue.map((value, index) => `${index * 65 + 4},${240 - (value - 6000) / 34}`).join(" ")}
            stroke="#2563EB"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
          />
          <polyline
            fill="none"
            points={monthlyJobs.map((value, index) => `${index * 65 + 4},${230 - value * 4}`).join(" ")}
            stroke="#06B6D4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
          />
        </svg>
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs font-semibold text-muted">
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month) => (
            <span key={month}>{month}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ServiceMixChart() {
  return (
    <div className="grid gap-5 lg:grid-cols-[14rem_1fr] lg:items-center">
      <div className="mx-auto flex h-52 w-52 items-center justify-center rounded-full bg-[conic-gradient(#06B6D4_0_35%,#10B981_35%_61%,#2563EB_61%_83%,#F59E0B_83%_94%,#64748B_94%_100%)] p-7 shadow-inner">
        <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-white text-center">
          <p className="text-3xl font-black text-ink">42</p>
          <p className="text-xs font-bold uppercase tracking-wide text-muted">services</p>
        </div>
      </div>
      <div className="space-y-3">
        {serviceMix.map((item) => (
          <div key={item.label} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
            <div className="flex items-center gap-3">
              <span className={cn("h-3 w-3 rounded-full", item.color)} />
              <p className="text-sm font-bold text-ink">{item.label}</p>
            </div>
            <p className="text-sm font-black text-muted">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ReportsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-5 shadow-card lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-cyan">Owner report</p>
            <h1 className="mt-2 text-2xl font-black text-ink">Overall</h1>
            <p className="mt-2 text-sm leading-6 text-muted">Monthly service income, workload, payment follow-up, and customer care signals for Housely A/C.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="button" className="focus-ring inline-flex items-center justify-center gap-2 rounded-2xl border border-line bg-white px-4 py-3 text-sm font-bold text-ink transition hover:bg-slate-50">
              <Download className="h-4 w-4" aria-hidden="true" /> Download report
            </button>
            <button type="button" className="focus-ring inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition hover:bg-blue-700">
              <Send className="h-4 w-4" aria-hidden="true" /> Request custom report
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <ReportMetricCard key={metric.label} metric={metric} />
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-2xl border border-line bg-white p-5 shadow-card">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <p className="font-black text-ink">Revenue and workload</p>
                <p className="mt-1 text-sm text-muted">Paid income compared with completed services.</p>
              </div>
              <StatusBadge tone="blue">Monthly</StatusBadge>
            </div>
            <MiniLineChart />
            <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold text-muted">
              <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-primary" /> Revenue</span>
              <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-cyan" /> Jobs</span>
            </div>
          </section>

          <section className="rounded-2xl border border-line bg-white p-5 shadow-card">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <p className="font-black text-ink">Service activity</p>
                <p className="mt-1 text-sm text-muted">Which service types fill the month.</p>
              </div>
              <BarChart3 className="h-5 w-5 text-muted" aria-hidden="true" />
            </div>
            <ServiceMixChart />
          </section>
        </div>

        <section className="rounded-2xl border border-line bg-white p-5 shadow-card">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="font-black text-ink">Follow-up queue</p>
              <p className="mt-1 text-sm text-muted">Small list for the owner to close before the monthly report is final.</p>
            </div>
            <StatusBadge tone="amber">3 items</StatusBadge>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {followUps.map(({ title, helper, icon: Icon }) => (
              <div key={title} className="rounded-2xl bg-slate-50 p-4">
                <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                <p className="mt-3 font-bold text-ink">{title}</p>
                <p className="mt-2 text-sm leading-6 text-muted">{helper}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
