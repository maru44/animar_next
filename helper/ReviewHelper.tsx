import { BACKEND_URL } from "./Config";

export const fetchPostReview = async (
  animeId: number,
  content: string,
  star: number
) => {
  const res = await fetch(`${BACKEND_URL}/reviews/post/`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({ AnimeId: animeId, Content: content, Star: star }),
  });
  const ret = await res.json();
  return ret;
};
