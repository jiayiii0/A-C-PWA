import { addMonths } from "@/lib/utils";

export function getNextContractServiceDate(completedDate: string, intervalMonths = 3) {
  return addMonths(completedDate, intervalMonths);
}

export function isWithinReminderWindow(serviceDate: string, today: string, reminderDays = 7) {
  const service = new Date(`${serviceDate}T00:00:00`).getTime();
  const now = new Date(`${today}T00:00:00`).getTime();
  const diffDays = Math.ceil((service - now) / 86_400_000);
  return diffDays >= 0 && diffDays <= reminderDays;
}

export function isContractExpiringSoon(endDate: string, today: string, days = 30) {
  const end = new Date(`${endDate}T00:00:00`).getTime();
  const now = new Date(`${today}T00:00:00`).getTime();
  const diffDays = Math.ceil((end - now) / 86_400_000);
  return diffDays >= 0 && diffDays <= days;
}

export function buildWhatsAppUrl(phone: string, message?: string) {
  const cleaned = phone.replace(/\D/g, "");
  const query = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${cleaned}${query}`;
}
