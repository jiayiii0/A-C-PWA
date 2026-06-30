"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Bell,
  CalendarDays,
  ClipboardList,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Search,
  Settings,
  Snowflake,
  Users
} from "lucide-react";
import { signOutAction } from "@/app/login/actions";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/customers", label: "Customers", icon: Users },
  { href: "/contracts", label: "Contracts", icon: ClipboardList },
  { href: "/schedule", label: "Schedule", icon: CalendarDays },
  { href: "/invoices", label: "Invoices", icon: FileText },
  { href: "/reports", label: "Reports", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings }
];

const mobileItems = navItems.slice(0, 5);

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const pageTitle = navItems.find((item) => pathname.startsWith(item.href))?.label ?? "Dashboard";

  return (
    <div className="min-h-screen bg-[#EEF4F8] text-ink">
      <aside className="fixed left-0 top-0 hidden h-screen w-64 bg-[#12161C] p-5 text-white shadow-2xl shadow-slate-950/20 lg:block">
        <div className="flex items-center justify-between gap-3">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan/15 text-cyan">
              <Snowflake className="h-6 w-6" aria-hidden="true" />
            </div>
            <div>
              <p className="text-base font-black tracking-normal">Housely A/C</p>
              <p className="text-[11px] font-medium text-slate-400">Service Manager</p>
            </div>
          </Link>
          <button className="focus-ring rounded-xl p-2 text-slate-400 hover:bg-white/10 hover:text-white" type="button" aria-label="Menu">
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <nav className="mt-8 space-y-1.5">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "focus-ring flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition",
                  active ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className={cn("h-5 w-5", active ? "text-cyan" : "text-slate-500")} aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <p className="text-sm font-bold text-white">Admin workspace</p>
          <p className="mt-1 text-xs leading-5 text-slate-400">Arrange jobs, payments, reports, and customer care in one place.</p>
        </div>
      </aside>

      <main className="pb-24 lg:ml-64 lg:pb-10">
        <header className="sticky top-0 z-30 bg-[#12161C] px-4 py-3 text-white shadow-lg shadow-slate-950/10 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="min-w-0 flex-1 lg:hidden">
              <Link href="/dashboard" className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan/15 text-cyan">
                  <Snowflake className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-black">Housely A/C</p>
                  <p className="text-[11px] text-slate-400">Service Manager</p>
                </div>
              </Link>
            </div>

            <label className="hidden min-h-11 w-full max-w-md items-center gap-3 rounded-xl border border-white/5 bg-white/10 px-4 text-sm text-slate-400 lg:flex">
              <Search className="h-4 w-4" aria-hidden="true" />
              <input className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 outline-none" placeholder="Search customers, jobs, invoices..." />
            </label>

            <div className="ml-auto flex items-center gap-2">
              <button className="focus-ring hidden rounded-xl p-2.5 text-slate-300 hover:bg-white/10 hover:text-white sm:inline-flex" type="button" aria-label="Messages">
                <Mail className="h-5 w-5" aria-hidden="true" />
              </button>
              <button className="focus-ring relative hidden rounded-xl p-2.5 text-slate-300 hover:bg-white/10 hover:text-white sm:inline-flex" type="button" aria-label="Notifications">
                <Bell className="h-5 w-5" aria-hidden="true" />
                <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-cyan text-[10px] font-black text-white">3</span>
              </button>
              <Link href="/dashboard" className="focus-ring rounded-xl p-2.5 text-slate-300 hover:bg-white/10 hover:text-white" aria-label="Home">
                <Home className="h-5 w-5" />
              </Link>
              <div className="hidden items-center gap-3 rounded-xl bg-white/5 px-3 py-2 lg:flex">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-black text-white">HA</div>
                <div className="leading-tight">
                  <p className="text-xs font-bold text-white">Housely Admin</p>
                  <p className="text-[11px] text-slate-400">Housely A/C</p>
                </div>
              </div>
              <form action={signOutAction}>
                <button className="focus-ring rounded-xl p-2.5 text-slate-300 hover:bg-white/10 hover:text-danger" aria-label="Logout" type="submit">
                  <LogOut className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="mb-5 rounded-2xl border border-white bg-white/70 px-5 py-4 shadow-card">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan">Housely A/C</p>
            <h1 className="mt-1 text-2xl font-black tracking-normal text-ink">{pageTitle}</h1>
          </div>
          {children}
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#12161C] px-2 py-2 shadow-soft lg:hidden">
        <div className="grid grid-cols-5 gap-1">
          {mobileItems.map((item) => {
            const active = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "focus-ring flex flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-[11px] font-semibold transition",
                  active ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className={cn("h-5 w-5", active ? "text-cyan" : "text-slate-500")} aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
