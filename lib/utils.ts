export function jsonResponse(status: number, data: any, init?: ResponseInit) {
  return new Response(JSON.stringify(data), {
    ...init,
    status,
    headers: {
      ...init?.headers,
      'Content-Type': 'application/json',
    },
  });
}

export function displayPercent(value: number | string | undefined, precision: number) {
  if (!value) return '';
  let val = typeof value === 'string' ? parseFloat(value) : value;
  return `${(val * 100).toFixed(precision)}%`;
}
