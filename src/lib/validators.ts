type CustomerInput = {
  name: string;
  phone: string;
  whatsapp: string;
  address: string;
  customer_type: "residential" | "commercial";
  notes: string;
};

export type CustomerValidationResult =
  | { ok: true; data: CustomerInput }
  | { ok: false; errors: string[] };

function text(value: FormDataEntryValue | string | null) {
  return String(value ?? "").trim();
}

export function validateCustomerInput(input: Record<string, FormDataEntryValue | string | null>): CustomerValidationResult {
  const customerType = text(input.customer_type);
  const data: CustomerInput = {
    name: text(input.name),
    phone: text(input.phone),
    whatsapp: text(input.whatsapp),
    address: text(input.address),
    customer_type: customerType === "commercial" ? "commercial" : "residential",
    notes: text(input.notes)
  };
  const errors: string[] = [];

  if (!data.name) errors.push("Customer name is required.");
  if (!data.phone) errors.push("Phone is required.");
  if (!data.address) errors.push("Address is required.");

  return errors.length ? { ok: false, errors } : { ok: true, data };
}
