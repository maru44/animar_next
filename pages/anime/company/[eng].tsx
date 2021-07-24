import { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import AnimeElement from "../../../components/Anime/AnimeElement";
import ComapnyDetail from "../../../components/CompanyDetail";
import { BACKEND_URL } from "../../../helper/Config";
import { TAnime } from "../../../types/anime";
import { TCompany } from "../../../types/company";
import { pageBaseProps } from "../../../types/page";

type Props = {
  animes: TAnime[];
  comp: TCompany;
} & pageBaseProps;

interface Params extends ParsedUrlQuery {
  eng: string;
}

const AnimeByCompany: NextPage<Props> = (props) => {
  const animes = props.animes;

  return (
    <div>
      <main>
        <div className="mla mra content">
          <div className="pt20">
            <ComapnyDetail comp={props.comp}></ComapnyDetail>
          </div>
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
  const company = ctx.params.eng;
  const res = await fetch(`${BACKEND_URL}/db/anime/?company=${company}`);
  const ret = await res.json();
  const animes = ret["data"];
  const comp: TCompany = ret["company"];

  return {
    props: {
      animes: animes,
      list: 1,
      comp: comp,
      title: comp.name,
      ogType: "article",
      // ogDescription: anime.description ?? null,
      // ogSeoDescription: anime.description ?? null,
    },
  };
};

export default AnimeByCompany;
