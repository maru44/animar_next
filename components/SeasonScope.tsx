import router from "next/router";
import React from "react";

interface Props {
  year?: string;
  season?: string;
}

const SeasonScope: React.FC<Props> = (props) => {
  const date = new Date();
  const yearList = [];
  for (let i = date.getFullYear() + 1; 1969 < i; i--) {
    yearList.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }
  const month = date.getMonth();
  const seasonList = [
    "winter",
    "winter",
    "winter",
    "spring",
    "spring",
    "spring",
    "summer",
    "summer",
    "summer",
    "fall",
    "fall",
    "fall",
  ];

  const linkSeason = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(
      `/anime/s/${e.currentTarget.year.value}/${e.currentTarget.season.value}`
    );
  };

  const linkSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/anime/search/${encodeURI(e.currentTarget.keyword.value)}`);
  };

  return (
    <div>
      <div className="flexNormal alCen flexWrap">
        <form onSubmit={linkSearch} className="flexNormal alCen pt20 mra">
          <input
            type="text"
            name="keyword"
            required
            placeholder="タイトル検索"
          />
          <button
            type="submit"
            className="ml20"
            style={{ whiteSpace: "nowrap" }}
          >
            検索
          </button>
        </form>
        <form onSubmit={linkSeason} className="flexNormal alCen pt20">
          <select
            name="year"
            defaultValue={props.year ?? date.getFullYear().toString()}
          >
            {yearList && yearList}
          </select>
          <select
            className="ml20"
            name="season"
            defaultValue={props.season ?? seasonList[month]}
          >
            <option value="winter">冬</option>
            <option value="spring">春</option>
            <option value="summer">夏</option>
            <option value="fall">秋</option>
          </select>
          <button type="submit" className="ml20">
            変更
          </button>
        </form>
      </div>
    </div>
  );
};

export default SeasonScope;
