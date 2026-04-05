"use client";

interface WaveDividerProps {
  colorVar: string;
  flip?: boolean;
}

export default function WaveDivider({ colorVar, flip }: WaveDividerProps) {
  return (
    <div
      className={`w-full overflow-hidden leading-none ${flip ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="block w-full h-12 md:h-20"
      >
        <path
          d="M0,40 C240,65 480,15 720,40 C960,65 1200,15 1440,40 L1440,80 L0,80 Z"
          style={{ fill: `var(${colorVar})` }}
        />
      </svg>
    </div>
  );
}
