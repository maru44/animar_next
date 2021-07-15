import { TSeries, TAnimeAdmin } from "../../types/anime";
import React, { useState } from "react";

interface Props {
  series: TSeries[];
  anime: TAnimeAdmin;
  addSeriesFunc: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  startFetchFunc: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const AnimePost: React.FC<Props> = (props) => {
  const [series, setSeries] = useState(props.series);
  const [anime, setAnime] = useState(props.anime);

  return (
    <div>
      <form onSubmit={props.addSeriesFunc}>
        <h3>シリーズ追加</h3>
        <div className="field mt20">
          <input type="text" required name="eng_name" placeholder="eng" />
        </div>
        <div className="field mt20">
          <input type="text" required name="series_name" placeholder="name" />
        </div>
        <div className="field mt20">
          <button type="submit">追加</button>
        </div>
      </form>
      <form className="mt40" onSubmit={props.startFetchFunc}>
        <h3>{anime ? `${anime.title}編集` : "アニメ追加"}</h3>
        <div className="field mt20">
          <input
            type="text"
            name="title"
            defaultValue={anime && anime.title ? anime.title : ""}
            required
            placeholder="*** タイトル"
          />
        </div>
        <div className="field mt20">
          <input
            type="text"
            name="abbreviation"
            placeholder="略称"
            defaultValue={anime && anime.abbreviation ? anime.abbreviation : ""}
          />
        </div>
        <div className="field mt20">
          <input
            type="text"
            name="kana"
            placeholder="カナ"
            defaultValue={anime && anime.kana ? anime.kana : ""}
          />
        </div>
        <div className="filed mt20">
          <input
            type="text"
            name="copyright"
            placeholder="著作権"
            defaultValue={anime && anime.copyright ? anime.copyright : ""}
          />
        </div>
        <div className="field mt20">
          <input
            type="text"
            name="eng_name"
            placeholder="eng"
            defaultValue={anime && anime.eng_name ? anime.eng_name : ""}
          />
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
          <input
            type="text"
            name="pre_image"
            defaultValue={(anime && anime.thumb_url) ?? ""}
          />
        </div>
        <div className="field mt20">
          <textarea
            name="description"
            placeholder="紹介文"
            rows={5}
            defaultValue={anime && anime.description ? anime.description : ""}
          ></textarea>
        </div>
        <div className="field mt20">
          <select
            name="series"
            defaultValue={anime && anime.series_id ? anime.series_id : "0"}
          >
            <option value="0">------------</option>
            {series &&
              series.map((ser: TSeries, index: number) => (
                <option
                  value={ser.id}
                  key={index}
                  // selected={
                  //   anime && anime.SeriesId ? anime.SeriesId === ser.ID : false
                  // }
                >
                  {ser.series_name}
                </option>
              ))}
          </select>
        </div>
        <div className="field mt20">
          <select
            name="state"
            defaultValue={anime && anime.state ? anime.state : "fin"}
          >
            <option value="cut">打ち切り</option>
            <option value="fin">放送終了</option>
            <option value="now">放送中</option>
            <option value="pre">放送前</option>
          </select>
        </div>
        {/* <div className="field mt20">
          <input
            type="text"
            name="season"
            placeholder="season"
            defaultValue={anime && anime.Season ? anime.sea : ""}
          />
        </div> */}
        <div className="field mt20">
          <input
            type="text"
            name="count_episodes"
            defaultValue={
              anime && anime.count_episodes ? anime.count_episodes : ""
            }
            placeholder="story count"
          />
        </div>
        <div className="field mt20">
          <button type="submit">{anime ? "編集" : "アニメ追加"}</button>
        </div>
      </form>
    </div>
  );
};

export default AnimePost;
