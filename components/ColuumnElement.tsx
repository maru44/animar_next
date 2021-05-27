import { NextPage } from "next";
import { TBlog } from "../types/blog";
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
        <p className="mt5 brAll ovHide abstractZone">{blog.Abstract}</p>
        <p className="mt5">
          <small>
            {blog.CreatedAt}
            <span className="mla">
              {blog.User && blog.User.displayName
                ? blog.User.displayName
                : "-----"}
            </span>
          </small>
        </p>
        <Link href="/column/[slug]" as={`/column/${blog.Slug}`} passHref>
          <a className="hrefBoxIn"></a>
        </Link>
      </article>
    </>
  );
};

export default ColumnElement;
