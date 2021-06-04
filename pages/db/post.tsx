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
    console.log(ret);
  };

  return (
    <div>
      <main>
        <div className="content mla mra">
          <form onSubmit={startAddSeries}>
            <h3>シリーズ追加</h3>
            <div className="field">
              <input type="text" required name="eng_name" placeholder="eng" />
            </div>
            <div className="field mt20">
              <input
                type="text"
                required
                name="series_name"
                placeholder="name"
              />
            </div>
            <div className="field mt20">
              <button type="submit">追加</button>
            </div>
          </form>
          <form className="mt40" onSubmit={startAddAnime}>
            <h3>アニメ追加</h3>
            <div className="field">
              <input
                type="text"
                name="title"
                required
                placeholder="*** タイトル"
              />
            </div>
            <div className="field mt20">
              <input type="text" name="abbreviation" placeholder="略称" />
            </div>
            <div className="field mt20">
              <input type="text" name="kana" placeholder="カナ" />
            </div>
            <div className="field mt20">
              <input type="text" name="eng_name" placeholder="eng" />
            </div>
            <div className="field mt20">
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                id="image"
                name="thumb_url"
              />
            </div>
            <div className="field mt20">
              <textarea name="content" placeholder="紹介文" rows={5}></textarea>
            </div>
            <div className="field mt20">
              <select name="series">
                <option value="0">------------</option>
                {series &&
                  series.map((ser: TSeries, index: number) => (
                    <option value={ser.ID} key={index}>
                      {ser.SeriesName}
                    </option>
                  ))}
              </select>
            </div>
            <div className="field mt20">
              <input
                type="text"
                name="on_air_state"
                placeholder="onair (int)"
              />
            </div>
            <div className="field mt20">
              <input type="text" name="season" placeholder="season" />
            </div>
            <div className="field mt20">
              <input type="text" name="stories" placeholder="story count" />
            </div>
            <div className="field mt20">
              <button type="submit">アニメ追加</button>
            </div>
          </form>
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
    body: JSON.stringify({ user_id: cookies["idToken"] }),
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
