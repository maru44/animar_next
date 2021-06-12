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
import {
  fetchInsertRelationSeason,
  fetchRelationSeason,
} from "../../../helper/admin/SeasonHelper";
import { TPlatformAdmin, TRelationPlatform } from "../../../types/platform";
import { TSeason } from "../../../types/season";

interface Props {
  series: TSeries[];
  robots: string;
  anime: TAnimeAdmin;
  kind: string;
  plats: TPlatformAdmin[]; // all plats
  seasons: TSeason[]; // all season
}
interface Params extends ParsedUrlQuery {
  id: string;
}

const AnimeAdminUpdate: NextPage<Props> = (props) => {
  const [series, setSeries] = useState(props.series);
  const [anime, setAnime] = useState(props.anime);
  const [allPlats, setAllPlats] = useState(props.plats);
  const [plats, setPlats] = useState<TRelationPlatform[]>(null);
  const [allSeasons, setAllSeasons] = useState<TSeason[]>(props.seasons);
  const [seasons, setSeasons] = useState<TSeason[]>(null);

  useEffect(() => {
    (async () => {
      const ret = await fetchRelationPlatform(anime.id);
      const seasonRet = await fetchRelationSeason(anime.id);
      ret["status"] === 200 && setPlats(ret["data"]);
      seasonRet["status"] === 200 && setSeasons(seasonRet["data"]);
    })();
  }, []);

  const startAddSeries = async (e: any) => {
    e.preventDefault();
    const ret = await fetchInsertSeries(
      e.target.eng_name.value,
      e.target.series_name.value
    );
    if (ret["status"] === 200) {
      const res = await fetchAllSeries();
      const series = await res["data"];
      setSeries(series);
    }
  };

  const startUpdateAnime = async (e: any) => {
    e.preventDefault();
    const t = e.target;
    const ret = await fetchUpdateAnime(
      anime.id,
      t.title.value,
      t.abbreviation.value,
      t.kana.value,
      t.eng_name.value,
      t.thumb_url.files,
      t.description.value,
      t.state.value,
      t.series.value,
      t.copyright.value,
      t.count_episodes.value
    );
    if (ret["Status"] === 200) {
      const res = await fetch(
        `${BACKEND_URL}/admin/anime/detail/?id=${anime.id}`,
        {
          mode: "cors",
          credentials: "include",
        }
      );
      const ret = await res.json();
      setAnime(ret["data"][0]);
    }
  };

  const startAddRelationPlatform = async (e: any) => {
    e.preventDefault();
    const ret = await fetchInsertRelationPlatform(
      anime.id,
      parseInt(e.target.plat.value),
      e.target.url.value
    );
  };

  const startDelete = async (e: any) => {
    const ret = await fetchDeleteRelationPlatform(
      anime.id,
      e.target.dataset.pid
    );
  };

  const startAddSeason = async (e: any) => {
    e.preventDefault();
    const ret = await fetchInsertRelationSeason(
      parseInt(e.target.season.value),
      anime.id
    );
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
                  {allPlats[p.platform_id - 1].plat_name}{" "}
                  <span
                    className="floatR"
                    data-pid={p.platform_id}
                    onClick={startDelete}
                  >
                    削除する
                  </span>
                  <br />
                  URL: {p.link_url}
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
                    <option key={index} value={p.id}>
                      {p.plat_name}
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
          <form className="mt40" onSubmit={startAddSeason}>
            <h3>シーズン</h3>
            <div className="mt20">
              {seasons &&
                seasons.map((s, index) => (
                  <div key={index}>
                    {s.year}
                    {s.season}
                  </div>
                ))}
            </div>
            <div className="field mt20">
              <select defaultValue={0} name="season">
                <option value={0}>------</option>
                {allSeasons &&
                  allSeasons.map((s, index) => (
                    <option key={index} value={s.id}>
                      {s.year}
                      {s.season}
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
    body: JSON.stringify({ token: token }),
  });
  const ret = await res.json();

  const id = ctx.params.id;
  const animeRes = await fetch(`${BACKEND_URL}/admin/anime/detail/?id=${id}`, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({ token: token }),
  });
  const animeRet = await animeRes.json();

  const platRes = await fetch(`${BACKEND_URL}/admin/platform/`, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({ token: token }),
  });
  const platRet = await platRes.json();

  const seasonRes = await fetch(`${BACKEND_URL}/season/`, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({ token: token }),
  });
  const seasonRet = await seasonRes.json();

  return {
    props: {
      series: ret["data"],
      robots: "nofollow noopener noreferrer noindex",
      anime: animeRet["data"][0],
      kind: "admin",
      plats: platRet["data"],
      seasons: seasonRet["data"],
    },
  };
};

export default AnimeAdminUpdate;
