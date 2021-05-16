import { GetServerSideProps, NextPage } from "next";
import { TAnime } from "../../types/anime";
import { BACKEND_URL } from "../../helper/Config";
import Link from "next/link";
import Header from "../../components/Header";

interface Props {
  animes: TAnime[];
}

const AnimeList: NextPage<Props> = (props) => {
  const animes = props.animes;

  return (
    <div>
      <Header></Header>
      <main>
        <div className="mla mra content">
          <div className="animeList">
            {animes &&
              animes.map((anime, index) => (
                <div className="hrefBox" key={index}>
                  {anime.Title}
                  <Link
                    href="/anime/[slug]"
                    as={`/anime/${anime.Slug}`}
                    passHref
                  >
                    <a className="hrefBoxIn"></a>
                  </Link>
                </div>
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
    },
  };
};

export default AnimeList;
