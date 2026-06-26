"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  CalendarDays,
  ClipboardList,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Settings,
  Snowflake,
  Users,
  Wrench
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ToastStack } from "@/components/toast-stack";
import { signOutAction } from "@/app/login/actions";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/customers", label: "Customers", icon: Users },
  { href: "/contracts", label: "Contracts", icon: ClipboardList },
  { href: "/schedule", label: "Schedule", icon: CalendarDays },
  { href: "/technician", label: "Technician", icon: Wrench },
  { href: "/invoices", label: "Invoices", icon: FileText },
  { href: "/reports", label: "Reports", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings }
];

const mobileItems = navItems.slice(0, 5);

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const pageTitle = navItems.find((item) => pathname.startsWith(item.href))?.label ?? "Dashboard";

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r border-line bg-white/85 p-5 backdrop-blur-xl lg:block">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
            <Snowflake className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <p className="text-lg font-black tracking-normal">Housely A/C</p>
            <p className="text-xs font-medium text-muted">CoolCare Service Manager</p>
          </div>
        </Link>

        <nav className="mt-8 space-y-2">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "focus-ring flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition",
                  active ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-slate-600 hover:bg-slate-100 hover:text-ink"
                )}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-line bg-slate-50 p-4">
          <p className="text-sm font-bold">Today&apos;s team</p>
          <p className="mt-1 text-sm text-muted">Alicia and Ben are scheduled for 2 active jobs.</p>
        </div>
      </aside>

      <main className="pb-24 lg:ml-72 lg:pb-10">
        <header className="sticky top-0 z-30 border-b border-line bg-white/80 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan">Housely A/C</p>
              <h1 className="mt-1 text-2xl font-black tracking-normal text-ink">{pageTitle}</h1>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/dashboard" className="focus-ring rounded-2xl border border-line bg-white p-3 text-muted hover:text-primary" aria-label="Home">
                <Home className="h-5 w-5" />
              </Link>
              <form action={signOutAction}>
                <button className="focus-ring rounded-2xl border border-line bg-white p-3 text-muted hover:text-danger" aria-label="Logout" type="submit">
                  <LogOut className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-line bg-white/95 px-2 py-2 shadow-soft backdrop-blur-xl lg:hidden">
        <div className="grid grid-cols-5 gap-1">
          {mobileItems.map((item) => {
            const active = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "focus-ring flex flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-semibold transition",
                  active ? "bg-primary text-white" : "text-slate-500 hover:bg-slate-100"
                )}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <ToastStack />
    </div>
  );
}
