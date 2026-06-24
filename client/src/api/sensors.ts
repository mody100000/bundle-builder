import type { ProductCardProps } from "../types/product";

const BASE_URL = "http://localhost:5000";

export async function fetchSensors(): Promise<ProductCardProps[]> {
  const response = await fetch(`${BASE_URL}/api/sensors`);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch sensors: ${response.status} ${errorText}`);
  }
  const data = (await response.json()) as ProductCardProps[];
  return data;
}
