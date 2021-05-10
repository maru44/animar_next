import { NextPage } from "next";
import { BACKEND_URL } from "../../helper/Config";
import { fetchPostReview } from "../../helper/ReviewHelper";

const YourReviews: NextPage = () => {
  const startFetch = async () => {
    const res = await fetch(`${BACKEND_URL}/reviews/`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    });
  };

  const startPost = async (e: any) => {
    e.preventDefault();
    const animeId = e.target.animeId.value;
    const content = e.target.content.value;
    const star = e.target.star.value;
    const ret = await fetchPostReview(animeId, content, star);
    console.log(ret);
  };

  return (
    <div>
      <div className="">
        <button onClick={startFetch}>fetch</button>
      </div>
      <form onSubmit={startPost}>
        <div className="">
          <label>animeid</label>
          <input type="number" name="animeId" />
        </div>
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
  );
};

export default YourReviews;
