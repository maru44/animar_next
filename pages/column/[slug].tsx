import { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Header from "../../components/Header";
import { BACKEND_URL } from "../../helper/Config";
import { TBlog } from "../../types/blog";

interface Props {
  blog: TBlog;
}

interface Params extends ParsedUrlQuery {
  slug: string;
}

const BlogDetail: NextPage<Props> = (props) => {
  const blog = props.blog;

  return (
    <div>
      <Header></Header>
      <main>
        <div className="mla mra content">
          <ReactMarkdown
            plugins={[remarkGfm]}
            className="preWrap"
            unwrapDisallowed={false}
          >
            {blog.Content}
          </ReactMarkdown>
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async (
  ctx
) => {
  const slug = ctx.params.slug;
  const res = await fetch(`${BACKEND_URL}/blog/?s=${slug}`);
  const ret = await res.json();

  const blog = ret["Data"][0];
  return {
    props: {
      blog: blog,
    },
  };
};

export default BlogDetail;
