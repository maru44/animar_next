export const IDENTITY_URL = process.env.NEXT_PUBLIC_IDENTITY_URL;
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const DEFAULT_USER_IMAGE = process.env.NEXT_PUBLIC_DEFAULT_USER_IMAGE;

export const baseFetcher = async (url: string) => {
  const res = await fetch(url, {
    method: "GET",
    mode: "cors",
    credentials: "include",
  });
  const ret = await res.json();

  return ret["data"];
};
