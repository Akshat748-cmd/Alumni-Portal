"use client";

import React, { useState } from "react";
import ReactCountUp from "react-countup";
import { useInView } from "framer-motion";

interface CountUpProps {
  end: number;
  start?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
  decimals?: number;
  className?: string;
}

export function CountUp({
  end,
  start = 0,
  duration = 2.2,
  prefix = "",
  suffix = "",
  separator = ",",
  decimals = 0,
  className,
}: CountUpProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <span ref={ref} className={className}>
      {isInView ? (
        <ReactCountUp
          start={start}
          end={end}
          duration={duration}
          prefix={prefix}
          suffix={suffix}
          separator={separator}
          decimals={decimals}
        />
      ) : (
        <span>
          {prefix}
          {start}
          {suffix}
        </span>
      )}
    </span>
  );
}

