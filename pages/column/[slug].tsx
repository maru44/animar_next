import { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "github-markdown-css/github-markdown.css";
import { BACKEND_URL, DEFAULT_USER_IMAGE } from "../../helper/Config";
import { TBlog } from "../../types/blog";
import Link from "next/link";

interface Props {
  blog: TBlog;
}

interface Params extends ParsedUrlQuery {
  slug: string;
}

const BlogDetail: NextPage<Props> = (props) => {
  console.log(props);
  const blog = props.blog;

  return (
    <div>
      <main>
        <div className="mla mra content">
          <div className="columnArea">
            <h1 className="brAll">{blog.Title}</h1>
            {blog.Abstract && (
              <p className="mt20 abstract preWrap brAll">{blog.Abstract}</p>
            )}
            <ReactMarkdown
              plugins={[remarkGfm]}
              className="preWrap mt40 brAll"
              unwrapDisallowed={false}
            >
              {blog.Content}
            </ReactMarkdown>
            <div className="mt40 authorZone">
              Author
              {blog.User && blog.User.displayName && (
                <div className="hrefBox mt10 flexNormal alCen">
                  <div
                    className="imgCircle"
                    style={
                      blog.User.photoUrl
                        ? { backgroundImage: `url(${blog.User.photoUrl})` }
                        : { backgroundImage: `url(${DEFAULT_USER_IMAGE})` }
                    }
                  ></div>
                  <p>{blog.User.displayName}</p>
                  <Link
                    href="/column/u/[uid]"
                    as={`/column/u/${blog.UserId}`}
                    passHref
                  >
                    <a className="hrefBoxIn"></a>
                  </Link>
                </div>
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
