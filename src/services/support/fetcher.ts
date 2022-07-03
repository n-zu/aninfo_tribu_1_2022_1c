export const supportAPIUrl = "https://squad320221c-production.up.railway.app";

export const supportFetcher = (resource: string, options?: RequestInit ) =>
  fetch(supportAPIUrl + resource, options).then((res) => res.json());