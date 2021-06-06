import { GetServerSideProps, NextPage } from "next";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import {
  fetchAllSeries,
  fetchInsertSeries,
} from "../../../helper/admin/SeriesHelper";
import { fetchUpdateAnime } from "../../../helper/AnimeHelper";
import { BACKEND_URL } from "../../../helper/Config";
import { TAnimeAdmin, TSeries } from "../../../types/anime";
import AnimePost from "../../../components/Admin/AnimePost";
import { ParsedUrlQuery } from "querystring";
import {
  fetchDeleteRelationPlatform,
  fetchInsertRelationPlatform,
  fetchRelationPlatform,
} from "../../../helper/admin/PlatformHelper";
import { TPlatformAdmin, TRelationPlatform } from "../../../types/platform";

interface Props {
  series: TSeries[];
  robots: string;
  anime: TAnimeAdmin;
  kind: string;
  plats: TPlatformAdmin[]; // all plats
}
interface Params extends ParsedUrlQuery {
  id: string;
}

const AnimeAdminUpdate: NextPage<Props> = (props) => {
  const [series, setSeries] = useState(props.series);
  const [anime, setAnime] = useState(props.anime);
  const [allPlats, setAllPlats] = useState(props.plats);
  const [plats, setPlats] = useState<TRelationPlatform[]>(null);

  useEffect(() => {
    (async () => {
      const ret = await fetchRelationPlatform(anime.ID);
      console.log(ret);
      ret["Status"] === 200 && setPlats(ret["Data"]);
    })();
  }, []);

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

  const startAddRelationPlatform = async (e: any) => {
    e.preventDefault();
    const ret = await fetchInsertRelationPlatform(
      anime.ID,
      parseInt(e.target.plat.value),
      e.target.url.value
    );
    console.log(ret);
  };

  const startDelete = async (e: any) => {
    const ret = await fetchDeleteRelationPlatform(
      anime.ID,
      e.target.dataset.pid
    );
    console.log(ret);
  };

  return (
    <div>
      <main>
        <div className="content mla mra">
          <AnimePost
            series={series}
            anime={anime ?? null}
            addSeriesFunc={startAddSeries}
            startFetchFunc={startUpdateAnime}
          ></AnimePost>
          {plats && plats.length > 0 && (
            <div className="mt60">
              {plats.map((p, index) => (
                <div key={index} className="mb15">
                  {allPlats[p.PlatformId - 1].PlatName}{" "}
                  <span
                    className="floatR"
                    data-pid={p.PlatformId}
                    onClick={startDelete}
                  >
                    削除する
                  </span>
                  <br />
                  URL: {p.LinkUrl}
                </div>
              ))}
            </div>
          )}
          <form className="mt40" onSubmit={startAddRelationPlatform}>
            <h3>配信プラットフォーム</h3>
            <div className="field mt20">
              <input type="text" name="url" />
            </div>
            <div className="field mt20">
              <select name="plat">
                {allPlats &&
                  allPlats.map((p, index) => (
                    <option key={index} value={p.ID}>
                      {p.PlatName}
                    </option>
                  ))}
              </select>
            </div>
            <div className="field mt20">
              <button className="" type="submit">
                追加する
              </button>
            </div>
          </form>
        </div>
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

  const platRes = await fetch(`${BACKEND_URL}/admin/platform/`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    body: JSON.stringify({ token: token }),
  });
  const platRet = await platRes.json();

  return {
    props: {
      series: ret["Data"],
      robots: "nofollow noopener noreferrer noindex",
      anime: animeRet["Data"][0],
      kind: "admin",
      plats: platRet["Data"],
    },
  };
};

export default AnimeAdminUpdate;
