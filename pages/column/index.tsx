import { GetServerSideProps, NextPage } from "next";
import { TBlog } from "../../types/blog";
import { BACKEND_URL } from "../../helper/Config";
import Link from "next/link";
import Header from "../../components/Header";

interface Props {
  blogs: TBlog[];
  list: number;
}

const BlogList: NextPage<Props> = (props) => {
  const blogs = props.blogs;
  console.log(blogs);

  return (
    <div>
      <main>
        <div className="mla mra content">
          <div>
            {blogs &&
              blogs.map((blog, index) => (
                <div key={index} className="mb10 hrefBox">
                  <h3>{blog.Title}</h3>
                  <p>
                    <small>
                      {blog.CreatedAt} {blog.UserId}
                    </small>
                  </p>
                  <Link
                    href="/column/[slug]"
                    as={`/column/${blog.Slug}`}
                    passHref
                  >
                    <a className="hrefBoxIn"></a>
                  </Link>
                </div>
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
  const blogs = ret["Data"];

  return {
    props: {
      blogs: blogs,
      list: 2,
    },
  };
};

export default BlogList;
