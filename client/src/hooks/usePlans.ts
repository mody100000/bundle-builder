import { useState, useEffect } from "react";
import { fetchPlans, type Plan } from "../api/plans";

export function usePlans() {
  const [data, setData] = useState<Plan[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const plans = await fetchPlans();
        if (!cancelled) {
          setData(plans);
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
