import { CalendarPlus, Save } from "lucide-react";
import { createJobAction } from "@/app/jobs/new/actions";
import { AppShell } from "@/components/app-shell";
import { fieldClass, FormField } from "@/components/form-field";
import { SectionCard } from "@/components/section-card";
import { getCustomers, getTechnicians } from "@/lib/data";

const serviceOptions = [
  ["normal_cleaning", "Normal cleaning"],
  ["chemical_wash", "Chemical wash"],
  ["repair", "Repair"],
  ["diagnosis", "Diagnosis"],
  ["gas_top_up", "Gas top up"],
  ["installation", "Installation"]
] as const;

export default async function NewJobPage({ searchParams }: { searchParams?: { error?: string } }) {
  const [customers, technicians] = await Promise.all([getCustomers(), getTechnicians()]);

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl">
        <SectionCard title="Create job" eyebrow="Schedule">
          <div className="mb-5 rounded-2xl border border-cyan/20 bg-cyan/10 px-4 py-3 text-sm leading-6 text-cyan">
            <CalendarPlus className="mr-2 inline h-5 w-5" aria-hidden="true" />
            Create only the work that needs to be visited. The full customer database stays searchable from Customers.
          </div>
          {searchParams?.error ? (
            <div className="mb-5 rounded-2xl border border-danger/20 bg-danger/10 px-4 py-3 text-sm font-semibold text-red-700">
              {searchParams.error}
            </div>
          ) : null}

          <form action={createJobAction} className="grid gap-5 lg:grid-cols-2">
            <FormField label="Customer">
              <select className={fieldClass} name="customer_id" required>
                <option value="">Select customer</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Technician">
              <select className={fieldClass} name="technician_name" required>
                <option value="">Select technician</option>
                {technicians.map((technician) => (
                  <option key={technician} value={technician}>
                    {technician}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Service type">
              <select className={fieldClass} name="service_type" defaultValue="normal_cleaning">
                {serviceOptions.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Status">
              <select className={fieldClass} name="status" defaultValue="confirmed">
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
              </select>
            </FormField>

            <FormField label="Date">
              <input className={fieldClass} name="scheduled_date" type="date" required />
            </FormField>

            <FormField label="Time">
              <input className={fieldClass} name="scheduled_time" type="time" required />
            </FormField>

            <FormField label="Price">
              <input className={fieldClass} name="price" type="number" min="0" step="1" placeholder="0" />
            </FormField>

            <div className="lg:col-span-2">
              <FormField label="Job address">
                <textarea className={fieldClass} name="address" rows={3} placeholder="Service address" required />
              </FormField>
            </div>

            <div className="lg:col-span-2">
              <FormField label="Admin notes">
                <textarea className={fieldClass} name="notes" rows={3} placeholder="Unit details, access notes, parts to bring" />
              </FormField>
            </div>

            <button type="submit" className="focus-ring inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 font-bold text-white shadow-lg shadow-primary/20 hover:bg-blue-700 lg:w-fit">
              <Save className="h-5 w-5" aria-hidden="true" /> Save job
            </button>
          </form>
        </SectionCard>
      </div>
    </AppShell>
  );
}
