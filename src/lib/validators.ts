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

type LoginInput = {
  email: string;
  password: string;
};

export type LoginValidationResult =
  | { ok: true; data: LoginInput }
  | { ok: false; errors: string[] };

type ServiceRecordInput = {
  status: "confirmed" | "in_progress" | "completed" | "cancelled";
  remarks: string;
  parts_used: string;
  total_price: number;
  warranty_days: number;
};

export type ServiceRecordValidationResult =
  | { ok: true; data: ServiceRecordInput }
  | { ok: false; errors: string[] };

type JobInput = {
  customer_id: string;
  technician_name: string;
  service_type: string;
  scheduled_date: string;
  scheduled_time: string;
  status: "pending" | "confirmed";
  address: string;
  price: number;
  notes: string;
};

export type JobValidationResult =
  | { ok: true; data: JobInput }
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

export function validateLoginInput(input: Record<string, FormDataEntryValue | string | null>): LoginValidationResult {
  const data: LoginInput = {
    email: text(input.email).toLowerCase(),
    password: text(input.password)
  };
  const errors: string[] = [];

  if (!data.email) errors.push("Email is required.");
  if (!data.password) errors.push("Password is required.");

  return errors.length ? { ok: false, errors } : { ok: true, data };
}

function numberInput(value: FormDataEntryValue | string | null) {
  const normalized = text(value);
  return normalized ? Number(normalized) : 0;
}

export function validateServiceRecordInput(input: Record<string, FormDataEntryValue | string | null>): ServiceRecordValidationResult {
  const status = text(input.status);
  const data: ServiceRecordInput = {
    status: status === "completed" || status === "cancelled" || status === "in_progress" ? status : "confirmed",
    remarks: text(input.remarks),
    parts_used: text(input.parts_used),
    total_price: numberInput(input.total_price),
    warranty_days: numberInput(input.warranty_days)
  };
  const errors: string[] = [];

  if (data.status === "completed" && !data.remarks) {
    errors.push("Service remarks are required before completing a job.");
  }
  if (!Number.isFinite(data.total_price) || data.total_price < 0) {
    errors.push("Total price must be a valid amount.");
  }
  if (!Number.isInteger(data.warranty_days) || data.warranty_days < 0) {
    errors.push("Warranty days must be a whole number.");
  }

  return errors.length ? { ok: false, errors } : { ok: true, data };
}

const serviceTypes = new Set(["normal_cleaning", "chemical_wash", "repair", "diagnosis", "gas_top_up", "installation"]);

export function validateJobInput(input: Record<string, FormDataEntryValue | string | null>): JobValidationResult {
  const status = text(input.status);
  const serviceType = text(input.service_type);
  const data: JobInput = {
    customer_id: text(input.customer_id),
    technician_name: text(input.technician_name),
    service_type: serviceTypes.has(serviceType) ? serviceType : "normal_cleaning",
    scheduled_date: text(input.scheduled_date),
    scheduled_time: text(input.scheduled_time),
    status: status === "pending" ? "pending" : "confirmed",
    address: text(input.address),
    price: numberInput(input.price),
    notes: text(input.notes)
  };
  const errors: string[] = [];

  if (!data.customer_id) errors.push("Customer is required.");
  if (!data.technician_name) errors.push("Technician is required.");
  if (!data.scheduled_date) errors.push("Schedule date is required.");
  if (!data.scheduled_time) errors.push("Schedule time is required.");
  if (!data.address) errors.push("Job address is required.");
  if (!Number.isFinite(data.price) || data.price < 0) errors.push("Price must be a valid amount.");

  return errors.length ? { ok: false, errors } : { ok: true, data };
}
