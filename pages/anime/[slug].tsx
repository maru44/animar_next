import { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import useSWR from "swr";
import WatchStateGraphPie from "../../components/WatchStateGraphPie";
import { BACKEND_URL, baseFetcher } from "../../helper/Config";
import {
  fetchAnimeReviews,
  fetchPostReview,
  fetchUpsertReviewContent,
  fetchUpsertReviewStar,
  fetchUserAnimeReview,
  reviewStarList,
} from "../../helper/ReviewHelper";
import {
  fetchPostWatchStates,
  fetchWatchStateDetail,
  getWatchCountsList,
  watchStateList,
} from "../../helper/WatchHelper";
import { TAnime, TReview } from "../../types/anime";
import Header from "../../components/Header";
import { useCurrentUser } from "../../hooks/useCurrentUser";

interface Props {
  anime: TAnime;
  watchCounts: number[];
}

interface Params extends ParsedUrlQuery {
  slug: string;
}

const AnimeDetail: NextPage<Props> = (props) => {
  const anime = props.anime;
  const { isAuthChecking, CurrentUser } = useCurrentUser();

  const [reviews, setReviews] = useState<TReview[]>(null);
  const [watchCountsList, setWatchCountsList] = useState(props.watchCounts);
  const [userWatch, setUserWatch] = useState<number>(null);
  const [userReviewStar, setUserReviewStar] = useState<number>(null);
  const [userReviewContent, setUserReviewContent] = useState<string>(null);

  useEffect(() => {
    const f = async () => {
      const dataR = await baseFetcher(
        `${BACKEND_URL}/reviews/anime/?anime=${anime.ID}`
      );
      const dataW = await getWatchCountsList(anime.ID);
      const dataUW = await fetchWatchStateDetail(anime.ID);
      const dataRU = await fetchUserAnimeReview(anime.ID);
      setReviews(dataR);
      setWatchCountsList(dataW);
      setUserWatch(dataUW);
      setUserReviewStar(dataRU["Star"]);
      setUserReviewContent(dataRU["Content"]);
    };
    f();
  }, []);

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
  };

  // watch post start
  const startWatchPost = async (e: any) => {
    e.preventDefault();
    // const watch = e.target.watch.value;
    const watch = e.target.dataset.id;
    const ret = await fetchPostWatchStates(anime.ID, watch);
    console.log(ret);
    setUserWatch(ret);

    const newWatchCountsList = await getWatchCountsList(anime.ID);
    setWatchCountsList(newWatchCountsList);
  };

  return (
    <div>
      <Header></Header>
      <main>
        <div className="content mla mra">
          <div className="">
            {anime.ID} {anime.Title}
          </div>
          <WatchStateGraphPie
            title="みんなの視聴状況"
            lst={watchCountsList}
          ></WatchStateGraphPie>
          <div className="mt20">興味: {watchCountsList[1]}人</div>
          <div className="mt20 flexNormal watchStateZone spBw">
            {watchStateList &&
              watchStateList.map((st, index) => (
                <div
                  className={
                    userWatch && userWatch == index
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
          <div className="reviewList mt40">
            {reviews &&
              reviews.map((review: TReview, index: number) => (
                <div key={index}>
                  {review.Content} {review.Star} {review.UserId}
                </div>
              ))}
          </div>
          {userReviewContent && <div className="mt20">{userReviewContent}</div>}
          <div className="mt40 reviewStars">
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
          <form onSubmit={startPostContent} className="mt40">
            <div className="field">
              <label>content</label>
              <textarea name="content" rows={5} />
            </div>
            <div className="">
              <button type="submit">post</button>
            </div>
          </form>
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

  const animeId = anime.ID;
  const watchCountsList = await getWatchCountsList(animeId);

  return {
    props: {
      anime: anime,
      watchCounts: watchCountsList,
    },
  };
};

export default AnimeDetail;
