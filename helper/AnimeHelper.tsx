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

export const fetchInsertAnime = async (
  title: string,
  abbreviation?: string,
  kana?: string,
  engName?: string,
  thumb?: any,
  content?: string,
  onAirState?: string,
  seriesId?: string,
  season?: string,
  stories?: string
) => {
  const formData = new FormData();
  formData.set("title", title);
  formData.set("abbreviation", abbreviation);
  formData.set("kana", kana);
  formData.set("engName", engName);
  thumb[0] && formData.set("thumb", thumb[0]);
  formData.set("content", content);
  formData.set("onair", onAirState);
  formData.set("series", seriesId);
  formData.set("season", season);
  formData.set("stories", stories);
  const res = await fetch(`${BACKEND_URL}/db/anime/post/`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    body: formData,
  });
  const ret = await res.json();
  return ret;
};
