import { NextPage } from "next";
import { TBlog, TMinAnime } from "../types/blog";
import Link from "next/link";

interface Props {
  index: number;
  column: TBlog;
}

const ColumnElement: NextPage<Props> = (props) => {
  const blog = props.column;
  const index = props.index;

  return (
    <>
      <article key={index} className="aBlog mb35 hrefBox ovHide">
        <h3 className="ovHide">{blog.Title}</h3>
        {blog.Animes && (
          <div className="mt5 relAnimeList">
            {blog.Animes.map((anime: TMinAnime, idx: number) => (
              <span className="hrefBox mr10" key={idx}>
                {anime.Title}
              </span>
            ))}
          </div>
        )}
        <p className="mt5 brAll ovHide abstractZone">{blog.Abstract}</p>
        <p className="mt5">
          <small>{blog.CreatedAt}</small>
          <span className="floatR">
            <small>
              {blog.User && blog.User.displayName
                ? blog.User.displayName
                : "-----"}
            </small>
          </span>
        </p>
        <Link href="/column/[slug]" as={`/column/${blog.Slug}`} passHref>
          <a className="hrefBoxIn"></a>
        </Link>
      </article>
    </>
  );
};

export default ColumnElement;
