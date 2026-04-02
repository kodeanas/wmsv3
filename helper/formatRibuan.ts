export function formatRibuan(value: number | string): string {
  const numericValue = typeof value === "string" ? Number(value.replace(/[^\d.-]/g, "")) : value;

  if (!Number.isFinite(numericValue)) {
    return "0";
  }

  return new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 0,
  }).format(numericValue);
}
