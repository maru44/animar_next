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
import { useEffect, useState } from "react";
import { TUser } from "../../types/auth";
import { fetchUserModel } from "../../helper/UserHelper";
import { pageBaseProps } from "../../types/page";

type Props = {
  blog: TBlog;
} & pageBaseProps;

interface Params extends ParsedUrlQuery {
  slug: string;
}

const BlogDetail: NextPage<Props> = (props) => {
  const { isAuthChecking, CurrentUser } = useCurrentUser();
  const router = useRouter();
  const blog = props.blog;

  const exeDeleteColumn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.dataset.id;
    const res = await fetchDeleteBlog(id);
    res.status === 200 ? router.back() : console.log(res);
  };

  const [author, setAuthor] = useState<TUser>(undefined);
  useEffect(() => {
    (async () => {
      const uid = blog.user_id;
      if (blog.user_id) {
        const author = await fetchUserModel(uid);
        setAuthor(author);
      }
    })();
  }, []);

  return (
    <div>
      <Head>
        <meta name="robots" content="nofollow " />
      </Head>
      <main>
        <div className="mla mra content">
          <div className="columnArea">
            <h1 className="brAll">{blog.title}</h1>
            {blog.animes && (
              <div className="mt20 relAnimeList">
                {blog.animes.map((anime: TMinAnime, idx: number) => (
                  <span className="hrefBox mr20" key={idx}>
                    {anime.title}
                    <Link
                      href="/anime/[slug]"
                      as={`/anime/${anime.slug}`}
                      passHref
                    >
                      <a className="hrefBoxIn"></a>
                    </Link>
                  </span>
                ))}
              </div>
            )}
            {blog.abstract && (
              <p className="mt20 abstract preWrap brAll">{blog.abstract}</p>
            )}
            <ReactMarkdown
              plugins={[remarkGfm]}
              className="preWrap mt40 brAll"
              unwrapDisallowed={false}
              linkTarget="_new"
            >
              {blog.content}
            </ReactMarkdown>
            {CurrentUser && CurrentUser.rawId === blog.user_id && (
              <div className="mt40 flexNormal spBw ownerOnly">
                <button className="button hrefBox w48 flexCen">
                  ????????????
                  <Link
                    href="/column/update/[id]"
                    as={`/column/update/${blog.id}`}
                    passHref
                  >
                    <a className="hrefBoxIn"></a>
                  </Link>
                </button>
                <button
                  className="button hrefBox w48 flexCen"
                  onClick={exeDeleteColumn}
                  data-id={blog.id}
                >
                  ????????????
                </button>
              </div>
            )}
            <div className="mt40 authorZone">
              Author
              {author !== undefined && author && author.displayName && (
                <div className="hrefBox mt10 flexNormal alCen">
                  <div
                    className="imgCircle"
                    style={
                      author.photoUrl
                        ? { backgroundImage: `url(${author.photoUrl})` }
                        : { backgroundImage: `url(${DEFAULT_USER_IMAGE})` }
                    }
                  ></div>
                  <p>{author.displayName}</p>
                  <Link
                    href="/column/u/[uid]"
                    as={`/column/u/${blog.user_id}`}
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

  // 404 Not Found
  if (res.status === 404) {
    return {
      notFound: true,
    };
  }

  const ret = await res.json();

  const blog = ret["data"];
  return {
    props: {
      blog: blog,
      title: blog["title"],
      robots: "nofollow",
      ogType: "article",
      ogDescription: blog["abstract"] ?? null,
      ogSeoDescription: blog["abstract"] ?? null,
    },
  };
};

export default BlogDetail;
