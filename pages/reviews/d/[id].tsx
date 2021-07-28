import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { BACKEND_URL, DEFAULT_USER_IMAGE } from "../../../helper/Config";
import { TReview } from "../../../types/anime";
import { useRouter } from "next/router";
import { pageBaseProps } from "../../../types/page";
import { useEffect } from "react";
import { createOgp } from "../../../helper/CreateOgp";

interface Params extends ParsedUrlQuery {
  id: string;
}

type Props = {
  review: TReview & { anime_slug: string } & pageBaseProps;
};

const Review: NextPage<Props> = (props) => {
  const review = props.review;
  const router = useRouter();
  useEffect(() => {
    router.push(`/anime/${review.anime_slug}`);
  }, []);

  return (
    <div>
      <main>
        <div className="mla mra content flexCen">
          <h2 className="textCen">Loading...</h2>
        </div>
      </main>
    </div>
  );
};

// export const getStaticPaths: GetStaticPaths = async (ctx) => {
//   const res = await fetch(`${BACKEND_URL}/reviews/`);
//   const ret = await res.json();

//   const paths = ret["data"].map((id: number, i: number) => `/reviews/d/${id}`);
//   return {
//     paths: paths,
//     fallback: "blocking",
//   };
// };

export const getStaticProps: GetStaticProps<Props, Params> = async (ctx) => {
  const id = ctx.params.id;

  const res = await fetch(`${BACKEND_URL}/reviews/?id=${id}`);
  const ret = await res.json();
  const data = ret["data"];

  /*  real image generate  */
  // if (ret["data"]["content"]) {
  //   await createOgp({
  //     id: parseInt(id),
  //     title: data["anime_title"],
  //     rating: data["rating"] ?? null,
  //     content: data["content"],
  //   });
  // }

  return {
    props: {
      review: data,
      ogType: "article",
      ogDescription: `"${data["anime_title"]}"を見た感想` ?? null, //アニメの説明
      ogSeoDescription: `"${data["anime_title"]}"を見た感想` ?? null, // アニメの説明
      // ogImage: `${process.env.NEXT_PUBLIC_FRONT_URL}/ogp/review_${id}.png`,
      ogImage: `${process.env.NEXT_PUBLIC_FRONT_URL}/api/review/${id}`,
      ogImageType: "summary_large_image",
      robots: "nofollow noindex",
    },
    revalidate: 3,
  };
};

export default Review;
