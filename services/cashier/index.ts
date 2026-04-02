import { httpRequest } from "@/lib/http/client";
import { endpoints } from "@/services/endpoints";

export function getCashierHealth() {
  return httpRequest<{ status: string }>(`${endpoints.cashier.base}/health`);
}
