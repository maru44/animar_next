import { GetServerSideProps, NextPage } from "next";
import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
import {
  fetchAllSeries,
  fetchInsertSeries,
} from "../../../helper/admin/SeriesHelper";
import {
  fetchDeleteAnime,
  fetchUpdateAnime,
} from "../../../helper/AnimeHelper";
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
import router from "next/router";
import { pageBaseProps } from "../../../types/page";
import { TCompany } from "../../../types/company";
import { fetchCompanies } from "../../../helper/admin/CompanyHelper";
import StaffRoleInput from "../../../components/Admin/StaffRoleInput";

type Props = {
  series: TSeries[];
  anime: TAnimeAdmin;
  companies: TCompany[];
  plats: TPlatformAdmin[]; // all plats
  seasons: TSeason[]; // all season
} & pageBaseProps;

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
      const res = await fetchRelationPlatform(anime.id);
      const seasonRes = await fetchRelationSeason(anime.id);
      if (res.status === 200) {
        const ret = await res.json();
        setPlats(ret["data"]);
      }
      if (seasonRes.status === 200) {
        const ret = await seasonRes.json();
        setSeasons(ret["data"]);
      }
    })();
  }, []);

  const startAddSeries = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetchInsertSeries(
      e.currentTarget.eng_name.value,
      e.currentTarget.series_name.value
    );
    if (res.status === 200) {
      const res = await fetchAllSeries();
      const series = await res["data"];
      setSeries(series);
    }
  };

  const startUpdateAnime = async (e: any) => {
    e.preventDefault();
    const t = e.target;
    const res = await fetchUpdateAnime(
      anime.id,
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
      t.count_episodes.value,
      t.hash_tag.value,
      t.twitter_url.value,
      t.official_url.value,
      t.company.value
    );
    if (res.status === 200) {
      const res = await fetch(
        `${BACKEND_URL}/admin/anime/detail/?id=${anime.id}`,
        {
          mode: "cors",
          credentials: "include",
        }
      );
      const ret = await res.json();
      setAnime(ret["data"]);
    }
  };

  const startAddRelationPlatform = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const ret = await fetchInsertRelationPlatform(
      anime.id,
      parseInt(e.currentTarget.plat.value),
      e.currentTarget.url.value
    );
  };

  const startDelete = async (e: React.MouseEvent<HTMLSpanElement>) => {
    const ret = await fetchDeleteRelationPlatform(
      anime.id,
      e.currentTarget.dataset.pid
    );
  };

  const startAddSeason = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ret = await fetchInsertRelationSeason(
      parseInt(e.currentTarget.season.value),
      anime.id
    );
  };

  const startDeleteAnime = async () => {
    const ret = await fetchDeleteAnime(anime.id);
    router.back();
  };

  return (
    <div>
      <main>
        <div className="content mla mra">
          <AnimePost
            series={series}
            anime={anime ?? null}
            companies={props.companies}
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
          <div className="mt40">
            <StaffRoleInput animeId={anime.id}></StaffRoleInput>
          </div>
          <div className="field mt100">
            <button className="" type="button" onClick={startDeleteAnime}>
              削除する
            </button>
          </div>
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

  const comRes = await fetch(`${BACKEND_URL}/admin/company/`, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({ token: token }),
  });
  const comRet = await comRes.json();

  return {
    props: {
      series: ret["data"],
      robots: "nofollow noopener noreferrer noindex",
      anime: animeRet["data"],
      companies: comRet["data"],
      kind: "admin",
      plats: platRet["data"],
      seasons: seasonRet["data"],
    },
  };
};

export default AnimeAdminUpdate;
