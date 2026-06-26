import { describe, expect, it } from "vitest";
import { mapContractRow, mapCustomerRow, mapInvoiceRow, mapJobRow } from "@/lib/data-mappers";

describe("Supabase row mappers", () => {
  it("maps customer rows into UI customer cards", () => {
    expect(
      mapCustomerRow({
        id: "cus-100",
        name: "North Clinic",
        phone: "+60 3-1111 2222",
        whatsapp: null,
        address: "Level 2, Jalan Ampang",
        customer_type: "commercial",
        notes: null,
        aircon_units: [{ id: "unit-1" }, { id: "unit-2" }],
        contracts: [{ status: "expiring_soon", next_service_date: "2026-07-01" }]
      })
    ).toEqual({
      id: "cus-100",
      name: "North Clinic",
      phone: "+60 3-1111 2222",
      whatsapp: "",
      address: "Level 2, Jalan Ampang",
      type: "Commercial",
      notes: "",
      units: 2,
      nextService: "2026-07-01",
      contractStatus: "Expiring Soon"
    });
  });

  it("maps job rows with related customer and technician names", () => {
    expect(
      mapJobRow({
        id: "job-200",
        service_type: "chemical_wash",
        scheduled_date: "2026-06-26",
        scheduled_time: "13:30:00",
        status: "in_progress",
        address: "Shop 12",
        price: 680,
        contract_id: "con-1",
        customers: { name: "Bright Dental", whatsapp: "60132223333" },
        users: { full_name: "Ben" }
      })
    ).toMatchObject({
      id: "job-200",
      customer: "Bright Dental",
      technician: "Ben",
      customerWhatsapp: "60132223333",
      serviceType: "chemical_wash",
      date: "2026-06-26",
      time: "13:30",
      status: "in_progress",
      contractJob: true
    });
  });

  it("maps contracts and invoices into UI records", () => {
    expect(
      mapContractRow({
        id: "con-300",
        end_date: "2026-07-20",
        interval_months: 3,
        price_per_visit: 520,
        number_of_units: 5,
        status: "active",
        next_service_date: "2026-06-30",
        customers: { name: "Bright Dental" }
      })
    ).toMatchObject({ customer: "Bright Dental", pricePerVisit: 520, units: 5, status: "Active" });

    expect(
      mapInvoiceRow({
        id: "inv-400",
        invoice_number: "HA-2026-0040",
        total: 180,
        payment_status: "partial",
        issued_date: "2026-06-24",
        customers: { name: "Maya Tan" }
      })
    ).toEqual({
      id: "inv-400",
      invoiceNumber: "HA-2026-0040",
      customer: "Maya Tan",
      total: 180,
      status: "partial",
      issuedDate: "2026-06-24"
    });
  });
});
