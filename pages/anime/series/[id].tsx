import { GetServerSideProps, NextPage } from "next";
import { pageBaseProps } from "../../../types/page";
import { TAnime } from "../../../types/anime";
import { ParsedUrlQuery } from "querystring";
import { BACKEND_URL } from "../../../helper/Config";
import AnimeElement from "../../../components/AnimeElement";

type Props = {
  animes: TAnime[];
} & pageBaseProps;

interface Params extends ParsedUrlQuery {
  id: string;
}

const AnimeBySeries: NextPage<Props> = (props) => {
  const animes = props.animes;

  return (
    <div>
      <main>
        <div className="mla mra content">
          <h3 className="mt20">
            {animes && animes[0] && animes[0].series_name} - シリーズ
          </h3>
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
  const series = ctx.params.id;
  const res = await fetch(`${BACKEND_URL}/db/anime/?series=${series}`);
  const ret = await res.json();
  const animes = ret["data"];

  return {
    props: {
      animes: animes,
      list: 1,
    },
  };
};

export default AnimeBySeries;
