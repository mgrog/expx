export function displayPercent(value: number | string | undefined, precision: number) {
  if (!value) return '';
  let val = typeof value === 'string' ? parseFloat(value) : value;
  return `${(val * 100).toFixed(precision)}%`;
}
