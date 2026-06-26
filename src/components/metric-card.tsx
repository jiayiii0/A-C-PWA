import { LucideIcon } from "lucide-react";

export function MetricCard({
  label,
  value,
  helper,
  icon: Icon,
  accent = "blue"
}: {
  label: string;
  value: string;
  helper: string;
  icon: LucideIcon;
  accent?: "blue" | "cyan" | "green" | "amber";
}) {
  const accentClass = {
    blue: "bg-primary/10 text-primary",
    cyan: "bg-cyan/10 text-cyan",
    green: "bg-success/10 text-emerald-600",
    amber: "bg-warning/10 text-amber-600"
  }[accent];

  return (
    <div className="glass-card p-5 transition hover:-translate-y-0.5 hover:shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted">{label}</p>
          <p className="mt-3 text-3xl font-bold tracking-normal text-ink">{value}</p>
        </div>
        <div className={`rounded-2xl p-3 ${accentClass}`}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
      <p className="mt-4 text-sm text-muted">{helper}</p>
    </div>
  );
}
