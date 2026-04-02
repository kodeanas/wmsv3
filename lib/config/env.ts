const DEFAULT_TIMEOUT_MS = 15000;

function toNumber(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export const env = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "",
  apiTimeoutMs: toNumber(process.env.NEXT_PUBLIC_API_TIMEOUT_MS, DEFAULT_TIMEOUT_MS),
};
