"use client";

import React, { useEffect, useState } from "react";

type CSSWithVars = React.CSSProperties & {
  "--value"?: number;
};

export default function CountdownTimer() {
  // Example: countdown from 2 days (in seconds)
  const [timeLeft, setTimeLeft] = useState(2 * 24 * 60 * 60);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Convert total seconds -> days, hours, minutes, seconds
  const days = Math.floor(timeLeft / (24 * 60 * 60));
  const hours = Math.floor((timeLeft % (24 * 60 * 60)) / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const counter = "countdown timer";

  return (
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
      <div className="flex flex-col">
        <span className="countdown font-mono text-5xl">
          <span
            style={{ "--value": days } as CSSWithVars}
            aria-live="polite"
            aria-label={counter}
          />
        </span>
        days
      </div>
      <div className="flex flex-col">
        <span className="countdown font-mono text-5xl">
          <span
            style={{ "--value": hours } as CSSWithVars}
            aria-live="polite"
            aria-label={counter}
          />
        </span>
        hours
      </div>
      <div className="flex flex-col">
        <span className="countdown font-mono text-5xl">
          <span
            style={{ "--value": minutes } as CSSWithVars}
            aria-live="polite"
            aria-label={counter}
          />
        </span>
        min
      </div>
      <div className="flex flex-col">
        <span className="countdown font-mono text-5xl">
          <span
            style={{ "--value": seconds } as CSSWithVars}
            aria-live="polite"
            aria-label={counter}
          />
        </span>
        sec
      </div>
    </div>
  );
}
