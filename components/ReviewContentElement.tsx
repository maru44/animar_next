import { NextPage } from "next";
import { useEffect, useState } from "react";
import { TReview } from "../types/anime";
import { TUser } from "../types/auth";
import { fetchUserModel } from "../helper/UserHelper";
import { DEFAULT_USER_IMAGE } from "../helper/Config";
import Link from "next/link";

interface Props {
  review: TReview;
}

const ReviewContentElement: NextPage<Props> = (props) => {
  const review = props.review;
  const [author, setAuthor] = useState<TUser>(undefined);
  useEffect(() => {
    (async () => {
      const uid = review.user_id;
      if (review.user_id) {
        const author = await fetchUserModel(uid);
        setAuthor(author);
      }
    })();
  }, []);

  return (
    <div className="mb10">
      <article>
        <p>{review.content}</p>
        <div className="mt5 flexNormal hrefBox">
          <div
            className="imgCircle mla mr20"
            style={
              author && author.photoUrl
                ? {
                    backgroundImage: `url(${author.photoUrl})`,
                  }
                : {
                    backgroundImage: `url(${DEFAULT_USER_IMAGE})`,
                  }
            }
          ></div>
          <p>{author && author.displayName ? author.displayName : "----"}</p>
          {author && (
            <Link href="/watch/[uid]" as={`/watch/${review.user_id}`} passHref>
              <a className="hrefBoxIn"></a>
            </Link>
          )}
        </div>
      </article>
    </div>
  );
};

export default ReviewContentElement;
