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
import router from "next/router";
import { pageBaseProps } from "../../types/page";

type Props = {
  series: TSeries[];
} & pageBaseProps;

const AnimeAdminPost: NextPage<Props> = (props) => {
  const [series, setSeries] = useState(props.series);

  const startAddSeries = async (e: any) => {
    e.preventDefault();
    const res = await fetchInsertSeries(
      e.target.eng_name.value,
      e.target.series_name.value
    );
    if (res.status === 200) {
      const ret = await fetchAllSeries();
      setSeries(ret["data"]);
    }
  };

  const startAddAnime = async (e: any) => {
    e.preventDefault();
    const t = e.target;
    const res = await fetchInsertAnime(
      t.title.value,
      t.abbreviation.value,
      t.kana.value,
      t.eng_name.value,
      t.thumb_url.files,
      t.pre_image.value,
      t.description.value,
      t.state.value,
      t.series.value,
      t.copyright.value,
      t.count_episodes.value
    );
    if (res.status === 200) {
      const ret = await res.json();
      router.push(`/admin/update/${ret["data"]}`);
    }
  };

  return (
    <div>
      <main>
        <div className="content mla mra">
          <AnimePost
            series={series}
            anime={null}
            addSeriesFunc={startAddSeries}
            startFetchFunc={startAddAnime}
          ></AnimePost>
        </div>
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
      series: ret["data"],
      robots: "nofollow noopener noreferrer noindex",
      kind: "admin",
    },
  };
};

export default AnimeAdminPost;
