import { describe, expect, it } from "vitest";
import { buildServicePhotoPath, isUploadableImage } from "@/lib/storage";

describe("service photo storage helpers", () => {
  it("builds deterministic bucket paths for service photos", () => {
    expect(buildServicePhotoPath("job-123", "before", "Living Room AC 01.JPG", 0)).toBe(
      "service-records/job-123/before/1-living-room-ac-01.jpg"
    );
  });

  it("allows only non-empty image files", () => {
    const image = new File(["binary"], "photo.png", { type: "image/png" });
    const pdf = new File(["binary"], "invoice.pdf", { type: "application/pdf" });
    const empty = new File([], "empty.jpg", { type: "image/jpeg" });

    expect(isUploadableImage(image)).toBe(true);
    expect(isUploadableImage(pdf)).toBe(false);
    expect(isUploadableImage(empty)).toBe(false);
  });
});
