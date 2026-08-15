/** Join class names, skipping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

/** Clamp a number into an inclusive range. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Format a 0-100 number as a percentage string. */
export function formatPercent(value: number, decimals = 0): string {
  return `${value.toFixed(decimals)}%`;
}

/** Format an ISO date string into a friendly label. */
export function formatDateLabel(iso: string): string {
  const parts = iso.split('-');
  if (parts.length !== 3) return iso;
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  const month = months[Number(parts[1]) - 1] ?? parts[1];
  return `${month} ${Number(parts[2])}, ${parts[0]}`;
}

/** Convert a score 0-100 into a Tailwind-friendly status label. */
export function scoreLabel(score: number): 'high' | 'medium' | 'low' {
  if (score >= 75) return 'high';
  if (score >= 45) return 'medium';
  return 'low';
}

/** Map a number 1-9 to a deterministic accent color token. */
export function numberColor(n: number): string {
  const palette: Record<number, string> = {
    1: '#D4AF37',
    2: '#F06292',
    3: '#4DD0E1',
    4: '#81C784',
    5: '#FFB74D',
    6: '#A78BFA',
    7: '#4FC3F7',
    8: '#FF8A65',
    9: '#E57373',
  };
  return palette[((n - 1) % 9) + 1] ?? '#D4AF37';
}
