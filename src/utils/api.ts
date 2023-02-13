async function request<TResponse>(
  url: string,
  config: RequestInit = {}
): Promise<TResponse> {
  const response = await fetch(url, config);
  const data = await response.json();
  return data as TResponse;
}

const api = {
  get: <TResponse>(url: string) => request<TResponse>(url),

  post: <TResponse>(url: string, body: BodyInit, headers?: HeadersInit) =>
    request<TResponse>(url, { method: "POST", body, headers }),
};

export default api;
