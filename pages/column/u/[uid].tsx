import { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { TBlog } from "../../../types/blog";
import ColumnElement from "../../../components/ColumnElement";
import { BACKEND_URL, DEFAULT_USER_IMAGE } from "../../../helper/Config";
import Link from "next/link";
import { TUser } from "../../../types/auth";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useEffect, useState } from "react";
import { fetchUserModel } from "../../../helper/UserHelper";
import AuthorZone from "../../../components/AuthorZone";
import { parseCookies } from "nookies";

interface Props {
  blogs: TBlog[];
  kind: string;
  list: number;
  uid: string;
  // ogp
  title: string;
  // ogImage: string;
}
interface Params extends ParsedUrlQuery {
  uid: string;
}

const UserColumn: NextPage<Props> = (props) => {
  const blogs = props.blogs;
  const { isAuthChecking, CurrentUser } = useCurrentUser();

  const [author, setAuthor] = useState<TUser>(undefined);
  useEffect(() => {
    (async () => {
      const uid = props.uid;
      if (uid) {
        const author = await fetchUserModel(uid);
        setAuthor(author);
      }
    })();
  }, []);

  return (
    <div>
      <main>
        <div className="mla mra content">
          <div className="authorZone">
            <AuthorZone author={author} currentUser={CurrentUser}></AuthorZone>
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
  const cookies = parseCookies(ctx);
  const res = await fetch(`${BACKEND_URL}/blog/?u=${uid}`, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({ token: cookies["idToken"] }),
  });
  const ret = await res.json();

  const blogs = ret["data"];

  return {
    props: {
      blogs: blogs,
      kind: "user",
      list: 3,
      uid: uid,
      title: "コラム一覧",
    },
  };
};

export default UserColumn;
