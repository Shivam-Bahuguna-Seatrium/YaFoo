import { AlarmClock, CheckCircle2, Timer } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { timingStatusLabel } from "@/lib/utils/format";
import type { TimingStatus } from "@/types/domain";

const statusConfig: Record<
  TimingStatus,
  { tone: "green" | "amber" | "red"; icon: typeof CheckCircle2 }
> = {
  "ready-before-arrival": { tone: "green", icon: CheckCircle2 },
  "timing-matched": { tone: "amber", icon: AlarmClock },
  "may-require-waiting": { tone: "red", icon: Timer },
};

export function TimingMatchBadge({
  status,
  compact = false,
}: {
  status: TimingStatus;
  compact?: boolean;
}) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge tone={config.tone} className={compact ? "min-h-6 px-2 text-[0.6rem]" : undefined}>
      <Icon className="size-3.5" />
      {timingStatusLabel(status)}
    </Badge>
  );
}
