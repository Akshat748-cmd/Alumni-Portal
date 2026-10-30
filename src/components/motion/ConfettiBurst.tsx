"use client";

import confetti from "canvas-confetti";

export function fireConfettiBurst() {
  const count = 180;
  const defaults = {
    origin: { y: 0.7 },
    colors: ["#E9C46A", "#C9A24D", "#F3DC9C", "#0B1630", "#FFFFFF"],
    disableForReducedMotion: true,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

export function ConfettiBurst({
  onTrigger,
  children,
  className = "",
}: {
  onTrigger?: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  const handleClick = () => {
    fireConfettiBurst();
    if (onTrigger) onTrigger();
  };

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
}

