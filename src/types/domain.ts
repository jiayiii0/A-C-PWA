export type StatusTone = "blue" | "cyan" | "green" | "amber" | "red" | "slate";

export type JobStatus = "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";

export type Customer = {
  id: string;
  name: string;
  phone: string;
  whatsapp: string;
  address: string;
  type: "Residential" | "Commercial";
  notes: string;
  units: number;
  nextService: string;
  contractStatus: "Active" | "Expiring Soon" | "Expired" | "No Contract";
};

export type Job = {
  id: string;
  customer: string;
  customerWhatsapp: string;
  technician: "Alicia" | "Ben";
  serviceType: string;
  date: string;
  time: string;
  status: JobStatus;
  address: string;
  price: number;
  contractJob: boolean;
};

export type Contract = {
  id: string;
  customer: string;
  endDate: string;
  intervalMonths: number;
  pricePerVisit: number;
  units: number;
  status: "Active" | "Expiring Soon" | "Expired";
  nextService: string;
};

export type Invoice = {
  id: string;
  invoiceNumber: string;
  customer: string;
  subtotal: number;
  discount: number;
  total: number;
  status: "paid" | "unpaid" | "partial";
  paidAmount: number;
  balanceDue: number;
  issuedDate: string;
};
