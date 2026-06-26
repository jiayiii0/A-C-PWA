import { Snowflake } from "lucide-react";
import { fieldClass, FormField } from "@/components/form-field";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-canvas px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-line bg-white/95 p-8 shadow-soft backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
            <Snowflake className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-xl font-black text-ink">Housely A/C</h1>
            <p className="text-sm text-muted">CoolCare Service Manager</p>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-2xl font-black text-ink">Welcome back</p>
          <p className="mt-2 text-sm leading-6 text-muted">Sign in with Supabase Auth to manage customers, schedules, invoices, and technician jobs.</p>
        </div>

        <form className="mt-8 space-y-5">
          <FormField label="Email">
            <input className={fieldClass} type="email" placeholder="owner@housely-ac.com" />
          </FormField>
          <FormField label="Password">
            <input className={fieldClass} type="password" placeholder="Enter password" />
          </FormField>
          <button className="focus-ring w-full rounded-2xl bg-primary px-4 py-3 font-bold text-white shadow-lg shadow-primary/20 hover:bg-blue-700" type="button">
            Sign in
          </button>
        </form>
      </section>
    </main>
  );
}
