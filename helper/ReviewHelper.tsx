import { BACKEND_URL } from "./Config";

export const fetchAnimeReviews = async (animeId: number) => {
  const res = await fetch(`${BACKEND_URL}/reviews/anime/?anime=${animeId}`, {
    method: "GET",
    mode: "cors",
    credentials: "include",
  });
  const ret = await res.json();
  console.log(ret);
  return ret["data"];
};

export const fetchUpsertReviewContent = async (
  animeId: number,
  content: string
) => {
  const res = await fetch(`${BACKEND_URL}/reviews/post/content/`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    body: JSON.stringify({ anime_id: animeId, content: content }),
  });
  const ret = await res.json();
  return ret;
};

export const fetchUpsertReviewStar = async (animeId: number, star: number) => {
  const res = await fetch(`${BACKEND_URL}/reviews/post/star/`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    body: JSON.stringify({ anime_id: animeId, rating: star }),
  });
  const ret = await res.json();
  return ret;
};

export const fetchUserAnimeReview = async (animeId: number) => {
  const res = await fetch(`${BACKEND_URL}/reviews/ua/?anime=${animeId}`, {
    method: "GET",
    mode: "cors",
    credentials: "include",
  });
  const ret = await res.json();
  if (ret["data"]) {
    return ret["data"][0];
  } else {
    return null;
  }
};

export const reviewStarList = [
  "憤り",
  "大不満",
  "不満",
  "不満",
  "普通",
  "少満足",
  "満足",
  "大満足",
  "大大満足",
  "神",
];

export const fetchAnimeStars = async (animeId: number) => {
  const res = await fetch(`${BACKEND_URL}/reviews/star/?anime=${animeId}`, {
    mode: "cors",
    credentials: "include",
  });
  const ret = await res.json();
  return ret["data"];
};
