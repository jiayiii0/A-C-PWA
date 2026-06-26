import { CalendarClock, RotateCcw } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { contracts } from "@/lib/mock-data";
import { getNextContractServiceDate } from "@/lib/business-rules";
import { money } from "@/lib/utils";

export default function ContractsPage() {
  return (
    <AppShell>
      <div className="grid gap-5 md:grid-cols-2">
        {contracts.map((contract) => (
          <section key={contract.id} className="glass-card p-5 transition hover:-translate-y-0.5 hover:shadow-soft">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-bold text-ink">{contract.customer}</p>
                <p className="mt-1 text-sm text-muted">{contract.units} units · {money(contract.pricePerVisit)} per visit</p>
              </div>
              <StatusBadge tone={contract.status === "Active" ? "green" : "amber"}>{contract.status}</StatusBadge>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4">
                <CalendarClock className="h-5 w-5 text-primary" />
                <p className="mt-2 text-xs font-semibold text-muted">Next service</p>
                <p className="font-bold text-ink">{contract.nextService}</p>
              </div>
              <div className="rounded-2xl bg-cyan/10 p-4">
                <RotateCcw className="h-5 w-5 text-cyan" />
                <p className="mt-2 text-xs font-semibold text-muted">After completion</p>
                <p className="font-bold text-ink">{getNextContractServiceDate(contract.nextService, contract.intervalMonths)}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted">Contract ends on {contract.endDate}. Reminders show 7 days before service and 30 days before expiry.</p>
          </section>
        ))}
      </div>
    </AppShell>
  );
}
