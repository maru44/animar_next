import { BACKEND_URL } from "./Config";

export const fetchPostReview = async (
  animeId: number,
  content: string,
  star: number
) => {
  const res = await fetch(`${BACKEND_URL}/reviews/post/`, {
    mode: "cors",
    body: JSON.stringify({ AnimeId: animeId, Content: content, Star: star }),
    credentials: "include",
    method: "POST",
  });
  const ret = await res.json();
  return ret;
};

export const fetchAnimeReviews = async (animeId: number) => {
  const res = await fetch(`${BACKEND_URL}/reviews/anime/?anime=${animeId}`, {
    method: "GET",
    mode: "cors",
    credentials: "include",
  });
  const ret = await res.json();
  return ret["Data"];
};
