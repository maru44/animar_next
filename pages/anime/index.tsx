import { GetServerSideProps, NextPage } from "next";
import { TAnime } from "../../types/anime";
import { BACKEND_URL } from "../../helper/Config";
import Link from "next/link";
import AnimeElement from "../../components/AnimeElement";

interface Props {
  animes: TAnime[];
  list: 1;
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

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const res = await fetch(`${BACKEND_URL}/db/anime/`);
  const ret = await res.json();
  const animes = ret["Data"];

  return {
    props: {
      animes: animes,
      list: 1,
    },
  };
};

export default AnimeList;
