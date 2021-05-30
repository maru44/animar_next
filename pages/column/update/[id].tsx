import { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { TBlog } from "../../../types/blog";
import { BACKEND_URL } from "../../../helper/Config";
import ColumnEditor from "../../../components/ColumnEditor";

interface Props {
  blog: TBlog;
}

interface Params extends ParsedUrlQuery {
  id: string;
}

const BlogUpdate: NextPage<Props, Params> = (props) => {
  return <ColumnEditor blog={props.blog}></ColumnEditor>;
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async (
  ctx
) => {
  const id = ctx.params.id;
  const res = await fetch(`${BACKEND_URL}/blog/?id=${id}`);
  const ret = await res.json();

  const blog = ret["Data"][0];
  return {
    props: {
      blog: blog,
    },
  };
};

export default BlogUpdate;
