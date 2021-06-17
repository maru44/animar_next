import { GetServerSideProps, NextPage } from "next";
import { TAnime } from "../../../../types/anime";
import { BACKEND_URL } from "../../../../helper/Config";
import AnimeElement from "../../../../components/AnimeElement";
import { ParsedUrlQuery } from "querystring";

interface Props {
  animes: TAnime[];
  list: 1;
}

interface Params extends ParsedUrlQuery {
  year: string;
  season: string;
}

const AnimeList: NextPage<Props> = (props) => {
  const animes = props.animes;

  return (
    <div>
      <main>
        <div className="mla mra content">
          <div className="animeList">
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
  const year = ctx.params.year;
  const season = ctx.params.season;
  const res = await fetch(
    `${BACKEND_URL}/db/anime/?year=${year}&season=${season}`
  );
  const ret = await res.json();
  const animes = ret["data"];

  return {
    props: {
      animes: animes,
      list: 1,
    },
  };
};

export default AnimeList;
