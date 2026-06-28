import { describe, expect, it } from "vitest";
import { buildScheduleDays, getScheduleCapacity } from "@/lib/schedule";
import { Job } from "@/types/domain";

const baseJob: Job = {
  id: "job-base",
  customer: "Customer",
  customerWhatsapp: "60120000000",
  technician: "Alicia",
  serviceType: "normal_cleaning",
  date: "2026-06-26",
  time: "09:00",
  status: "confirmed",
  address: "Address",
  price: 200,
  contractJob: false
};

function job(overrides: Partial<Job>): Job {
  return { ...baseJob, ...overrides };
}

describe("schedule planning helpers", () => {
  it("marks installation days as full-day work", () => {
    expect(getScheduleCapacity([job({ serviceType: "installation" })])).toMatchObject({
      label: "Full-day installation",
      tone: "blue",
      recommendedJobs: "1 order"
    });
  });

  it("marks more than five jobs as overloaded for two workers", () => {
    const jobs = Array.from({ length: 6 }, (_, index) => job({ id: `job-${index}` }));

    expect(getScheduleCapacity(jobs)).toMatchObject({
      label: "Overloaded",
      tone: "red",
      recommendedJobs: "Move 1+ jobs"
    });
  });

  it("groups jobs by day and sorts each day by time", () => {
    const days = buildScheduleDays([
      job({ id: "late", date: "2026-06-27", time: "13:00" }),
      job({ id: "early", date: "2026-06-27", time: "09:00" }),
      job({ id: "today", date: "2026-06-26", time: "10:00" })
    ]);

    expect(days.map((day) => day.date)).toEqual(["2026-06-26", "2026-06-27"]);
    expect(days[1].jobs.map((item) => item.id)).toEqual(["early", "late"]);
  });
});
