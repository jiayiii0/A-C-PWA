import { BarChart3, CreditCard, TrendingUp, Wrench } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { MetricCard } from "@/components/metric-card";
import { SectionCard } from "@/components/section-card";
import { money } from "@/lib/utils";

export default function ReportsPage() {
  return (
    <AppShell>
      <div className="grid gap-5 md:grid-cols-3">
        <MetricCard label="June revenue" value={money(12840)} helper="Paid and partial invoices" icon={TrendingUp} accent="green" />
        <MetricCard label="Jobs completed" value="42" helper="Cleaning, repair, wash" icon={Wrench} accent="blue" />
        <MetricCard label="Outstanding" value={money(860)} helper="2 invoices need follow-up" icon={CreditCard} accent="amber" />
      </div>
      <div className="mt-6">
        <SectionCard title="Monthly report" eyebrow="Owner view">
          <div className="space-y-4">
            {["Normal cleaning", "Chemical wash", "Repair", "Gas top up"].map((label, index) => (
              <div key={label} className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-bold text-ink">{label}</p>
                  <p className="text-sm font-semibold text-muted">{[24, 8, 6, 4][index]} jobs</p>
                </div>
                <div className="mt-3 h-3 rounded-full bg-white">
                  <div className="h-3 rounded-full bg-primary" style={{ width: `${[76, 42, 31, 22][index]}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-2xl bg-cyan/10 p-4 text-sm text-cyan">
            <BarChart3 className="mb-2 h-5 w-5" /> Export can be added once Supabase data is connected.
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}
