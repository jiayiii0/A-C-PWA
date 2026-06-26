import { describe, expect, it } from "vitest";
import {
  getNextContractServiceDate,
  isContractExpiringSoon,
  isWithinReminderWindow
} from "@/lib/business-rules";

describe("contract service scheduling rules", () => {
  it("adds the contract interval to completed cleaning jobs", () => {
    expect(getNextContractServiceDate("2026-06-26", 3)).toBe("2026-09-26");
  });

  it("shows service reminders during the 7 day window only", () => {
    expect(isWithinReminderWindow("2026-07-03", "2026-06-26")).toBe(true);
    expect(isWithinReminderWindow("2026-07-04", "2026-06-26")).toBe(false);
    expect(isWithinReminderWindow("2026-06-25", "2026-06-26")).toBe(false);
  });

  it("flags contracts expiring within 30 days", () => {
    expect(isContractExpiringSoon("2026-07-20", "2026-06-26")).toBe(true);
    expect(isContractExpiringSoon("2026-08-01", "2026-06-26")).toBe(false);
  });
});
