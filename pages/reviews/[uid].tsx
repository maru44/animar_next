import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import AuthorZone from "../../components/AuthorZone";
import { BACKEND_URL, DEFAULT_USER_IMAGE } from "../../helper/Config";
import { reviewStarList } from "../../helper/ReviewHelper";
import { fetchUserModel } from "../../helper/UserHelper";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { TReviewJoinAnime } from "../../types/anime";
import { TUser } from "../../types/auth";
import { pageBaseProps } from "../../types/page";

type Props = {
  reviews: TReviewJoinAnime[];
} & pageBaseProps;

interface Params extends ParsedUrlQuery {
  uid: string;
}

const UserReviews: NextPage<Props> = (props) => {
  const reviews = props.reviews;
  const { isAuthChecking, CurrentUser } = useCurrentUser();

  const [author, setAuthor] = useState<TUser>(undefined);
  useEffect(() => {
    (async () => {
      const uid = props.uid;
      if (uid) {
        const author = await fetchUserModel(uid);
        setAuthor(author);
      }
    })();
  }, []);

  return (
    <div>
      <main>
        <div className="content mla mra">
          <div className="authorZone">
            <AuthorZone author={author} currentUser={CurrentUser}></AuthorZone>
          </div>
          <div className="mt40">
            {reviews &&
              reviews.map(
                (review, index) =>
                  (!review.rating && !review.content) || (
                    <article className="usersReview mb20 hrefBox" key={index}>
                      <h3 className="flexNormal alCen">{review.title}</h3>
                      <div className="mt10 reviewStars">
                        {review.rating &&
                          reviewStarList &&
                          reviewStarList.map((star, index) => (
                            <span
                              className={
                                review.rating && review.rating - 1 >= index
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
                      {review.content && (
                        <p className="brAll mt10">{review.content}</p>
                      )}
                      <Link
                        href="/anime/[slug]"
                        as={`/anime/${review.slug}`}
                        passHref
                      >
                        <a className="hrefBoxIn"></a>
                      </Link>
                    </article>
                  )
              )}
          </div>
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

  const reviews = ret["data"];
  return {
    props: {
      reviews: reviews,
      kind: "user",
      list: 2,
      uid: uid,
      title: "レビュー一覧",
    },
  };
};

export default UserReviews;
