import { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import { BACKEND_URL, DEFAULT_USER_IMAGE } from "../../helper/Config";
import { TWatchJoinAnime } from "../../types/anime";
import Link from "next/link";

import { watchStateList } from "../../helper/WatchHelper";
import { TUser } from "../../types/auth";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { fetchUserModel } from "../../helper/UserHelper";
import AuthorZone from "../../components/AuthorZone";
import { pageBaseProps } from "../../types/page";

type Props = {
  watches: TWatchJoinAnime[];
} & pageBaseProps;

interface Params extends ParsedUrlQuery {
  uid: string;
}

const UsersWatch: NextPage<Props> = (props) => {
  const [selectShow, setSelectShow] = useState<number>(null);
  const [showWatches, setShowWatches] = useState(props.watches);
  const { isAuthChecking, CurrentUser } = useCurrentUser();

  const scopeState = (e: any) => {
    const id = parseInt(e.target.dataset.id);
    setSelectShow(id);
  };

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
        <div className="content mla mra">
          <div className="authorZone">
            <AuthorZone author={author} currentUser={CurrentUser}></AuthorZone>
          </div>
          <div className="mt40 flexNormal watchStateZone spBw">
            {watchStateList &&
              watchStateList.map((st, index) => (
                <div
                  className={
                    selectShow !== null && selectShow == index
                      ? "watchStateBtn flexCen selected"
                      : "watchStateBtn flexCen"
                  }
                  data-id={index}
                  onClick={scopeState}
                  key={index}
                >
                  {st}
                </div>
              ))}
          </div>
          <div className="watchListArea flexNormal alCen spBw flexWrap mt40">
            {showWatches &&
              showWatches.map(
                (watch, index) =>
                  (selectShow === null || selectShow === watch.state) && (
                    <div
                      className={`aWatch hrefBox mb10 watch_${watch.state}`}
                      key={index}
                    >
                      <span></span>
                      <p className="brAll flex1 ml20">{watch.title}</p>
                      <Link
                        href="/anime/[slug]"
                        as={`/anime/${watch.slug}`}
                        passHref
                      >
                        <a className="hrefBoxIn"></a>
                      </Link>
                    </div>
                  )
              )}
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
  const res = await fetch(`${BACKEND_URL}/watch/u/?user=${uid}`);
  const ret = await res.json();

  const data = ret["data"];
  return {
    props: {
      watches: data,
      kind: "user",
      list: 1,
      uid: uid,
      title: "見ているアニメ",
    },
  };
};

export default UsersWatch;
