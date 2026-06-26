import { Snowflake } from "lucide-react";
import { fieldClass, FormField } from "@/components/form-field";
import { signInAction } from "@/app/login/actions";

export default function LoginPage({ searchParams }: { searchParams?: { error?: string; next?: string } }) {
  const next = searchParams?.next ?? "/dashboard";

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

        {searchParams?.error ? (
          <div className="mt-6 rounded-2xl border border-danger/20 bg-danger/10 px-4 py-3 text-sm font-semibold text-red-700">
            {searchParams.error}
          </div>
        ) : null}

        <form action={signInAction} className="mt-8 space-y-5">
          <input type="hidden" name="next" value={next} />
          <FormField label="Email">
            <input className={fieldClass} name="email" type="email" placeholder="owner@housely-ac.com" />
          </FormField>
          <FormField label="Password">
            <input className={fieldClass} name="password" type="password" placeholder="Enter password" />
          </FormField>
          <button className="focus-ring w-full rounded-2xl bg-primary px-4 py-3 font-bold text-white shadow-lg shadow-primary/20 hover:bg-blue-700" type="submit">
            Sign in
          </button>
        </form>
      </section>
    </main>
  );
}
