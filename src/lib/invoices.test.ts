import { describe, expect, it } from "vitest";
import { buildInvoiceDraft, buildPaymentDraft, calculateInvoicePaymentSummary, getNextInvoiceNumber } from "@/lib/invoices";

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

  it("summarizes unpaid, partial, and paid invoice balances", () => {
    expect(calculateInvoicePaymentSummary(680, [])).toEqual({
      paidAmount: 0,
      balanceDue: 680,
      paymentStatus: "unpaid"
    });

    expect(calculateInvoicePaymentSummary(680, [{ amount: 200 }, { amount: "130" }])).toEqual({
      paidAmount: 330,
      balanceDue: 350,
      paymentStatus: "partial"
    });

    expect(calculateInvoicePaymentSummary(240, [{ amount: 300 }])).toEqual({
      paidAmount: 300,
      balanceDue: 0,
      paymentStatus: "paid"
    });
  });

  it("builds payment insert rows and rejects empty payment amounts", () => {
    expect(
      buildPaymentDraft({
        invoiceId: "inv-301",
        amount: "120.50",
        method: "duitnow",
        notes: "Deposit"
      })
    ).toEqual({
      invoice_id: "inv-301",
      amount: 120.5,
      method: "duitnow",
      notes: "Deposit"
    });

    expect(() => buildPaymentDraft({ invoiceId: "inv-301", amount: 0, method: "cash" })).toThrow("Payment amount must be greater than zero.");
  });
});
