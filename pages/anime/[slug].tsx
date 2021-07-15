import { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import React, { useEffect, useState } from "react";
import WatchStateGraphPie from "../../components/WatchStateGraphPie";
import { BACKEND_URL, baseFetcher } from "../../helper/Config";
import {
  fetchUpsertReviewContent,
  fetchUpsertReviewStar,
  fetchUserAnimeReview,
  reviewStarList,
  fetchAnimeStars,
} from "../../helper/ReviewHelper";
import {
  fetchDeleteWatchStates,
  fetchPostWatchStates,
  fetchWatchStateDetail,
  getWatchCountsList,
  watchStateList,
} from "../../helper/WatchHelper";
import { AnimeStateDict } from "../../helper/AnimeHelper";
import { TAnime, TReview } from "../../types/anime";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import ReviewContentElement from "../../components/ReviewContentElement";
import { fetchRelationSeason } from "../../helper/admin/SeasonHelper";
import { fetchRelationPlatform } from "../../helper/admin/PlatformHelper";
import { TSeason } from "../../types/season";
import { TRelationPlatform } from "../../types/platform";
import Link from "next/link";

interface Props {
  anime: TAnime;
  reviews: TReview[];
  // ogp
}

interface Params extends ParsedUrlQuery {
  slug: string;
}

const AnimeDetail: NextPage<Props> = (props) => {
  const anime = props.anime;
  const { isAuthChecking, CurrentUser } = useCurrentUser();

  const [reviews, setReviews] = useState<TReview[]>(props.reviews);
  const [watchCountsList, setWatchCountsList] = useState<number[]>(null);
  const [starAvg, setStarAvg] = useState<string>(null);
  const [userWatch, setUserWatch] = useState<number>(null);
  const [userReviewStar, setUserReviewStar] = useState<number>(null);
  const [userReviewContent, setUserReviewContent] = useState<string>(null);
  const [userReviewId, setUserReviewId] = useState<number>(null);
  const [wid, setWid] = useState<number>(null);
  const [seasons, setSeasons] = useState<TSeason[]>(null);
  const [plats, setPlats] = useState<TRelationPlatform[]>(null);

  useEffect(() => {
    (async () => {
      const dataW = await getWatchCountsList(anime.id); // watch state

      const dataStar = await fetchAnimeStars(anime.id);
      const dataSeasonRes = await fetchRelationSeason(anime.id);
      const dataPlatRes = await fetchRelationPlatform(anime.id);
      const wid =
        window.innerWidth > 800
          ? 800 * 0.68
          : window.innerWidth < 559
          ? window.innerWidth - 12
          : window.innerWidth * 0.68;
      setWid(wid);

      setWatchCountsList(dataW);
      dataStar && setStarAvg(dataStar);

      if (dataSeasonRes.status === 200) {
        const ret = await dataSeasonRes.json();
        setSeasons(ret["data"]);
      }
      if (dataPlatRes.status === 200) {
        const ret = await dataPlatRes.json();
        setPlats(ret["data"]);
      }

      const dataUW = await fetchWatchStateDetail(anime.id); // user's watch state
      const dataRU = await fetchUserAnimeReview(anime.id); //reviews of login user

      dataUW && dataUW["id"] !== 0 && setUserWatch(dataUW["state"]);
      dataRU && setUserReviewStar(dataRU["rating"]);
      dataRU && setUserReviewContent(dataRU["content"]);
      dataRU && setUserReviewId(dataRU["id"]);
    })();
  }, []);

  // review post start
  const startPostContent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const content = e.currentTarget.content.value;
    const ret = await fetchUpsertReviewContent(anime.id, content);
    setUserReviewContent(ret["data"]);
  };

  const startPostStar = async (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    const star = e.currentTarget.dataset.star;
    if (userReviewStar && userReviewStar === parseInt(star)) {
      const ret = await fetchUpsertReviewStar(anime.id, null);
      setUserReviewStar(ret["data"]);
    } else {
      const ret = await fetchUpsertReviewStar(anime.id, parseInt(star));
      setUserReviewStar(ret["data"]);
    }
    const newAvg = await fetchAnimeStars(anime.id);
    setStarAvg(newAvg);
  };

  // watch post start
  const startWatchPost = async (e: any) => {
    e.preventDefault();
    const watch = e.target.dataset.watch;
    if (userWatch && userWatch === parseInt(watch)) {
      const res = await fetchDeleteWatchStates(anime.id);
      res === 200 && setUserWatch(null);
    } else {
      const ret = await fetchPostWatchStates(anime.id, watch);
      setUserWatch(ret);
    }

    const newWatchCountsList = await getWatchCountsList(anime.id);
    setWatchCountsList(newWatchCountsList);
  };

  return (
    <div>
      <main>
        <div className="content mla mra">
          <h1 className="brAll">{anime.title}</h1>
          <div className="animeDetailTop flexNormal flexWrap alCen mt20">
            <div className="thumbWrapper">
              <div className="avgStar">
                <strong>&#9733; {starAvg}</strong>
              </div>
              <div className="thumb frame">
                {anime.thumb_url ? (
                  <img
                    className="w100 contain"
                    src={anime.thumb_url}
                    alt={anime.title}
                    loading="lazy"
                    width={560}
                    height={745}
                  />
                ) : (
                  <img className="w100 contain" />
                )}
              </div>
            </div>
            <div className="flex1 graphWrapper">
              {watchCountsList && (
                <WatchStateGraphPie
                  title="みんなの視聴状況"
                  lst={watchCountsList}
                  width={wid}
                ></WatchStateGraphPie>
              )}
            </div>
          </div>
          <div className="mt20">
            <span className="curiousArea">
              興味: {watchCountsList && watchCountsList[1]}
            </span>
          </div>
          {CurrentUser && CurrentUser.isVerify && watchStateList && (
            <div className="mt20 flexNormal watchStateZone spBw">
              {watchStateList.map((st, index) => (
                <div
                  className={
                    userWatch !== null && userWatch == index
                      ? "watchStateBtn flexCen selected"
                      : "watchStateBtn flexCen"
                  }
                  data-watch={index}
                  onClick={startWatchPost}
                  key={index}
                >
                  {st}
                </div>
              ))}
            </div>
          )}
          <div className="mt40 animeInfo">
            <div className="">
              {anime.state && (
                <span className={`onAirState ${anime.state}`}>
                  {AnimeStateDict[anime.state]}
                </span>
              )}
              <span className="countEpisodes">全{anime.count_episodes}話</span>
              {/* <span>{anime.series_id}</span> */}
              {seasons &&
                seasons.map((s, i) => (
                  <span className="seasons" key={i}>
                    {s.year}
                    {s.season}
                  </span>
                ))}
            </div>
            <div className="mt10 copyright">&copy;{anime.copyright}</div>
            <p className="brAll description mt30 preWrap">
              {anime.description}
            </p>
            <div className="mt20 platformZone flexNormal flexWrap">
              {plats &&
                plats.map((p, i) => (
                  <div className="hrefBox flexCen">
                    {p.plat_name}
                    <Link href={p.link_url} passHref>
                      <a target="_new" className="hrefBoxIn"></a>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
          {CurrentUser && CurrentUser.isVerify && (
            <section className="mt40">
              {userReviewContent && (
                <div className="flexNormal alCen spBw">
                  <p className="brAll">{userReviewContent}</p>
                  <div
                    className="ml20 cursorP hrefBox"
                    style={{ width: `${30}px` }}
                  >
                    <img className="w100" src="/image/twitter_black.png"></img>
                    <Link
                      href={`https://twitter.com/intent/tweet?hashtags=loveanime,ラブアニメ&text=${anime.title}-感想&url=${process.env.NEXT_PUBLIC_FRONT_URL}/reviews/d/${userReviewId}`}
                      passHref
                    >
                      <a
                        className="hrefBoxIn"
                        target="_new"
                        data-text={`${anime.title}-感想`}
                      ></a>
                    </Link>
                  </div>
                </div>
              )}
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
                      data-star={index + 1}
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
          {CurrentUser === null && (
            <div className="mt40">
              <div className="local messageZone hrefBox">
                <p>ログインして視聴管理とレビューをしよう!</p>
                <Link href="/auth/login" passHref>
                  <a className="hrefBoxIn"></a>
                </Link>
              </div>
            </div>
          )}
          <div className="reviewList mt40">
            <span className="titleSpan ">みんなのレビュー</span>
            <br />
            <div className="mt20">
              {reviews &&
                reviews.map(
                  (review: TReview, index: number) =>
                    review.content && (
                      <ReviewContentElement
                        key={index}
                        review={review}
                      ></ReviewContentElement>
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
  try {
    const slug = ctx.params.slug;
    const res = await fetch(`${BACKEND_URL}/db/anime/?slug=${slug}`);
    // 404 Not Found
    if (res.status === 404) {
      return {
        notFound: true,
      };
    }

    const ret = await res.json();
    const anime: TAnime = ret["anime"];

    return {
      props: {
        anime: anime,
        reviews: ret["reviews"],
        title: anime.title,
        ogType: "article",
        ogImage: anime.thumb_url ?? null,
        ogDescription: anime.description ?? null,
        ogSeoDescription: anime.description ?? null,
      },
    };
  } catch (e) {
    console.log(e);
  }
};

export default AnimeDetail;
