import { NextPage } from "next";
import { TBlog, TMinAnime } from "../types/blog";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TUser } from "../types/auth";
import { fetchUserModel } from "../helper/UserHelper";

interface Props {
  index: number;
  column: TBlog;
}

const ColumnElement: NextPage<Props> = (props) => {
  const blog = props.column;
  const index = props.index;
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
    <>
      <article key={index} className="aBlog mb35 hrefBox ovHide">
        <h3 className="ovHide">{blog.title}</h3>
        {blog.animes && (
          <div className="mt5 relAnimeList">
            {blog.animes.map((anime: TMinAnime, idx: number) => (
              <span className="hrefBox mr10" key={idx}>
                {anime.title}
              </span>
            ))}
          </div>
        )}
        <p className="mt5 brAll ovHide abstractZone">{blog.abstract}</p>
        <p className="mt5">
          <small>{blog.created_at}</small>
          <span className="floatR">
            <small>
              {author !== undefined && author && author.displayName
                ? author.displayName
                : "-----"}
            </small>
          </span>
        </p>
        <Link href="/column/[slug]" as={`/column/${blog.slug}`} passHref>
          <a className="hrefBoxIn"></a>
        </Link>
      </article>
    </>
  );
};

export default ColumnElement;
