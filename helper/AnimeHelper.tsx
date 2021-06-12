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
  description?: string,
  state?: string,
  seriesId?: string,
  copyright?: string,
  stories?: string
) => {
  const formData = new FormData();
  formData.set("title", title);
  formData.set("abbreviation", abbreviation);
  formData.set("kana", kana);
  formData.set("engName", engName);
  thumb[0] && formData.set("thumb", thumb[0]);
  formData.set("description", description);
  formData.set("state", state);
  formData.set("series_id", seriesId);
  formData.set("count_episodes", stories);
  formData.set("copyright", copyright);
  const res = await fetch(`${BACKEND_URL}/admin/anime/post/`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    body: formData,
  });
  const ret = await res.json();
  return ret;
};

export const fetchUpdateAnime = async (
  animeId: number,
  title: string,
  abbreviation?: string,
  kana?: string,
  engName?: string,
  thumb?: any,
  preThumb?: string,
  description?: string,
  state?: string,
  seriesId?: string,
  copyright?: string,
  stories?: string
) => {
  const formData = new FormData();
  formData.set("title", title);
  formData.set("abbreviation", abbreviation);
  formData.set("kana", kana);
  formData.set("engName", engName);
  thumb[0] && formData.set("thumb", thumb[0]);
  formData.set("pre_thumb", preThumb);
  formData.set("description", description);
  formData.set("state", state);
  formData.set("series_id", seriesId);
  formData.set("count_episodes", stories);
  formData.set("copyright", copyright);
  const res = await fetch(`${BACKEND_URL}/admin/anime/update/?id=${animeId}`, {
    method: "PUT",
    mode: "cors",
    credentials: "include",
    body: formData,
  });
  const ret = await res.json();
  return ret;
};

export const AnimeStateDict: { [key: string]: string } = {
  fin: "放送終了",
  pre: "放送前",
  now: "放送中",
  cut: "打ち切り",
};
