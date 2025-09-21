import { useState, useCallback } from "react";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApiReq<T = unknown>() {
  const [data, setData] = useState<ApiState<T>["data"]>(null);
  const [loading, setLoading] = useState<ApiState<T>["loading"]>(false);
  const [error, setError] = useState<ApiState<T>["error"]>(null);

  const request = useCallback(
    async (
      url: string,
      method: HttpMethod = "GET",
      body?: Record<string, unknown>
    ): Promise<T | null> => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(url, {
          method,
          headers: body ? { "Content-Type": "application/json" } : undefined,
          body: body ? JSON.stringify(body) : undefined,
        });

        const result: T = await res.json();

        if (!res.ok) {
          const message =
            (result as { error?: string }).error ?? "Something went wrong";
          setError(message);
          return null;
        } else {
          setData(result);
          return result;
        }
      } catch (err: unknown) {
        setData(null);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error");
        }
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { request, data, loading, error };
}
