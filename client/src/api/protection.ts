import type { ProductCardProps } from "../types/product";

const BASE_URL = "http://localhost:5000";

export async function fetchProtection(): Promise<ProductCardProps[]> {
  const response = await fetch(`${BASE_URL}/api/protection`);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch protection: ${response.status} ${errorText}`);
  }
  const data = (await response.json()) as ProductCardProps[];
  return data;
}
