import { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { useState } from "react";
import { BACKEND_URL, DEFAULT_USER_IMAGE } from "../../helper/Config";
import { TWatchJoinAnime } from "../../types/anime";
import Link from "next/link";

import { watchStateList } from "../../helper/WatchHelper";
import { TUser } from "../../types/auth";
import { useCurrentUser } from "../../hooks/useCurrentUser";

interface Props {
  watches: TWatchJoinAnime[];
  user: TUser;
  kind: string;
  list: number;
  uid: string;
}
interface Params extends ParsedUrlQuery {
  uid: string;
}

const UsersWatch: NextPage<Props> = (props) => {
  const [selectShow, setSelectShow] = useState<number>(null);
  const [showWatches, setShowWatches] = useState(props.watches);
  const user = props.user;
  const { isAuthChecking, CurrentUser } = useCurrentUser();

  const scopeState = (e: any) => {
    const id = parseInt(e.target.dataset.id);
    setSelectShow(id);
  };

  return (
    <div>
      <main>
        <div className="content mla mra">
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

  const resU = await fetch(`${BACKEND_URL}/auth/user/?uid=${uid}`);
  const retU = await resU.json();

  const data = ret["data"];
  const user = retU["user"];
  return {
    props: {
      watches: data,
      user: user,
      kind: "user",
      list: 3,
      uid: uid,
    },
  };
};

export default UsersWatch;
