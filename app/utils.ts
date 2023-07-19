export async function fetchCustom<T>(input: RequestInfo | URL, init?: RequestInit | undefined) {
  const res = await fetch(input, init);
  if (!res.ok) {
    throw new Error(`Error fetching ${input}: ${res.statusText}`);
  }
  const data = (await res.json()) as T;
  return data;
}
