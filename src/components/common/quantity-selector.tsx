"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 10,
  className,
}: QuantitySelectorProps) {
  return (
    <div
      className={cn(
        "inline-flex w-fit items-center rounded-full border border-border",
        className,
      )}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        className="flex size-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
      >
        <Minus className="size-4" />
      </button>
      <span className="w-8 text-center text-sm font-medium text-foreground" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        className="flex size-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}

export { QuantitySelector };
