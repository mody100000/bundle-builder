import { useState, useEffect } from "react";
import type { ProductCardProps } from "../types/product";
import { fetchProtection } from "../api/protection";

export function useProtection() {
  const [data, setData] = useState<ProductCardProps[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const protection = await fetchProtection();
        if (!cancelled) {
          setData(protection);
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
