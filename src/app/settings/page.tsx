import { Save } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { fieldClass, FormField } from "@/components/form-field";
import { SectionCard } from "@/components/section-card";

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="max-w-3xl">
        <SectionCard title="Company settings" eyebrow="Workspace">
          <form className="grid gap-5">
            <FormField label="Company name"><input className={fieldClass} defaultValue="Housely A/C" /></FormField>
            <FormField label="Invoice prefix"><input className={fieldClass} defaultValue="HA-2026" /></FormField>
            <FormField label="Default service interval"><select className={fieldClass} defaultValue="3"><option value="3">Every 3 months</option><option value="6">Every 6 months</option></select></FormField>
            <button type="button" className="focus-ring inline-flex w-fit items-center gap-2 rounded-2xl bg-primary px-5 py-3 font-bold text-white shadow-lg shadow-primary/20"><Save className="h-5 w-5" /> Save settings</button>
          </form>
        </SectionCard>
      </div>
    </AppShell>
  );
}
