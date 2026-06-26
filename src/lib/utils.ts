import { JobStatus, StatusTone } from "@/types/domain";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function money(value: number) {
  return new Intl.NumberFormat("en-MY", {
    style: "currency",
    currency: "MYR",
    maximumFractionDigits: 0
  }).format(value);
}

export function addMonths(date: string, months: number) {
  const [year, month, day] = date.split("-").map(Number);
  const next = new Date(Date.UTC(year, month - 1, day));
  next.setUTCMonth(next.getUTCMonth() + months);
  return next.toISOString().slice(0, 10);
}

export function jobTone(status: JobStatus): StatusTone {
  const tones: Record<JobStatus, StatusTone> = {
    pending: "amber",
    confirmed: "blue",
    in_progress: "cyan",
    completed: "green",
    cancelled: "red"
  };

  return tones[status];
}

export function labelize(value: string) {
  return value
    .split("_")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}
