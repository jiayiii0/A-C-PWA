import { Contract, Customer, Invoice, Job, JobStatus } from "@/types/domain";

type ContractStatusRow = "active" | "expiring_soon" | "expired";
type PaymentStatusRow = "paid" | "unpaid" | "partial";
type Relation<T> = T | T[] | null | undefined;

export type CustomerRow = {
  id: string;
  name: string;
  phone: string;
  whatsapp: string | null;
  address: string;
  customer_type: "residential" | "commercial";
  notes: string | null;
  aircon_units?: Array<{ id: string }> | null;
  contracts?: Array<{ status: ContractStatusRow; next_service_date: string }> | null;
};

export type JobRow = {
  id: string;
  service_type: string;
  scheduled_date: string;
  scheduled_time: string;
  status: JobStatus;
  address: string;
  price: number | string;
  contract_id: string | null;
  customers?: Relation<{ name: string; whatsapp?: string | null }>;
  users?: Relation<{ full_name: string }>;
};

export type ContractRow = {
  id: string;
  end_date: string;
  interval_months: number;
  price_per_visit: number | string;
  number_of_units: number;
  status: ContractStatusRow;
  next_service_date: string;
  customers?: Relation<{ name: string }>;
};

export type InvoiceRow = {
  id: string;
  invoice_number: string;
  total: number | string;
  payment_status: PaymentStatusRow;
  issued_date: string;
  customers?: Relation<{ name: string }>;
};

const customerContractStatusLabels: Record<ContractStatusRow, Customer["contractStatus"]> = {
  active: "Active",
  expiring_soon: "Expiring Soon",
  expired: "Expired"
};

const contractStatusLabels: Record<ContractStatusRow, Contract["status"]> = {
  active: "Active",
  expiring_soon: "Expiring Soon",
  expired: "Expired"
};

const titleLabels = {
  residential: "Residential",
  commercial: "Commercial"
} as const;

function numberValue(value: number | string) {
  return typeof value === "number" ? value : Number(value);
}

function relationOne<T>(value: Relation<T>) {
  return Array.isArray(value) ? value[0] : value;
}

export function mapCustomerRow(row: CustomerRow): Customer {
  const activeContract = row.contracts?.[0];

  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    whatsapp: row.whatsapp ?? "",
    address: row.address,
    type: titleLabels[row.customer_type],
    notes: row.notes ?? "",
    units: row.aircon_units?.length ?? 0,
    nextService: activeContract?.next_service_date ?? "Not scheduled",
    contractStatus: activeContract ? customerContractStatusLabels[activeContract.status] : "No Contract"
  };
}

export function mapJobRow(row: JobRow): Job {
  const customer = relationOne(row.customers);
  const technician = relationOne(row.users);

  return {
    id: row.id,
    customer: customer?.name ?? "Unknown customer",
    customerWhatsapp: customer?.whatsapp ?? "",
    technician: technician?.full_name === "Ben" ? "Ben" : "Alicia",
    serviceType: row.service_type,
    date: row.scheduled_date,
    time: row.scheduled_time.slice(0, 5),
    status: row.status,
    address: row.address,
    price: numberValue(row.price),
    contractJob: Boolean(row.contract_id)
  };
}

export function mapContractRow(row: ContractRow): Contract {
  const customer = relationOne(row.customers);

  return {
    id: row.id,
    customer: customer?.name ?? "Unknown customer",
    endDate: row.end_date,
    intervalMonths: row.interval_months,
    pricePerVisit: numberValue(row.price_per_visit),
    units: row.number_of_units,
    status: contractStatusLabels[row.status],
    nextService: row.next_service_date
  };
}

export function mapInvoiceRow(row: InvoiceRow): Invoice {
  const customer = relationOne(row.customers);

  return {
    id: row.id,
    invoiceNumber: row.invoice_number,
    customer: customer?.name ?? "Unknown customer",
    total: numberValue(row.total),
    status: row.payment_status,
    issuedDate: row.issued_date
  };
}
