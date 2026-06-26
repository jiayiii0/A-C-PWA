import { Save, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { fieldClass, FormField } from "@/components/form-field";
import { SectionCard } from "@/components/section-card";

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <SectionCard title="Company settings" eyebrow="Workspace">
          <form className="grid gap-5">
            <FormField label="Company name"><input className={fieldClass} defaultValue="Housely A/C" /></FormField>
            <FormField label="Invoice prefix"><input className={fieldClass} defaultValue="HA-2026" /></FormField>
            <FormField label="Default service interval"><select className={fieldClass} defaultValue="3"><option value="3">Every 3 months</option><option value="6">Every 6 months</option></select></FormField>
            <button type="button" className="focus-ring inline-flex w-fit items-center gap-2 rounded-2xl bg-primary px-5 py-3 font-bold text-white shadow-lg shadow-primary/20"><Save className="h-5 w-5" /> Save settings</button>
          </form>
        </SectionCard>
        <SectionCard title="Roles and security" eyebrow="Supabase Auth">
          <div className="space-y-3 text-sm leading-6 text-muted">
            <p><ShieldCheck className="mr-2 inline h-5 w-5 text-success" /> Admin can manage all customers, contracts, jobs, invoices, reports, and settings.</p>
            <p><ShieldCheck className="mr-2 inline h-5 w-5 text-primary" /> Technician can only view assigned jobs and related customer details.</p>
            <p>Row Level Security policies are included in the Supabase SQL files.</p>
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}
