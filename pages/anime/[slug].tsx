import { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../helper/Config";
import { fetchAnimeReviews } from "../../helper/ReviewHelper";
import { TAnime, TReview } from "../../types/anime";

interface Props {
  //reviews: TReview[];
  anime: TAnime;
}

interface Params extends ParsedUrlQuery {
  slug: string;
}

const AnimeDetail: NextPage<Props> = (props) => {
  const anime = props.anime;
  const [reviews, setReviews] = useState(null);
  useEffect(() => {
    const f = async () => {
      const reviews = await fetchAnimeReviews(anime.ID);
      setReviews(reviews);
    };
    f();
  }, []);

  return (
    <div>
      <div className="">{anime.Title}</div>
      <div className="reviewList">
        {reviews &&
          reviews.map((review: TReview, index: number) => (
            <div key={index}>
              {review.Content} {review.UserId}
            </div>
          ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async (
  ctx
) => {
  const slug = ctx.params.slug;
  const res = await fetch(`${BACKEND_URL}/db/anime/?slug=${slug}`);
  const ret = await res.json();
  const anime = ret["Data"][0];

  return {
    props: {
      anime: anime,
    },
  };
};

export default AnimeDetail;
