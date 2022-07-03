export const supportFetcher = (resource: string) =>
  fetch("https://squad320221c-production.up.railway.app" + resource).then(
    (res) => res.json()
  );