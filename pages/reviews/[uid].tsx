import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import Header from "../../components/Header";
import { BACKEND_URL } from "../../helper/Config";
import { reviewStarList } from "../../helper/ReviewHelper";
import { TReviewJoinAnime } from "../../types/anime";

interface Props {
  reviews: TReviewJoinAnime[];
  kind: string;
  list: number;
  uid: string;
}

interface Params extends ParsedUrlQuery {
  uid: string;
}

const UserReviews: NextPage<Props> = (props) => {
  const reviews = props.reviews;

  return (
    <div>
      <main>
        <div className="content mla mra">
          {reviews &&
            reviews.map((review, index) => (
              <article className="usersReview mb20 hrefBox" key={index}>
                <h3 className="flexNormal alCen">{review.Title}</h3>
                <div className="mt10 reviewStars">
                  {review.Star &&
                    reviewStarList &&
                    reviewStarList.map((star, index) => (
                      <span
                        className={
                          review.Star && review.Star - 1 >= index
                            ? "mr5 star active"
                            : "mr5 star"
                        }
                        key={index}
                        data-id={index + 1}
                      >
                        &#9733;
                      </span>
                    ))}
                </div>
                {review.Content && (
                  <p className="brAll mt10">{review.Content}</p>
                )}
                <Link
                  href="/anime/[slug]"
                  as={`/anime/${review.Slug}`}
                  passHref
                >
                  <a className="hrefBoxIn"></a>
                </Link>
              </article>
            ))}
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async (
  ctx
) => {
  const uid = ctx.params.uid;
  const res = await fetch(`${BACKEND_URL}/reviews/user/?user=${uid}`);
  const ret = await res.json();

  const reviews = ret["Data"];
  return {
    props: {
      reviews: reviews,
      kind: "user",
      list: 2,
      uid: uid,
    },
  };
};

export default UserReviews;
