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
  console.log(animes);

  return (
    <div>
      <Header></Header>
      <main>
        <div className="mla mra content">
          <div className="animeList">
            {animes &&
              animes.map((anime, index) => (
                <div className="hrefBox oneAnime ovHide mb15" key={index}>
                  <div className="flexNormal">
                    <div className="w20 thumb frame">
                      <img
                        className="w100 contain"
                        src={
                          anime.ThumbUrl
                            ? `${anime.ThumbUrl}`
                            : "https://animar-bucket.s3-ap-northeast-1.amazonaws.com/slum.jpg"
                        }
                      />
                    </div>
                    <div className="flex1">
                      <h2>{anime.Title}</h2>
                    </div>
                  </div>
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
