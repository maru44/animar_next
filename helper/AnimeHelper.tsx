import { BACKEND_URL } from "./Config";

export const fetchSearchAnime = async (title: string) => {
  const res = await fetch(`${BACKEND_URL}/db/anime/search/?t=${title}`, {
    method: "GET",
    mode: "cors",
    credentials: "include",
  });
  const ret = await res.json();
  return ret;
};
