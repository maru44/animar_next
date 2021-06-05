import { GetServerSideProps, NextPage } from "next";
import { parseCookies } from "nookies";
import { useState } from "react";
import {
  fetchAllSeries,
  fetchInsertSeries,
} from "../../helper/admin/SeriesHelper";
import { fetchInsertAnime } from "../../helper/AnimeHelper";
import { BACKEND_URL } from "../../helper/Config";
import { TSeries } from "../../types/anime";
import AnimePost from "../../components/Admin/AnimePost";

interface Props {
  series: TSeries[];
  robots: string;
}

const AnimeAdminPost: NextPage<Props> = (props) => {
  const [series, setSeries] = useState(props.series);

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

  const startAddAnime = async (e: any) => {
    e.preventDefault();
    const t = e.target;
    const ret = await fetchInsertAnime(
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
  };

  return (
    <div>
      <main>
        <AnimePost
          series={series}
          anime={null}
          addSeriesFunc={startAddSeries}
          startFetchFunc={startAddAnime}
        ></AnimePost>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const cookies = parseCookies(ctx);
  // const ret = await fetchAllSeries();
  const res = await fetch(`${BACKEND_URL}/series/`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    body: JSON.stringify({ token: cookies["idToken"] }),
  });
  const ret = await res.json();
  return {
    props: {
      series: ret["Data"],
      robots: "nofollow noopener noreferrer noindex",
    },
  };
};

export default AnimeAdminPost;
