import { BACKEND_URL } from "../Config";

export const fetchInsertRelationSeason = async (
  seasonId: number,
  animeId: number
) => {
  const res = await fetch(`${BACKEND_URL}/admin/season/anime/post/`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    body: JSON.stringify({ season_id: seasonId, anime_id: animeId }),
  });
  const ret = await res.json();
  return ret;
};

export const fetchRelationSeason = async (animeId: number) => {
  const res = await fetch(`${BACKEND_URL}/season/anime/?id=${animeId}`, {
    method: "GET",
    mode: "cors",
    credentials: "include",
  });
  const ret = await res.json();
  return ret;
};
