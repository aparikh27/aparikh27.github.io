import type { CSSProperties } from 'react';

/**
 * `CSSProperties` rejects custom properties, so passing `--reveal-delay`
 * inline needs this widening. Used wherever a component takes per-instance
 * animation timing as a CSS variable.
 */
export type StyleWithVars = CSSProperties & Record<`--${string}`, string | number>;
