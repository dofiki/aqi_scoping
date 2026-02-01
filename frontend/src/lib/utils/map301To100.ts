export default function map301To100(value: number): number {
  if (value <= 0) return 0;
  if (value >= 301) return 100;

  return Math.round((value / 301) * 100);
}
