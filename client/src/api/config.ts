import type { Selection } from "../types/product";

const BASE_URL = "http://localhost:5000";

export async function fetchConfig(systemId: string): Promise<Record<string, Selection>> {
  const response = await fetch(`${BASE_URL}/api/config?systemId=${encodeURIComponent(systemId)}`);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch config: ${response.status} ${errorText}`);
  }
  return (await response.json()) as Record<string, Selection>;
}

export async function saveConfig(systemId: string, config: Record<string, Selection>): Promise<void> {
  const response = await fetch(`${BASE_URL}/api/config?systemId=${encodeURIComponent(systemId)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(config),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to save config: ${response.status} ${errorText}`);
  }
}
