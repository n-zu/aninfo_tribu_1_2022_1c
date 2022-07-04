export const supportAPIUrl = "https://squad320221c-production.up.railway.app";

export const supportFetcher = (resource: string, options?: RequestInit) =>
  fetch(supportAPIUrl + resource, options)
    .then((res) => {
      if (res.status >= 400) throw new Error(`Error code: ${res.status}`);
      return res;
    })
    .then((res) => res.json());
