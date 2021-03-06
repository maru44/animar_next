import { GetServerSideProps, NextPage } from "next";
import { TBlog } from "../../types/blog";
import { BACKEND_URL } from "../../helper/Config";
import ColumnElement from "../../components/ColumnElement";
import { pageBaseProps } from "../../types/page";

type Props = {
  blogs: TBlog[];
} & pageBaseProps;

const BlogList: NextPage<Props> = (props) => {
  const blogs = props.blogs;

  return (
    <div>
      <main>
        <div className="mla mra content">
          <div>
            {blogs &&
              blogs.map((blog, index) => (
                <ColumnElement column={blog} index={index}></ColumnElement>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const res = await fetch(`${BACKEND_URL}/blog/`);
  const ret = await res.json();
  const blogs = ret["data"];

  return {
    props: {
      blogs: blogs,
      list: 2,
      title: "コラム一覧",
    },
  };
};

export default BlogList;
