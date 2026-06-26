import { contracts, customers, invoices, jobs, technicians } from "@/lib/mock-data";
import {
  ContractRow,
  CustomerRow,
  InvoiceRow,
  JobRow,
  mapContractRow,
  mapCustomerRow,
  mapInvoiceRow,
  mapJobRow
} from "@/lib/data-mappers";
import { supabase } from "@/lib/supabase";

const FALLBACK_TODAY = "2026-06-26";

async function fromSupabase<T>(query: PromiseLike<{ data: unknown; error: unknown }>, fallback: T[]) {
  if (!supabase) return fallback;

  const { data, error } = await query;
  if (error || !Array.isArray(data)) return fallback;
  return data as T[];
}

export async function getCustomers() {
  const rows = await fromSupabase<CustomerRow>(
    supabase
      ? supabase
          .from("customers")
          .select("id,name,phone,whatsapp,address,customer_type,notes,aircon_units(id),contracts(status,next_service_date)")
          .order("name")
      : Promise.resolve({ data: null, error: null }),
    []
  );

  return rows.length ? rows.map(mapCustomerRow) : customers;
}

export async function getCustomerById(id: string) {
  const list = await getCustomers();
  return list.find((customer) => customer.id === id) ?? list[0];
}

export async function getJobs() {
  const rows = await fromSupabase<JobRow>(
    supabase
      ? supabase
          .from("jobs")
          .select("id,service_type,scheduled_date,scheduled_time,status,address,price,contract_id,customers(name,whatsapp),users(full_name)")
          .order("scheduled_date")
          .order("scheduled_time")
      : Promise.resolve({ data: null, error: null }),
    []
  );

  return rows.length ? rows.map(mapJobRow) : jobs;
}

export async function getJobById(id: string) {
  const list = await getJobs();
  return list.find((job) => job.id === id) ?? list[0];
}

export async function getTodayJobs(today = FALLBACK_TODAY) {
  const list = await getJobs();
  return list.filter((job) => job.date === today);
}

export async function getContracts() {
  const rows = await fromSupabase<ContractRow>(
    supabase
      ? supabase
          .from("contracts")
          .select("id,end_date,interval_months,price_per_visit,number_of_units,status,next_service_date,customers(name)")
          .order("next_service_date")
      : Promise.resolve({ data: null, error: null }),
    []
  );

  return rows.length ? rows.map(mapContractRow) : contracts;
}

export async function getInvoices() {
  const rows = await fromSupabase<InvoiceRow>(
    supabase
      ? supabase
          .from("invoices")
          .select("id,invoice_number,total,payment_status,issued_date,customers(name)")
          .order("issued_date", { ascending: false })
      : Promise.resolve({ data: null, error: null }),
    []
  );

  return rows.length ? rows.map(mapInvoiceRow) : invoices;
}

export async function getTechnicians() {
  if (!supabase) return [...technicians];

  const { data, error } = await supabase.from("users").select("full_name").eq("role", "technician").order("full_name");
  if (error || !data?.length) return [...technicians];

  return data.map((item) => item.full_name);
}
