import { GetServerSideProps, NextPage } from "next";
import { TBlog } from "../../types/blog";
import { BACKEND_URL } from "../../helper/Config";
import Link from "next/link";

interface Props {
  blogs: TBlog[];
}

const BlogList: NextPage<Props> = (props) => {
  const blogs = props.blogs;
  console.log(blogs);

  return (
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
            <Link href="/blog/[slug]" as={`/blog/${blog.Slug}`} passHref>
              <a className="hrefBoxIn"></a>
            </Link>
          </div>
        ))}
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
    },
  };
};

export default BlogList;
