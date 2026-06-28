import { describe, expect, it } from "vitest";
import { validateCustomerInput, validateJobInput, validateLoginInput, validateServiceRecordInput } from "@/lib/validators";

describe("customer form validation", () => {
  it("accepts a complete customer payload", () => {
    expect(
      validateCustomerInput({
        name: "Leong Family",
        phone: "+60 12-778 9011",
        whatsapp: "60127789011",
        address: "18 Jalan Rimbun",
        customer_type: "residential",
        notes: "Morning only"
      })
    ).toEqual({
      ok: true,
      data: {
        name: "Leong Family",
        phone: "+60 12-778 9011",
        whatsapp: "60127789011",
        address: "18 Jalan Rimbun",
        customer_type: "residential",
        notes: "Morning only"
      }
    });
  });

  it("rejects missing required customer fields", () => {
    const result = validateCustomerInput({
      name: "",
      phone: "",
      whatsapp: "",
      address: "",
      customer_type: "commercial",
      notes: ""
    });

    expect(result.ok).toBe(false);
    if (result.ok) throw new Error("Expected customer validation to fail.");
    expect(result.errors).toEqual(["Customer name is required.", "Phone is required.", "Address is required."]);
  });
});

describe("login form validation", () => {
  it("accepts valid login credentials", () => {
    expect(validateLoginInput({ email: "owner@housely-ac.com", password: "secret123" })).toEqual({
      ok: true,
      data: { email: "owner@housely-ac.com", password: "secret123" }
    });
  });

  it("rejects missing login credentials", () => {
    const result = validateLoginInput({ email: "", password: "" });

    expect(result.ok).toBe(false);
    if (result.ok) throw new Error("Expected login validation to fail.");
    expect(result.errors).toEqual(["Email is required.", "Password is required."]);
  });
});

describe("service record validation", () => {
  it("accepts a completed service record payload", () => {
    expect(
      validateServiceRecordInput({
        status: "completed",
        remarks: "Cleaned three indoor units and checked drainage.",
        parts_used: "Drain hose",
        total_price: "240",
        warranty_days: "30"
      })
    ).toEqual({
      ok: true,
      data: {
        status: "completed",
        remarks: "Cleaned three indoor units and checked drainage.",
        parts_used: "Drain hose",
        total_price: 240,
        warranty_days: 30
      }
    });
  });

  it("requires remarks when marking a job completed", () => {
    const result = validateServiceRecordInput({
      status: "completed",
      remarks: "",
      parts_used: "",
      total_price: "",
      warranty_days: ""
    });

    expect(result.ok).toBe(false);
    if (result.ok) throw new Error("Expected service record validation to fail.");
    expect(result.errors).toEqual(["Service remarks are required before completing a job."]);
  });
});

describe("job form validation", () => {
  it("accepts a scheduled job payload", () => {
    expect(
      validateJobInput({
        customer_id: "cust-101",
        technician_name: "Alicia",
        service_type: "chemical_wash",
        scheduled_date: "2026-06-29",
        scheduled_time: "09:30",
        status: "confirmed",
        address: "18 Jalan Rimbun",
        price: "280",
        notes: "Bring ladder"
      })
    ).toEqual({
      ok: true,
      data: {
        customer_id: "cust-101",
        technician_name: "Alicia",
        service_type: "chemical_wash",
        scheduled_date: "2026-06-29",
        scheduled_time: "09:30",
        status: "confirmed",
        address: "18 Jalan Rimbun",
        price: 280,
        notes: "Bring ladder"
      }
    });
  });

  it("rejects missing job scheduling fields", () => {
    const result = validateJobInput({
      customer_id: "",
      technician_name: "",
      service_type: "normal_cleaning",
      scheduled_date: "",
      scheduled_time: "",
      status: "pending",
      address: "",
      price: "-1",
      notes: ""
    });

    expect(result.ok).toBe(false);
    if (result.ok) throw new Error("Expected job validation to fail.");
    expect(result.errors).toEqual([
      "Customer is required.",
      "Technician is required.",
      "Schedule date is required.",
      "Schedule time is required.",
      "Job address is required.",
      "Price must be a valid amount."
    ]);
  });
});
