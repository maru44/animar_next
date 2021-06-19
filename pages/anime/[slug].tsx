import { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
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
  title: string;
  ogType: string;
  ogImage: string;
  ogDescription: string;
  ogSeoDescription: string;
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
  const [wid, setWid] = useState<number>(null);
  const [seasons, setSeasons] = useState<TSeason[]>(null);
  const [plats, setPlats] = useState<TRelationPlatform[]>(null);

  useEffect(() => {
    const f = async () => {
      const dataW = await getWatchCountsList(anime.id); // watch state
      const dataUW = await fetchWatchStateDetail(anime.id); // user's watch state
      const dataRU = await fetchUserAnimeReview(anime.id); //reviews of login user
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
      dataUW && setUserWatch(dataUW);
      dataRU && setUserReviewStar(dataRU[0]["rating"]);
      dataRU && setUserReviewContent(dataRU[0]["content"]);
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
    };
    f();
  }, []);

  // review post start
  const startPostContent = async (e: any) => {
    e.preventDefault();
    const content = e.target.content.value;
    const ret = await fetchUpsertReviewContent(anime.id, content);
    setUserReviewContent(ret["data"]);
  };

  const startPostStar = async (e: any) => {
    e.preventDefault();
    const star = e.target.dataset.id;
    const ret = await fetchUpsertReviewStar(anime.id, star);
    setUserReviewStar(ret["data"]);
    const newAvg = await fetchAnimeStars(anime.id);
    setStarAvg(newAvg);
  };

  // watch post start
  const startWatchPost = async (e: any) => {
    e.preventDefault();
    const watch = e.target.dataset.id;
    const ret = await fetchPostWatchStates(anime.id, watch);
    setUserWatch(ret);

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
                  data-id={index}
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
    // @TODO
    //404
  }
};

export default AnimeDetail;
