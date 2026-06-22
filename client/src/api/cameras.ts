import type { ProductCardProps } from "../types/product";

const BASE_URL = "http://localhost:5000";

export async function fetchCameras(): Promise<ProductCardProps[]> {
  const response = await fetch(`${BASE_URL}/api/cameras`);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch cameras: ${response.status} ${errorText}`);
  }
  const data = (await response.json()) as ProductCardProps[];
  return data;
}
