import { GetServerSideProps, NextPage } from "next";
import { fetchPostBlog } from "../../helper/BlogHelper";
import Header from "../../components/Header";

const BlogPost: NextPage = () => {
  const startPostBlog = async (e: any) => {
    e.preventDefault();
    const ret = await fetchPostBlog(
      e.target.title.value,
      e.target.abst.value,
      e.target.content.value
    );
  };

  return (
    <div>
      <Header></Header>
      <main>
        <div className="mla mra content">
          <form onSubmit={startPostBlog}>
            <div className="field">
              <label htmlFor="">タイトル</label>
              <input type="text" name="title" />
            </div>
            <div className="mt20">
              <label>概要</label>
              <input type="text" name="abst" />
            </div>
            <div className="mt20">
              <label>内容</label>
              <textarea name="content"></textarea>
            </div>
            <div className="mt40">
              <button type="submit" className="">
                送信する
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default BlogPost;
