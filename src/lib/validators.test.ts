import { describe, expect, it } from "vitest";
import { validateCustomerInput, validateLoginInput } from "@/lib/validators";

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
