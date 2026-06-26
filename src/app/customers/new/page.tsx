import { Save } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { fieldClass, FormField } from "@/components/form-field";
import { SectionCard } from "@/components/section-card";

export default function NewCustomerPage() {
  return (
    <AppShell>
      <SectionCard title="New customer" eyebrow="Customer setup">
        <form className="grid gap-5 lg:grid-cols-2">
          <FormField label="Customer name"><input className={fieldClass} placeholder="Customer or company name" /></FormField>
          <FormField label="Phone"><input className={fieldClass} placeholder="+60..." /></FormField>
          <FormField label="WhatsApp"><input className={fieldClass} placeholder="6012..." /></FormField>
          <FormField label="Customer type"><select className={fieldClass}><option>Residential</option><option>Commercial</option></select></FormField>
          <div className="lg:col-span-2"><FormField label="Address"><textarea className={fieldClass} rows={3} placeholder="Service address" /></FormField></div>
          <div className="lg:col-span-2"><FormField label="Notes"><textarea className={fieldClass} rows={3} placeholder="Access notes, preferred times, unit details" /></FormField></div>
          <button type="button" className="focus-ring inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 font-bold text-white shadow-lg shadow-primary/20 hover:bg-blue-700 lg:w-fit">
            <Save className="h-5 w-5" aria-hidden="true" /> Save customer
          </button>
        </form>
      </SectionCard>
    </AppShell>
  );
}
