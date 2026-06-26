import { cn } from "@/lib/utils";
import { StatusTone } from "@/types/domain";

const toneClasses: Record<StatusTone, string> = {
  blue: "bg-primary/10 text-primary ring-primary/20",
  cyan: "bg-cyan/10 text-cyan ring-cyan/20",
  green: "bg-success/10 text-emerald-700 ring-success/20",
  amber: "bg-warning/10 text-amber-700 ring-warning/20",
  red: "bg-danger/10 text-red-700 ring-danger/20",
  slate: "bg-slate-100 text-slate-600 ring-slate-200"
};

export function StatusBadge({ children, tone = "slate" }: { children: React.ReactNode; tone?: StatusTone }) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1", toneClasses[tone])}>
      {children}
    </span>
  );
}
