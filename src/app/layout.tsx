import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { RegisterServiceWorker } from "@/components/register-service-worker";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Housely A/C | CoolCare Service Manager",
  description: "Internal PWA for Housely A/C customers, jobs, contracts, invoices, and service records.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Housely A/C"
  }
};

export const viewport: Viewport = {
  themeColor: "#F9FBFF",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RegisterServiceWorker />
        {children}
      </body>
    </html>
  );
}
