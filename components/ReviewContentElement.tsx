import { useEffect, useState } from "react";
import { TReview } from "../types/anime";
import { TUser } from "../types/auth";
import { fetchUserModel } from "../helper/UserHelper";
import { DEFAULT_USER_IMAGE } from "../helper/Config";
import Link from "next/link";
import Image from "next/image";

interface Props {
  animeTitle: string;
  review: TReview;
}

const ReviewContentElement: React.FC<Props> = (props) => {
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
    <div className="mb15">
      <article>
        <div className="flexNormal alCen spBw">
          <p>{review.content}</p>
        </div>
        <div className="mt10 flexNormal alCen">
          <div className="cursorP hrefBox" style={{ width: `${18}px` }}>
            <img className="w100" src="/image/twitter_black.png" />
            <Link
              href={`https://twitter.com/intent/tweet?hashtags=loveanime,ラブアニメ&text=${props.animeTitle}-感想&url=${process.env.NEXT_PUBLIC_FRONT_URL}/reviews/d/${review.id}`}
              passHref
            >
              <a
                className="hrefBoxIn"
                target="_new"
                data-text={`${props.animeTitle}-感想`}
              ></a>
            </Link>
          </div>
          <div
            className="cursorP ml30"
            onClick={() => {
              navigator.clipboard.writeText(
                `${process.env.NEXT_PUBLIC_FRONT_URL}/reviews/d/${review.id}`
              );
            }}
          >
            <Image className="" width={20} height={20} src="/image/copy.png" />
          </div>
          <div className="mla flexNormal hrefBox">
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
              <Link
                href="/watch/[uid]"
                as={`/watch/${review.user_id}`}
                passHref
              >
                <a className="hrefBoxIn"></a>
              </Link>
            )}
          </div>
        </div>
      </article>
    </div>
  );
};

export default ReviewContentElement;
