export const SERVICE_PHOTO_BUCKET = "service-photos";

function safeName(fileName: string) {
  const lastDot = fileName.lastIndexOf(".");
  const extension = lastDot >= 0 ? fileName.slice(lastDot + 1).toLowerCase() : "jpg";
  const base = lastDot >= 0 ? fileName.slice(0, lastDot) : fileName;
  const slug = base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `${slug || "photo"}.${extension || "jpg"}`;
}

export function buildServicePhotoPath(jobId: string, stage: "before" | "after", fileName: string, index: number) {
  return `service-records/${jobId}/${stage}/${index + 1}-${safeName(fileName)}`;
}

export function isUploadableImage(file: File) {
  return file.size > 0 && file.type.startsWith("image/");
}
