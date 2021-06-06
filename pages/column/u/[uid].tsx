import { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { TBlog } from "../../../types/blog";
import ColumnElement from "../../../components/ColumnElement";
import { BACKEND_URL, DEFAULT_USER_IMAGE } from "../../../helper/Config";
import Link from "next/link";
import { TUser } from "../../../types/auth";
import { useCurrentUser } from "../../../hooks/useCurrentUser";

interface Props {
  blogs: TBlog[];
  user: TUser;
  kind: string;
  list: number;
  uid: string;
}
interface Params extends ParsedUrlQuery {
  uid: string;
}

const UserColumn: NextPage<Props> = (props) => {
  const blogs = props.blogs;
  const user = props.user;
  const { isAuthChecking, CurrentUser } = useCurrentUser();

  return (
    <div>
      <main>
        <div className="mla mra content">
          <div className="authorZone">
            {user && user.displayName && (
              <div className="mt10 flexNormal alCen">
                <div
                  className="imgCircle"
                  style={
                    user.photoUrl
                      ? { backgroundImage: `url(${user.photoUrl})` }
                      : { backgroundImage: `url(${DEFAULT_USER_IMAGE})` }
                  }
                ></div>
                <p>{user.displayName}</p>
                {CurrentUser && CurrentUser.rawId === user.rawId && (
                  <h4 className="hrefBox mla">
                    Edit
                    <Link href="/auth/profile" passHref>
                      <a className="hrefBoxIn"></a>
                    </Link>
                  </h4>
                )}
              </div>
            )}
          </div>
          <div className="mt40">
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

  const resU = await fetch(`${BACKEND_URL}/auth/user/?uid=${uid}`);
  const retU = await resU.json();

  const blogs = ret["data"];
  const user = retU["user"];
  return {
    props: {
      blogs: blogs,
      user: user,
      kind: "user",
      list: 1,
      uid: uid,
    },
  };
};

export default UserColumn;
