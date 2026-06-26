import { describe, expect, it } from "vitest";
import { buildInvoiceDraft, getNextInvoiceNumber } from "@/lib/invoices";

describe("invoice helpers", () => {
  it("increments the latest invoice number for the same year", () => {
    expect(getNextInvoiceNumber(["HA-2026-0018", "HA-2026-0020", "HA-2025-0099"], 2026)).toBe("HA-2026-0021");
  });

  it("starts numbering when no invoice exists for the year", () => {
    expect(getNextInvoiceNumber(["HA-2025-0099"], 2026)).toBe("HA-2026-0001");
  });

  it("calculates invoice totals from job price and discount", () => {
    expect(
      buildInvoiceDraft({
        invoiceNumber: "HA-2026-0021",
        jobId: "job-101",
        customerId: "cus-001",
        jobPrice: 240,
        discount: 40,
        issuedDate: "2026-06-27"
      })
    ).toEqual({
      invoice_number: "HA-2026-0021",
      job_id: "job-101",
      customer_id: "cus-001",
      subtotal: 240,
      discount: 40,
      total: 200,
      payment_status: "unpaid",
      issued_date: "2026-06-27"
    });
  });
});
