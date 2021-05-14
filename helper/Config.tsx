export const IDENTITY_URL = process.env.NEXT_PUBLIC_IDENTITY_URL;
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const baseFetcher = async (url: string) => {
  const res = await fetch(url);
  const ret = await res.json();

  return ret["Data"];
};
