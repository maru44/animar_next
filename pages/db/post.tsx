import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import {
  fetchAllSeries,
  fetchInsertSeries,
} from "../../helper/admin/SeriesHelper";
import { BACKEND_URL } from "../../helper/Config";
import { TSeries } from "../../types/anime";

interface Props {
  series: TSeries[];
  robots: string;
}

const AnimeAdminPost: NextPage<Props> = (props) => {
  const [series, setSeries] = useState(props.series);
  console.log(series);

  const startAddSeries = async (e: any) => {
    e.preventDefault();
    console.log(e);
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
          <form className="mt40">
            <h3>アニメ追加</h3>
            <div className="field">
              <input type="text" name="title" required placeholder="タイトル" />
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
                <option value="">------------</option>
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
  const ret = await fetchAllSeries();
  return {
    props: {
      series: ret["Data"],
      robots: "nofollow noopener noreferrer noindex",
    },
  };
};

export default AnimeAdminPost;
