import type { ReactNode } from 'react';

export interface ChipProps {
  children: ReactNode;
  /** `solid` reads as a warm accent — reserved for highlighted metrics. */
  variant?: 'subtle' | 'solid';
  className?: string;
}

const VARIANTS: Record<NonNullable<ChipProps['variant']>, string> = {
  /* Transparent rather than filled. On a dark canvas a subtle chip uses
     a light border and muted slate text. */
  subtle: 'border-cream-50/12 bg-transparent text-slate-400',
  solid: 'border-accent-500/30 bg-accent-500/12 text-accent-500',
};

/**
 * The single badge primitive. Mono-spaced by design — stack names, versions,
 * and metrics are all machine-ish nouns, and the mono stack separates them
 * from prose at a glance without needing extra color.
 */
export function Chip({ children, variant = 'subtle', className = '' }: ChipProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-[0.6875rem] leading-none tracking-tight whitespace-nowrap ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

/** Renders a stack array as a `<ul>` so assistive tech announces the count. */
export function ChipList({ items, label }: { items: string[]; label: string }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <li key={item}>
          <Chip>{item}</Chip>
        </li>
      ))}
    </ul>
  );
}

export default Chip;
