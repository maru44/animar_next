import { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import useSWR from "swr";
import WatchStateGraphPie from "../../components/WatchStateGraphPie";
import {
  BACKEND_URL,
  baseFetcher,
  DEFAULT_USER_IMAGE,
} from "../../helper/Config";
import {
  fetchAnimeReviews,
  fetchUpsertReviewContent,
  fetchUpsertReviewStar,
  fetchUserAnimeReview,
  reviewStarList,
  fetchAnimeStars,
} from "../../helper/ReviewHelper";
import {
  fetchPostWatchStates,
  fetchWatchStateDetail,
  getWatchCountsList,
  watchStateList,
} from "../../helper/WatchHelper";
import { TAnime, TReview } from "../../types/anime";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import Link from "next/link";

interface Props {
  anime: TAnime;
  stars: string;
  reviews: TReview[];
}

interface Params extends ParsedUrlQuery {
  slug: string;
}

const AnimeDetail: NextPage<Props> = (props) => {
  const anime = props.anime;
  const { isAuthChecking, CurrentUser } = useCurrentUser();

  const [reviews, setReviews] = useState<TReview[]>(props.reviews);
  const [watchCountsList, setWatchCountsList] = useState<number[]>(null);
  const [starAvg, setStarAvg] = useState<string>(props.stars);
  const [userWatch, setUserWatch] = useState<number>(null);
  const [userReviewStar, setUserReviewStar] = useState<number>(null);
  const [userReviewContent, setUserReviewContent] = useState<string>(null);

  useEffect(() => {
    const f = async () => {
      // const dataR = await baseFetcher(
      //   `${BACKEND_URL}/reviews/anime/?anime=${anime.ID}`
      // );
      const dataW = await getWatchCountsList(anime.ID); // watch state
      const dataUW = await fetchWatchStateDetail(anime.ID); // user's watch state
      const dataRU = await fetchUserAnimeReview(anime.ID); //reviews of login user
      //setReviews(dataR);
      setWatchCountsList(dataW);
      dataUW && setUserWatch(dataUW);
      dataRU && setUserReviewStar(dataRU["Star"]);
      dataRU && setUserReviewContent(dataRU["Content"]);
    };
    f();
  }, []);

  // useSwr sample
  /*
  const { data: reviews, error } = useSWR(
    `${BACKEND_URL}/reviews/anime/?anime=${anime.ID}`,
    baseFetcher
  );
  
  const { data: watchCountsList, error: watchCountsError } = useSWR(
    `${BACKEND_URL}/watch/?anime=${anime.ID}`,
    // getWatchCountsList,
    (url: string) => getWatchCountsList(anime.ID, url),
    {
      initialData: props.watchCounts,
    }
  );
  */

  // review post start
  const startPostContent = async (e: any) => {
    e.preventDefault();
    const content = e.target.content.value;
    const ret = await fetchUpsertReviewContent(anime.ID, content);
    setUserReviewContent(ret["String"]);
  };

  const startPostStar = async (e: any) => {
    e.preventDefault();
    const star = e.target.dataset.id;
    const ret = await fetchUpsertReviewStar(anime.ID, star);
    setUserReviewStar(ret["ID"]);
    const newAvg = await fetchAnimeStars(anime.ID);
    setStarAvg(newAvg);
  };

  // watch post start
  const startWatchPost = async (e: any) => {
    e.preventDefault();
    const watch = e.target.dataset.id;
    const ret = await fetchPostWatchStates(anime.ID, watch);
    console.log(ret);
    setUserWatch(ret);

    const newWatchCountsList = await getWatchCountsList(anime.ID);
    setWatchCountsList(newWatchCountsList);
  };

  console.log(reviews);

  return (
    <div>
      <main>
        <div className="content mla mra">
          <h1 className="brAll">{anime.Title}</h1>
          <div className="animeDetailTop flexNormal flexWrap alCen mt20">
            <div className="thumbWrapper">
              <div className="avgStar">
                <strong>&#9733; {starAvg}</strong>
              </div>
              <div className="thumb frame">
                <img
                  className="w100 contain"
                  src={
                    anime.ThumbUrl
                      ? `${anime.ThumbUrl}`
                      : "https://animar-bucket.s3-ap-northeast-1.amazonaws.com/slum.jpg"
                  }
                />
              </div>
            </div>
            <div className="flex1" style={{ maxWidth: "100%" }}>
              {watchCountsList && (
                <WatchStateGraphPie
                  title="みんなの視聴状況"
                  lst={watchCountsList}
                ></WatchStateGraphPie>
              )}
            </div>
          </div>
          <div className="mt20">
            <span className="curiousArea">
              興味: {watchCountsList && watchCountsList[1]}人
            </span>
          </div>
          {CurrentUser && watchStateList && (
            <div className="mt20 flexNormal watchStateZone spBw">
              {watchStateList.map((st, index) => (
                <div
                  className={
                    userWatch !== null && userWatch == index
                      ? "watchStateBtn flexCen selected"
                      : "watchStateBtn flexCen"
                  }
                  data-id={index}
                  onClick={startWatchPost}
                  key={index}
                >
                  {st}
                </div>
              ))}
            </div>
          )}
          {CurrentUser && (
            <section className="mt40">
              {userReviewContent && <div className="">{userReviewContent}</div>}
              <div className="mt20">
                <span className="titleSpan ">レビュー</span>
              </div>
              <div className="mt20 reviewStars">
                {reviewStarList &&
                  reviewStarList.map((star, index) => (
                    <span
                      className={
                        userReviewStar && userReviewStar - 1 >= index
                          ? "mr5 star active"
                          : "mr5 star"
                      }
                      key={index}
                      data-id={index + 1}
                      onClick={startPostStar}
                    >
                      &#9733;
                    </span>
                  ))}
              </div>
              <form onSubmit={startPostContent} className="mt20">
                <div className="field">
                  <textarea
                    name="content"
                    className="reviewContent"
                    rows={3}
                    maxLength={160}
                    placeholder="一言レビュー: 160文字"
                    defaultValue={userReviewContent ? userReviewContent : ""}
                  />
                </div>
                <div className="mt5">
                  <button type="submit" className="floatR">
                    {userReviewContent ? "編集する" : "投稿する"}
                  </button>
                </div>
              </form>
            </section>
          )}
          <div className="reviewList mt40">
            <span className="titleSpan ">みんなのレビュー</span>
            <br />
            <div className="mt20">
              {reviews &&
                reviews.map(
                  (review: TReview, index: number) =>
                    review.Content && (
                      <article key={index} className="mb10">
                        <p>{review.Content}</p>
                        <div className="mt5 flexNormal hrefBox">
                          <div
                            className="imgCircle mla mr20"
                            style={
                              review.User && review.User.photoUrl
                                ? {
                                    backgroundImage: `url(${review.User.photoUrl})`,
                                  }
                                : {
                                    backgroundImage: `url(${DEFAULT_USER_IMAGE})`,
                                  }
                            }
                          ></div>
                          <p>
                            {review.User && review.User.displayName
                              ? review.User.displayName
                              : "----"}
                          </p>
                          {review.User && (
                            <Link
                              href="/watch/[uid]"
                              as={`/watch/${review.UserId}`}
                              passHref
                            >
                              <a className="hrefBoxIn"></a>
                            </Link>
                          )}
                        </div>
                      </article>
                    )
                )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async (
  ctx
) => {
  const slug = ctx.params.slug;
  const res = await fetch(`${BACKEND_URL}/db/anime/?slug=${slug}`);
  const ret = await res.json();
  const anime: TAnime = ret["Data"][0];

  const dataR = await baseFetcher(
    `${BACKEND_URL}/reviews/anime/?anime=${anime.ID}`
  );

  const dataS = await fetchAnimeStars(anime.ID);

  return {
    props: {
      anime: anime,
      stars: dataS,
      reviews: dataR,
    },
  };
};

export default AnimeDetail;
