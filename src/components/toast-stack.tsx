import { CheckCircle2, CircleAlert } from "lucide-react";

export function ToastStack() {
  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-50 hidden w-80 space-y-3 2xl:block">
      <div className="rounded-2xl border border-success/20 bg-white/95 p-4 text-sm shadow-soft backdrop-blur">
        <div className="flex gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 text-success" aria-hidden="true" />
          <div>
            <p className="font-semibold text-ink">Schedule ready</p>
            <p className="mt-1 text-muted">Contract reminders are calculated from the next service date.</p>
          </div>
        </div>
      </div>
      <div className="rounded-2xl border border-warning/20 bg-white/95 p-4 text-sm shadow-soft backdrop-blur">
        <div className="flex gap-3">
          <CircleAlert className="mt-0.5 h-5 w-5 text-warning" aria-hidden="true" />
          <div>
            <p className="font-semibold text-ink">2 payments need attention</p>
            <p className="mt-1 text-muted">Follow up before closing this week&apos;s report.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
