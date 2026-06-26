import { describe, expect, it } from "vitest";
import { validateCustomerInput } from "@/lib/validators";

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
