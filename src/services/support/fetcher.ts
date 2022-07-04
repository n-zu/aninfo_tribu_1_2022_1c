export const supportAPIUrl = "https://squad320221c-production.up.railway.app";
export const psaExternalUrl =
  "https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae";

export const postHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const genericFetcher = (
  baseUrl: string,
  resource: string,
  options?: RequestInit
) =>
  fetch(baseUrl + resource, options)
    .then((res) => {
      if (res.status >= 400) throw new Error(`Error code: ${res.status}`);
      return res;
    })
    .then((res) => res.json());

export const supportFetcher = (resource: string, options?: RequestInit) =>
  genericFetcher(supportAPIUrl, resource, options);

export const psaExternalFetcher = (resource: string, options?: RequestInit) =>
  genericFetcher(psaExternalUrl, resource, options);
