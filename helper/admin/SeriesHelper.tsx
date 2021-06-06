import { BACKEND_URL } from "../../helper/Config";

export const fetchInsertSeries = async (
  engName: string,
  seriesName: string
) => {
  const res = await fetch(`${BACKEND_URL}/series/post/`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    body: JSON.stringify({ eng_name: engName, series_name: seriesName }),
  });
  const ret = await res.json();
  return ret;
};

export const fetchAllSeries = async () => {
  const res = await fetch(`${BACKEND_URL}/series/`, {
    method: "GET",
    mode: "cors",
    credentials: "include",
  });
  const ret = await res.json();
  return ret;
};
