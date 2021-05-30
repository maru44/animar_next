import { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { TBlog } from "../../../types/blog";
import ColumnElement from "../../../components/ColumnElement";
import { BACKEND_URL } from "../../../helper/Config";

interface Props {
  blogs: TBlog[];
  kind: string;
  list: number;
  uid: string;
}
interface Params extends ParsedUrlQuery {
  uid: string;
}

const UserColumn: NextPage<Props> = (props) => {
  const blogs = props.blogs;

  return (
    <div>
      <main>
        <div className="mla mra content">
          <div>
            {blogs &&
              blogs.map((blog, index) => (
                <ColumnElement column={blog} index={index}></ColumnElement>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async (
  ctx
) => {
  const uid = ctx.params.uid;
  const res = await fetch(`${BACKEND_URL}/blog/?u=${uid}`);
  const ret = await res.json();

  const blogs = ret["Data"];
  return {
    props: {
      blogs: blogs,
      kind: "user",
      list: 1,
      uid: uid,
    },
  };
};

export default UserColumn;
