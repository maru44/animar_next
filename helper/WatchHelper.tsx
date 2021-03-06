import { TWatchCount } from "../types/anime";
import { BACKEND_URL } from "./Config";

export const getWatchCountsList = async (
  animeId: number,
  url: string = `${BACKEND_URL}/watch/?anime=${animeId}`
): Promise<number[]> => {
  const res = await fetch(url);
  const ret = await res.json();
  const watchCounts: TWatchCount[] = ret["data"];

  const watchCountsList = [0, 0, 0, 0, 0];

  if (watchCounts) {
    watchCounts.forEach((wc) => {
      watchCountsList[wc.state] = wc.count;
    });
  }
  return watchCountsList;
};

export const fetchPostWatchStates = async (animeId: number, watch: number) => {
  const res = await fetch(`${BACKEND_URL}/watch/post/`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    body: JSON.stringify({ anime_id: animeId, state: watch }),
  });
  const ret = await res.json();

  const successWatch = ret["data"];
  return successWatch;
};

export const fetchDeleteWatchStates = async (animeId: number) => {
  const res = await fetch(`${BACKEND_URL}/watch/delete/?anime=${animeId}`, {
    method: "DELETE",
    mode: "cors",
    credentials: "include",
  });
  return res.status;
};

export const fetchWatchStateDetail = async (animeId: number) => {
  const res = await fetch(`${BACKEND_URL}/watch/ua/?anime=${animeId}`, {
    method: "GET",
    mode: "cors",
    credentials: "include",
  });

  if (res.status === 401) {
    return null;
  } else {
    const ret = await res.json();
    if (ret["data"]["id"] === 0) {
      return null;
    }
    return ret["data"];
  }
};

export const watchStateList = ["脱落", "興味", "視聴中", "視聴済", "周回済"];
