import { GetServerSideProps, NextPage } from "next";
import { TAnime } from "../../../types/anime";
import { BACKEND_URL } from "../../../helper/Config";
import AnimeElement from "../../../components/Anime/AnimeElement";
import SeasonScope from "../../../components/SeasonScope";
import { ParsedUrlQuery } from "querystring";
import { pageBaseProps } from "../../../types/page";
import { SeasonJapanese } from "../../../helper/admin/SeasonHelper";

type Props = {
  animes: TAnime[];
  keyword: string;
} & pageBaseProps;

interface Params extends ParsedUrlQuery {
  keyword: string;
}

const AnimeList: NextPage<Props> = (props) => {
  const animes = props.animes;

  return (
    <div>
      <main>
        <div className="mla mra content">
          <SeasonScope></SeasonScope>
          <h2 className="brAll mt30">"{props.keyword}" の検索結果</h2>
          <div className="animeList mt30">
            {animes &&
              animes.map((anime, index) => (
                <AnimeElement index={index} anime={anime}></AnimeElement>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async (
  ctx
) => {
  const keyword = ctx.params.keyword;

  const res = await fetch(
    `${BACKEND_URL}/db/anime/?keyword=${encodeURI(keyword)}`
  );
  const ret = await res.json();
  const animes = ret["data"];

  return {
    props: {
      animes: animes,
      list: 1,
      keyword: keyword,
    },
  };
};

export default AnimeList;
