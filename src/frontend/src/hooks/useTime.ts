import type { TimeElapsed } from "@/types";
import { useEffect, useState } from "react";

// The date Aidan & Falak met — update as needed
const WE_MET_TIMESTAMP = new Date("2023-06-15T00:00:00").getTime();

function calcElapsed(fromTs: number): TimeElapsed {
  const now = Date.now();
  const diffMs = Math.max(0, now - fromTs);

  const totalSeconds = Math.floor(diffMs / 1000);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const totalHours = Math.floor(totalMinutes / 60);
  const hours = totalHours % 24;
  const days = Math.floor(totalHours / 24);

  return { days, hours, minutes, seconds };
}

export function useTimeSinceMet(): TimeElapsed {
  const [elapsed, setElapsed] = useState<TimeElapsed>(() =>
    calcElapsed(WE_MET_TIMESTAMP),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(calcElapsed(WE_MET_TIMESTAMP));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return elapsed;
}

export function useAnniversaryCountdown(
  anniversaryTs: number | null,
): TimeElapsed | null {
  const [countdown, setCountdown] = useState<TimeElapsed | null>(null);

  useEffect(() => {
    if (!anniversaryTs) return;

    function calcCountdown(): TimeElapsed {
      const now = Date.now();
      // Find next occurrence of the anniversary
      const anniv = new Date(anniversaryTs!);
      const next = new Date(anniv);
      next.setFullYear(new Date().getFullYear());
      if (next.getTime() < now) next.setFullYear(new Date().getFullYear() + 1);

      const diffMs = Math.max(0, next.getTime() - now);
      const totalSeconds = Math.floor(diffMs / 1000);
      const seconds = totalSeconds % 60;
      const totalMinutes = Math.floor(totalSeconds / 60);
      const minutes = totalMinutes % 60;
      const totalHours = Math.floor(totalMinutes / 60);
      const hours = totalHours % 24;
      const days = Math.floor(totalHours / 24);
      return { days, hours, minutes, seconds };
    }

    setCountdown(calcCountdown());
    const interval = setInterval(() => setCountdown(calcCountdown()), 1000);
    return () => clearInterval(interval);
  }, [anniversaryTs]);

  return countdown;
}
