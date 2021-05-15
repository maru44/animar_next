import { TWatchCount } from "../types/anime";
import { BACKEND_URL } from "./Config";

export const getWatchCountsList = async (
  animeId: number,
  url: string = `${BACKEND_URL}/watch/?anime=${animeId}`
): Promise<number[]> => {
  const res = await fetch(url);
  const ret = await res.json();
  const watchCounts: TWatchCount[] = ret["Data"];

  const watchCountsList = [0, 0, 0, 0, 0];

  if (watchCounts) {
    watchCounts.forEach((wc) => {
      watchCountsList[wc.State] = wc.Count;
    });
  }
  return watchCountsList;
};

export const fetchPostWatchStates = async (animeId: number, watch: number) => {
  const res = await fetch(`${BACKEND_URL}/watch/post/`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    body: JSON.stringify({ AnimeId: animeId, Watch: watch }),
  });
  const ret = await res.json();

  const successWatch = ret["Data"];
  return successWatch;
};
