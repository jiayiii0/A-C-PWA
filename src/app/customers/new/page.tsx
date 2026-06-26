import { Save } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { fieldClass, FormField } from "@/components/form-field";
import { SectionCard } from "@/components/section-card";
import { createCustomerAction } from "@/app/customers/new/actions";

export default function NewCustomerPage({ searchParams }: { searchParams?: { error?: string } }) {
  return (
    <AppShell>
      <SectionCard title="New customer" eyebrow="Customer setup">
        {searchParams?.error ? (
          <div className="mb-5 rounded-2xl border border-danger/20 bg-danger/10 px-4 py-3 text-sm font-semibold text-red-700">
            {searchParams.error}
          </div>
        ) : null}
        <form action={createCustomerAction} className="grid gap-5 lg:grid-cols-2">
          <FormField label="Customer name"><input className={fieldClass} name="name" placeholder="Customer or company name" /></FormField>
          <FormField label="Phone"><input className={fieldClass} name="phone" placeholder="+60..." /></FormField>
          <FormField label="WhatsApp"><input className={fieldClass} name="whatsapp" placeholder="6012..." /></FormField>
          <FormField label="Customer type"><select className={fieldClass} name="customer_type"><option value="residential">Residential</option><option value="commercial">Commercial</option></select></FormField>
          <div className="lg:col-span-2"><FormField label="Address"><textarea className={fieldClass} name="address" rows={3} placeholder="Service address" /></FormField></div>
          <div className="lg:col-span-2"><FormField label="Notes"><textarea className={fieldClass} name="notes" rows={3} placeholder="Access notes, preferred times, unit details" /></FormField></div>
          <button type="submit" className="focus-ring inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 font-bold text-white shadow-lg shadow-primary/20 hover:bg-blue-700 lg:w-fit">
            <Save className="h-5 w-5" aria-hidden="true" /> Save customer
          </button>
        </form>
      </SectionCard>
    </AppShell>
  );
}
