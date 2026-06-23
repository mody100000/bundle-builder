import { useState, useEffect } from "react";
import type { ProductCardProps } from "../types/product";
import { fetchSensors } from "../api/sensors";

export function useSensors() {
  const [data, setData] = useState<ProductCardProps[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const sensors = await fetchSensors();
        if (!cancelled) {
          setData(sensors);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err as Error);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}
