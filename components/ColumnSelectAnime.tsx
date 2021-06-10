import { NextPage } from "next";
import { TAnimeMinimum } from "../types/anime";

interface Props {
  searchedAnime: TAnimeMinimum[];
  relAnimeTitles: string[];
  changed: number;
  addSelected: any;
  deleteSelected: any;
}

const ColumnSelectAnime: NextPage<Props> = ({
  searchedAnime,
  relAnimeTitles,
  changed,
  addSelected,
  deleteSelected,
}) => {
  return (
    <div className="mt20">
      <ul className="selectRelAnime">
        {searchedAnime &&
          searchedAnime.map((ani, index) => (
            <li key={index}>
              {ani.title}
              <span
                className="addButton"
                data-id={ani.id}
                data-title={ani.title}
                onClick={addSelected}
              >
                +
              </span>
            </li>
          ))}
        {searchedAnime === undefined && <p>該当するアニメが存在しません</p>}
      </ul>
      <ul className="mt20 field selectedRelAnime">
        {changed != 0 &&
          relAnimeTitles.length !== 0 &&
          relAnimeTitles.map((title, index) => (
            <li key={index}>
              {title}
              <span
                className="circleButton"
                data-idx={index}
                onClick={deleteSelected}
              >
                -
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ColumnSelectAnime;
