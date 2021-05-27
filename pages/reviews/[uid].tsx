import { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import Header from "../../components/Header";
import { BACKEND_URL } from "../../helper/Config";
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
              <div className="usersReview" key={index}>
                {review.Title}
              </div>
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
