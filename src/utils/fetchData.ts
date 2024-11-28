interface QueryParams {
  [key: string]: string | number | boolean | null | undefined;
}

export interface FetchDataOptions {
  url?: string;
  query?: QueryParams;
  method?:
    | "GET"
    | "POST"
    | "PUT"
    | "DELETE"
    | "PATCH"
    | "OPTIONS"
    | "HEAD"
    | "CONNECT"
    | "TRACE";
  body?: any;
  headers?: HeadersInit;
}

const fetchData = async ({
  url = "",
  query = {},
  method = "GET",
  body = null,
  headers = {},
}: FetchDataOptions): Promise<any> => {
  const queryString = new URLSearchParams(
    query as Record<string, string>
  ).toString();

  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  };

  const response = await fetch(`${url}?${queryString}`, options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();
  return result;
};

export default fetchData;
