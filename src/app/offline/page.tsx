import { WifiOff } from "lucide-react";
import { EmptyState } from "@/components/empty-state";

export default function OfflinePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-canvas p-6">
      <div className="w-full max-w-lg">
        <EmptyState icon={WifiOff} title="You are offline" text="Cached pages can still open, but database changes need an internet connection." />
      </div>
    </main>
  );
}
