import { TWatchCount } from "../types/anime";
import { BACKEND_URL } from "./Config";

export const getWatchCountsList = async (
  animeId: number
): Promise<number[]> => {
  const res = await fetch(`${BACKEND_URL}/watch/?anime=${animeId}`);
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
