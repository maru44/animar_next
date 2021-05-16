import { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import useSWR from "swr";
import WatchStateGraphPie from "../../components/WatchStateGraphPie";
import { BACKEND_URL, baseFetcher } from "../../helper/Config";
import { fetchAnimeReviews, fetchPostReview } from "../../helper/ReviewHelper";
import {
  fetchPostWatchStates,
  fetchWatchStateDetail,
  getWatchCountsList,
  watchStateList,
} from "../../helper/WatchHelper";
import { TAnime, TReview } from "../../types/anime";
import Header from "../../components/Header";

interface Props {
  anime: TAnime;
  watchCounts: number[];
}

interface Params extends ParsedUrlQuery {
  slug: string;
}

const AnimeDetail: NextPage<Props> = (props) => {
  const anime = props.anime;
  console.log(anime);
  //const watchCountsList = props.watchCounts;

  const [reviews, setReviews] = useState(null);
  const [watchCountsList, setWatchCountsList] = useState(props.watchCounts);
  const [userWatch, setUserWatch] = useState<number>(null);

  useEffect(() => {
    const f = async () => {
      const dataR = await baseFetcher(
        `${BACKEND_URL}/reviews/anime/?anime=${anime.ID}`
      );
      const dataW = await getWatchCountsList(anime.ID);
      const dataUW = await fetchWatchStateDetail(anime.ID);
      setReviews(dataR);
      setWatchCountsList(dataW);
      setUserWatch(dataUW);
      console.log(userWatch, dataUW);
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
  const startPost = async (e: any) => {
    e.preventDefault();
    const content = e.target.content.value;
    const star = e.target.star.value;
    const ret = await fetchPostReview(anime.ID, content, star);
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
          <div className="reviewList">
            {reviews &&
              reviews.map((review: TReview, index: number) => (
                <div key={index}>
                  {review.Content} {review.UserId}
                </div>
              ))}
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
          <form onSubmit={startPost} className="mt40">
            <div className="">
              <label>content</label>
              <textarea name="content" rows={5} />
            </div>
            <div className="">
              <label>star</label>
              <input type="number" name="star" />
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
