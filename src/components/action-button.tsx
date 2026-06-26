import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ActionButton({
  href,
  children,
  icon: Icon,
  variant = "primary"
}: {
  href: string;
  children: React.ReactNode;
  icon: LucideIcon;
  variant?: "primary" | "secondary" | "plain";
}) {
  const styles = {
    primary: "bg-primary text-white shadow-lg shadow-primary/20 hover:bg-blue-700",
    secondary: "bg-cyan/10 text-cyan ring-1 ring-cyan/20 hover:bg-cyan/15",
    plain: "bg-white text-ink ring-1 ring-line hover:bg-slate-50"
  }[variant];

  return (
    <Link
      href={href}
      className={cn(
        "focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold",
        styles
      )}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      {children}
    </Link>
  );
}
