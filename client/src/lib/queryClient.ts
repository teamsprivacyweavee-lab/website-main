import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  url: string,
  options?: RequestInit
): Promise<Response> {
  const defaultOptions: RequestInit = {
    method: 'GET',
    credentials: "include"
  };

  const mergedOptions = { ...defaultOptions, ...options };
  
  // Don't set Content-Type for FormData (browser will set it with boundary)
  if (mergedOptions.body && !(mergedOptions.body instanceof FormData)) {
    if (!mergedOptions.headers) {
      mergedOptions.headers = {
        "Content-Type": "application/json"
      };
    }
    
    // Convert body to JSON if it's not already a string or FormData
    if (typeof mergedOptions.body === 'object' && !(mergedOptions.body instanceof FormData)) {
      mergedOptions.body = JSON.stringify(mergedOptions.body);
    }
  }

  const res = await fetch(url, mergedOptions);
  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey[0] as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
