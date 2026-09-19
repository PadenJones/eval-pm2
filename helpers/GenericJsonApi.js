import { compile } from "path-to-regexp";

export class GenericJsonApiError extends Error {
  constructor(message, { status, headers, body }) {
    super(message);

    this.name = "GenericJsonApiError";
    Object.setPrototypeOf(this, GenericJsonApiError.prototype);

    this.status = status;
    this.headers = headers;
    this.body = body;
  }
}

const GenericJsonApi =
  ({
    base = "",
    headers: globalHeaders = {},
    throwOnError: globalThrowOnError = true,
    transformData: globalTransformData,
  } = {}) =>
  async ({
    method = "GET",
    path = "",
    headers = {},
    pathParams = {},
    queryParams = {},
    body = {},
    throwOnError = globalThrowOnError,
    transformData = globalTransformData,
  } = {}) => {
    path = compile(path)(pathParams);

    const searchParams = queryParams
      ? new URLSearchParams(queryParams).toString()
      : "";

    const url = new URL(path, base);
    url.search = searchParams;

    const hasBody = Object.keys(body).length > 0;

    const defaultHeaders = {};

    if (hasBody) {
      defaultHeaders["Content-Type"] = "application/json";
    }

    const response = await fetch(url, {
      method,
      headers: {
        ...defaultHeaders,
        ...globalHeaders,
        ...headers,
      },
      body: hasBody ? JSON.stringify(body) : undefined,
    });

    const contentType = response.headers.get("content-type") || "";

    const data = contentType.includes("application/json")
      ? await response.json()
      : await response.text();

    const result = {
      ok: response.ok,
      status: response.status,
      headers: Object.fromEntries(response.headers),
      data: transformData ? transformData(data) : data,
      dataRaw: transformData ? data : undefined,
    };

    if (!response.ok && throwOnError) {
      throw new GenericJsonApiError(`Api error! status: ${response.status}`, {
        status: response.status,
        headers: response.headers,
        body: data,
      });
    }

    return result;
  };

export default GenericJsonApi;
