import { BACKEND_URL } from "./Config";

export const fetchSearchAnime = async (title: string) => {
  const res = await fetch(`${BACKEND_URL}/db/anime/search/?t=${title}`, {
    method: "GET",
    mode: "cors",
    credentials: "include",
  });
  return res;
};

export const fetchInsertAnime = async (
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
  stories?: string,
  hashTag?: string,
  twitterUrl?: string,
  officialUrl?: string,
  companyId?: string
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
  formData.set("hash_tag", hashTag);
  formData.set("twitter_url", twitterUrl);
  formData.set("official_url", officialUrl);
  formData.set("company_id", companyId);
  const res = await fetch(`${BACKEND_URL}/admin/anime/post/`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    // headers: {
    //   "Content-Type": "multipart/form-data;",
    // },
    body: formData,
  });
  return res;
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
  stories?: string,
  hashTag?: string,
  twitterUrl?: string,
  officialUrl?: string,
  companyId?: string
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
  formData.set("hash_tag", hashTag);
  formData.set("twitter_url", twitterUrl);
  formData.set("official_url", officialUrl);
  formData.set("company_id", companyId);
  const res = await fetch(`${BACKEND_URL}/admin/anime/update/?id=${animeId}`, {
    method: "PUT",
    mode: "cors",
    credentials: "include",
    // headers: {
    //   "Content-Type": "multipart/form-data;",
    // },
    body: formData,
  });
  return res;
};

export const AnimeStateDict: { [key: string]: string } = {
  fin: "????????????",
  pre: "?????????",
  now: "?????????",
  cut: "????????????",
};

export const fetchDeleteAnime = async (animeId: number) => {
  const res = await fetch(`${BACKEND_URL}/admin/anime/delete/?id=${animeId}`, {
    method: "DELETE",
    mode: "cors",
    credentials: "include",
  });
  const ret = await res.json();
  return ret;
};
