import { GetServerSideProps, NextPage } from "next";
import { parseCookies } from "nookies";
import { useState } from "react";
import {
  fetchAllSeries,
  fetchInsertSeries,
} from "../../../helper/admin/SeriesHelper";
import { fetchUpdateAnime } from "../../../helper/AnimeHelper";
import { BACKEND_URL } from "../../../helper/Config";
import { TAnimeAdmin, TSeries } from "../../../types/anime";
import AnimePost from "../../../components/Admin/AnimePost";
import { ParsedUrlQuery } from "querystring";

interface Props {
  series: TSeries[];
  robots: string;
  anime: TAnimeAdmin;
  kind: string;
}
interface Params extends ParsedUrlQuery {
  id: string;
}

const AnimeAdminUpdate: NextPage<Props> = (props) => {
  const [series, setSeries] = useState(props.series);
  const [anime, setAnime] = useState(props.anime);

  const startAddSeries = async (e: any) => {
    e.preventDefault();
    const ret = await fetchInsertSeries(
      e.target.eng_name.value,
      e.target.series_name.value
    );
    if (ret["Status"] === 200) {
      const res = await fetchAllSeries();
      const series = await res["Data"];
      setSeries(series);
    }
  };

  const startUpdateAnime = async (e: any) => {
    e.preventDefault();
    const t = e.target;
    const ret = await fetchUpdateAnime(
      anime.ID,
      t.title.value,
      t.abbreviation.value,
      t.kana.value,
      t.eng_name.value,
      t.thumb_url.files,
      t.content.value,
      t.on_air_state.value,
      t.series.value,
      t.season.value,
      t.stories.value
    );
    if (ret["Status"] === 200) {
      const res = await fetch(
        `${BACKEND_URL}/admin/anime/detail/?id=${anime.ID}`,
        {
          mode: "cors",
          credentials: "include",
        }
      );
      const ret = await res.json();
      setAnime(ret["Data"][0]);
    }
  };

  return (
    <div>
      <main>
        <AnimePost
          series={series}
          anime={anime ?? null}
          addSeriesFunc={startAddSeries}
          startFetchFunc={startUpdateAnime}
        ></AnimePost>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async (
  ctx
) => {
  const cookies = parseCookies(ctx);
  const token = cookies["idToken"];
  const res = await fetch(`${BACKEND_URL}/series/`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    body: JSON.stringify({ token: token }),
  });
  const ret = await res.json();

  const id = ctx.params.id;
  const animeRes = await fetch(`${BACKEND_URL}/admin/anime/detail/?id=${id}`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    body: JSON.stringify({ token: token }),
  });
  const animeRet = await animeRes.json();

  return {
    props: {
      series: ret["Data"],
      robots: "nofollow noopener noreferrer noindex",
      anime: animeRet["Data"][0],
      kind: "admin",
    },
  };
};

export default AnimeAdminUpdate;
