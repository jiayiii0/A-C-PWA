"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      className="focus-ring mt-4 inline-flex items-center gap-2 rounded-2xl border border-line bg-white px-4 py-2 text-sm font-bold text-muted hover:bg-slate-50 print:hidden"
      type="button"
      onClick={() => window.print()}
    >
      <Printer className="h-4 w-4" /> Print or save PDF
    </button>
  );
}
