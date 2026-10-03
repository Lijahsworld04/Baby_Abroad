import { cn } from "@/lib/utils";

/** Small storybook flourish: a gold four-point star between two fading lines. */
export function Ornament({ className }: { className?: string }) {
  return (
    <div
      className={cn("mx-auto flex items-center justify-center gap-3 text-primary", className)}
      aria-hidden="true"
    >
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-primary/60" />
      <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
        <path d="M12 1 L14.4 9.6 L23 12 L14.4 14.4 L12 23 L9.6 14.4 L1 12 L9.6 9.6 Z" />
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-primary/60" />
    </div>
  );
}
