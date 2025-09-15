import { useState, useCallback } from "react";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface ApiState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

export function useApiReq<T = any>() {
    const [data, setData] = useState<ApiState<T>["data"]>(null);
    const [loading, setLoading] = useState<ApiState<T>["loading"]>(false);
    const [error, setError] = useState<ApiState<T>["error"]>(null);

    const request = useCallback(
        async (url: string, method: HttpMethod = "GET", body?: any): Promise<T | null> => {
            setLoading(true);
            setError(null);

            try {
                const res = await fetch(url, {
                    method,
                    headers: body ? { "Content-Type": "application/json" } : undefined,
                    body: body ? JSON.stringify(body) : undefined,
                });

                const result = await res.json();

                if (!res.ok) {
                    setError(result.error)
                    return null;
                    // throw new Error(result.error || "Something went wrong");
                } else {
                    setData(result);
                    return result;

                }

            } catch (err: any) {
                setData(null);
                setError(err.error || "Unknown error");
                return null;
            } finally {
                setLoading(false);
            }
        },
        []
    );

    return { request, data, loading, error };
}
