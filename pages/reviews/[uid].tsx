import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import { BACKEND_URL, DEFAULT_USER_IMAGE } from "../../helper/Config";
import { reviewStarList } from "../../helper/ReviewHelper";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { TReviewJoinAnime } from "../../types/anime";
import { TUser } from "../../types/auth";

interface Props {
  reviews: TReviewJoinAnime[];
  user: TUser;
  kind: string;
  list: number;
  uid: string;
}

interface Params extends ParsedUrlQuery {
  uid: string;
}

const UserReviews: NextPage<Props> = (props) => {
  const reviews = props.reviews;
  const user = props.user;
  const { isAuthChecking, CurrentUser } = useCurrentUser();

  return (
    <div>
      <main>
        <div className="content mla mra">
          <div className="authorZone">
            {user && user.displayName && (
              <div className="mt10 flexNormal alCen">
                <div
                  className="imgCircle"
                  style={
                    user.photoUrl
                      ? { backgroundImage: `url(${user.photoUrl})` }
                      : { backgroundImage: `url(${DEFAULT_USER_IMAGE})` }
                  }
                ></div>
                <p>{user.displayName}</p>
                {CurrentUser && CurrentUser.rawId === user.rawId && (
                  <h4 className="hrefBox mla">
                    Edit
                    <Link href="/auth/profile" passHref>
                      <a className="hrefBoxIn"></a>
                    </Link>
                  </h4>
                )}
              </div>
            )}
          </div>
          <div className="mt40">
            {reviews &&
              reviews.map((review, index) => (
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
  const uid = ctx.params.uid;
  const res = await fetch(`${BACKEND_URL}/reviews/user/?user=${uid}`);
  const ret = await res.json();

  const resU = await fetch(`${BACKEND_URL}/auth/user/?uid=${uid}`);
  const retU = await resU.json();

  const reviews = ret["data"];
  const user = retU["user"];
  return {
    props: {
      reviews: reviews,
      user: user,
      kind: "user",
      list: 2,
      uid: uid,
    },
  };
};

export default UserReviews;
