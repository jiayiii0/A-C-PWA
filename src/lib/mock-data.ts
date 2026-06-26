import { Contract, Customer, Invoice, Job } from "@/types/domain";

export const customers: Customer[] = [
  {
    id: "cus-001",
    name: "Leong Family",
    phone: "+60 12-778 9011",
    whatsapp: "60127789011",
    address: "18 Jalan Rimbun, Taman Desa",
    type: "Residential",
    notes: "Prefers morning visits. Shoes off inside.",
    units: 3,
    nextService: "2026-07-03",
    contractStatus: "Active"
  },
  {
    id: "cus-002",
    name: "Bright Dental Studio",
    phone: "+60 3-2288 1140",
    whatsapp: "60322881140",
    address: "Lot 2-11, Plaza Sentral",
    type: "Commercial",
    notes: "Service before clinic opens.",
    units: 5,
    nextService: "2026-06-30",
    contractStatus: "Expiring Soon"
  },
  {
    id: "cus-003",
    name: "Maya Tan",
    phone: "+60 16-341 8820",
    whatsapp: "60163418820",
    address: "A-12-08, Vista Residence",
    type: "Residential",
    notes: "Has one inverter unit with intermittent leaking.",
    units: 2,
    nextService: "2026-07-14",
    contractStatus: "No Contract"
  }
];

export const jobs: Job[] = [
  {
    id: "job-101",
    customer: "Leong Family",
    customerWhatsapp: "60127789011",
    technician: "Alicia",
    serviceType: "normal_cleaning",
    date: "2026-06-26",
    time: "09:00",
    status: "confirmed",
    address: "18 Jalan Rimbun, Taman Desa",
    price: 240,
    contractJob: true
  },
  {
    id: "job-102",
    customer: "Bright Dental Studio",
    customerWhatsapp: "60322881140",
    technician: "Ben",
    serviceType: "chemical_wash",
    date: "2026-06-26",
    time: "13:30",
    status: "in_progress",
    address: "Lot 2-11, Plaza Sentral",
    price: 680,
    contractJob: false
  },
  {
    id: "job-103",
    customer: "Maya Tan",
    customerWhatsapp: "60163418820",
    technician: "Alicia",
    serviceType: "repair",
    date: "2026-06-27",
    time: "10:30",
    status: "pending",
    address: "A-12-08, Vista Residence",
    price: 180,
    contractJob: false
  }
];

export const contracts: Contract[] = [
  {
    id: "con-201",
    customer: "Leong Family",
    endDate: "2027-02-15",
    intervalMonths: 3,
    pricePerVisit: 240,
    units: 3,
    status: "Active",
    nextService: "2026-07-03"
  },
  {
    id: "con-202",
    customer: "Bright Dental Studio",
    endDate: "2026-07-20",
    intervalMonths: 3,
    pricePerVisit: 520,
    units: 5,
    status: "Expiring Soon",
    nextService: "2026-06-30"
  }
];

export const invoices: Invoice[] = [
  {
    id: "inv-301",
    invoiceNumber: "HA-2026-0018",
    customer: "Leong Family",
    total: 240,
    status: "paid",
    issuedDate: "2026-06-12"
  },
  {
    id: "inv-302",
    invoiceNumber: "HA-2026-0019",
    customer: "Bright Dental Studio",
    total: 680,
    status: "partial",
    issuedDate: "2026-06-18"
  },
  {
    id: "inv-303",
    invoiceNumber: "HA-2026-0020",
    customer: "Maya Tan",
    total: 180,
    status: "unpaid",
    issuedDate: "2026-06-24"
  }
];

export const technicians = ["Alicia", "Ben"] as const;
