export interface Plan {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  discountBadge?: string;
  interval: string;
  features: string[];
  image: string;
}

const BASE_URL = import.meta.env.DEV ? "http://localhost:5000" : "";

export async function fetchPlans(): Promise<Plan[]> {
  const response = await fetch(`${BASE_URL}/api/plans`);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch plans: ${response.status} ${errorText}`);
  }
  const data = (await response.json()) as Plan[];
  return data;
}
