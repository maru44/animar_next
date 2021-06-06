import { NextPage } from "next";
import { TSeries, TAnimeAdmin } from "../../types/anime";
import { useState } from "react";

interface Props {
  series: TSeries[];
  anime: TAnimeAdmin;
  addSeriesFunc: any;
  startFetchFunc: any;
}

const AnimePost: NextPage<Props> = (props) => {
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
        <h3>{anime ? `${anime.Title}編集` : "アニメ追加"}</h3>
        <div className="field mt20">
          <input
            type="text"
            name="title"
            defaultValue={anime && anime.Title ? anime.Title : ""}
            required
            placeholder="*** タイトル"
          />
        </div>
        <div className="field mt20">
          <input
            type="text"
            name="abbreviation"
            placeholder="略称"
            defaultValue={anime && anime.Abbreviation ? anime.Abbreviation : ""}
          />
        </div>
        <div className="field mt20">
          <input
            type="text"
            name="kana"
            placeholder="カナ"
            defaultValue={anime && anime.Kana ? anime.Kana : ""}
          />
        </div>
        <div className="field mt20">
          <input
            type="text"
            name="eng_name"
            placeholder="eng"
            defaultValue={anime && anime.EngName ? anime.EngName : ""}
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
          <textarea
            name="content"
            placeholder="紹介文"
            rows={5}
            defaultValue={anime && anime.Content ? anime.Content : ""}
          ></textarea>
        </div>
        <div className="field mt20">
          <select
            name="series"
            defaultValue={anime && anime.SeriesId ? anime.SeriesId : "0"}
          >
            <option value="0">------------</option>
            {series &&
              series.map((ser: TSeries, index: number) => (
                <option
                  value={ser.ID}
                  key={index}
                  // selected={
                  //   anime && anime.SeriesId ? anime.SeriesId === ser.ID : false
                  // }
                >
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
            defaultValue={anime && anime.OnAirState ? anime.OnAirState : ""}
          />
        </div>
        <div className="field mt20">
          <input
            type="text"
            name="season"
            placeholder="season"
            defaultValue={anime && anime.Season ? anime.Season : ""}
          />
        </div>
        <div className="field mt20">
          <input
            type="text"
            name="stories"
            defaultValue={anime && anime.Stories ? anime.Stories : ""}
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
