import { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { BACKEND_URL, DEFAULT_USER_IMAGE } from "../../helper/Config";
import { TBlog, TMinAnime } from "../../types/blog";
import Link from "next/link";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import Head from "next/head";
import { fetchDeleteBlog } from "../../helper/BlogHelper";
import { useRouter } from "next/router";

interface Props {
  blog: TBlog;
  title: string;
  robots: string;
  ogType: string;
}

interface Params extends ParsedUrlQuery {
  slug: string;
}

const BlogDetail: NextPage<Props> = (props) => {
  const { isAuthChecking, CurrentUser } = useCurrentUser();
  const router = useRouter();
  const blog = props.blog;

  const exeDeleteColumn = async (e: any) => {
    const id = e.target.dataset.id;
    const ret = await fetchDeleteBlog(id);
    ret["Status"] === 200 ? router.back() : console.log(ret);
  };

  return (
    <div>
      <Head>
        <meta name="robots" content="nofollow " />
      </Head>
      <main>
        <div className="mla mra content">
          <div className="columnArea">
            <h1 className="brAll">{blog.Title}</h1>
            {blog.Animes && (
              <div className="mt20 relAnimeList">
                {blog.Animes.map((anime: TMinAnime, idx: number) => (
                  <span className="hrefBox mr20" key={idx}>
                    {anime.Title}
                    <Link
                      href="/anime/[slug]"
                      as={`/anime/${blog.Slug}`}
                      passHref
                    >
                      <a className="hrefBoxIn"></a>
                    </Link>
                  </span>
                ))}
              </div>
            )}
            {blog.Abstract && (
              <p className="mt20 abstract preWrap brAll">{blog.Abstract}</p>
            )}
            <ReactMarkdown
              plugins={[remarkGfm]}
              className="preWrap mt40 brAll"
              unwrapDisallowed={false}
              linkTarget="_new"
            >
              {blog.Content}
            </ReactMarkdown>
            {CurrentUser && CurrentUser.rawId === blog.UserId && (
              <div className="mt40 flexNormal spBw ownerOnly">
                <button className="button hrefBox w48 flexCen">
                  編集する
                  <Link
                    href="/column/update/[id]"
                    as={`/column/update/${blog.ID}`}
                    passHref
                  >
                    <a className="hrefBoxIn"></a>
                  </Link>
                </button>
                <button
                  className="button hrefBox w48 flexCen"
                  onClick={exeDeleteColumn}
                  data-id={blog.ID}
                >
                  削除する
                </button>
              </div>
            )}
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
      title: blog["Title"],
      robots: "nofollow",
      ogType: "article",
    },
  };
};

export default BlogDetail;
