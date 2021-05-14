import { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { BACKEND_URL, baseFetcher } from "../../helper/Config";
import { fetchAnimeReviews, fetchPostReview } from "../../helper/ReviewHelper";
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
  console.log(anime);

  const { data, error } = useSWR(
    `${BACKEND_URL}/reviews/anime/?anime=${anime.ID}`,
    baseFetcher
  );

  const startPost = async (e: any) => {
    e.preventDefault();
    const content = e.target.content.value;
    const star = e.target.star.value;
    const ret = await fetchPostReview(anime.ID, content, star);
    console.log(ret);
  };

  return (
    <div>
      <div className="">
        {anime.ID} {anime.Title}
      </div>
      <div className="reviewList">
        {data &&
          data.map((review: TReview, index: number) => (
            <div key={index}>
              {review.Content} {review.UserId}
            </div>
          ))}
      </div>
      <form onSubmit={startPost}>
        <div className="">
          <label>content</label>
          <textarea name="content" rows={5} />
        </div>
        <div className="">
          <label>star</label>
          <input type="number" name="star" />
        </div>
        <div className="">
          <button type="submit">post</button>
        </div>
      </form>
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
