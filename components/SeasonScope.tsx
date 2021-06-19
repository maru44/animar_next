import { NextPage } from "next";
import router from "next/router";

interface Props {
  year?: string;
  season?: string;
}

const SeasonScope: NextPage<Props> = (props) => {
  const date = new Date();
  const yearList = [];
  for (let i = date.getFullYear() + 1; 1969 < i; i--) {
    yearList.push(<option value={i}>{i}</option>);
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

  const linkSeason = (e: any) => {
    e.preventDefault();
    router.push(`/anime/s/${e.target.year.value}/${e.target.season.value}`);
  };

  return (
    <div>
      <form onSubmit={linkSeason} className="pt20 flexNormal alCen">
        <select
          name="year"
          className="mla"
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
  );
};

export default SeasonScope;
