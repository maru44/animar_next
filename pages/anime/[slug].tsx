import { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { BACKEND_URL } from "../../helper/Config";
import { TAnime, TReview } from "../../types/anime";

interface Props {
  //reviews: TReview[];
  anime: TAnime;
}

interface Params extends ParsedUrlQuery {
  strId: string;
}

const AnimeDetail: NextPage<Props> = (props) => {};

export const getServersideProps: GetServerSideProps<Props, Params> = async (
  ctx
) => {
  const strId = ctx.params.strId;
  const res = await fetch(`${BACKEND_URL}/anime/?id=${strId}`);
  const ret = await res.json();

  return {
    props: {
      anime: ret,
    },
  };
};

export default AnimeDetail;
