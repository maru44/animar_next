import { GetServerSideProps, NextPage } from "next";
import { TAnime } from "../../types/anime";
import { BACKEND_URL } from "../../helper/Config";
import AnimeElement from "../../components/Anime/AnimeElement";
import SeasonScope from "../../components/SeasonScope";
import { pageBaseProps } from "../../types/page";

type Props = {
  animes: TAnime[];
} & pageBaseProps;

const AnimeList: NextPage<Props> = (props) => {
  const animes = props.animes;

  return (
    <div>
      <main>
        <div className="mla mra content">
          <SeasonScope></SeasonScope>
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

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const res = await fetch(`${BACKEND_URL}/db/anime/`);
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
