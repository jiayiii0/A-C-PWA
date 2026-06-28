import { Job, StatusTone } from "@/types/domain";

export type ScheduleCapacity = {
  label: string;
  helper: string;
  recommendedJobs: string;
  tone: StatusTone;
};

export type ScheduleDay = {
  date: string;
  jobs: Job[];
  capacity: ScheduleCapacity;
};

const installationTypes = new Set(["installation"]);

export function getScheduleCapacity(jobs: Job[]): ScheduleCapacity {
  if (jobs.some((job) => installationTypes.has(job.serviceType))) {
    return {
      label: "Full-day installation",
      helper: "Keep this day focused. Installation can take the whole day.",
      recommendedJobs: "1 order",
      tone: "blue"
    };
  }

  if (jobs.length === 0) {
    return {
      label: "Open day",
      helper: "Good slot for urgent calls or maintenance contracts.",
      recommendedJobs: "0 jobs",
      tone: "slate"
    };
  }

  if (jobs.length <= 2) {
    return {
      label: "Light route",
      helper: "Easy day with room for urgent calls.",
      recommendedJobs: "1-2 jobs",
      tone: "green"
    };
  }

  if (jobs.length <= 5) {
    return {
      label: "Normal route",
      helper: "Good daily limit for cleaning and service work.",
      recommendedJobs: "3-5 jobs",
      tone: "cyan"
    };
  }

  return {
    label: "Overloaded",
    helper: "Too many stops for one day. Move lower-priority jobs.",
    recommendedJobs: "Move 1+ jobs",
    tone: "red"
  };
}

export function buildScheduleDays(jobs: Job[]): ScheduleDay[] {
  const byDate = new Map<string, Job[]>();

  jobs.forEach((job) => {
    byDate.set(job.date, [...(byDate.get(job.date) ?? []), job]);
  });

  return Array.from(byDate.entries())
    .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
    .map(([date, dayJobs]) => {
      const sortedJobs = [...dayJobs].sort((a, b) => a.time.localeCompare(b.time));

      return {
        date,
        jobs: sortedJobs,
        capacity: getScheduleCapacity(sortedJobs)
      };
    });
}
