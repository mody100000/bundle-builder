import { useState, useEffect } from "react";
import type { ProductCardProps } from "../types/product";
import { fetchCameras } from "../api/cameras";

export function useCameras() {
  const [data, setData] = useState<ProductCardProps[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const cameras = await fetchCameras();
        if (!cancelled) {
          setData(cameras);
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
