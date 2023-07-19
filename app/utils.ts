export async function fetchCustom<T>(input: RequestInfo | URL, init?: RequestInit | undefined) {
  const res = await fetch(input, init);
  if (!res.ok) {
    throw new Error(`Error fetching ${input}: ${res.statusText}`);
  }
  const data = (await res.json()) as T;
  return data;
}

export function getTRCurrency(price: number) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 2 }).format(price);
}
export function splitTRFraction(price: string) {
  const parts = price.split(',');
  return {
    integer: parts[0],
    fraction: parts[1],
  };
}
