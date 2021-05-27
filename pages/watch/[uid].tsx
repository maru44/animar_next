import { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { useState } from "react";
import { BACKEND_URL } from "../../helper/Config";
import { TWatchJoinAnime } from "../../types/anime";
import Link from "next/link";

import { watchStateList } from "../../helper/WatchHelper";

interface Props {
  watches: TWatchJoinAnime[];
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

  const scopeState = (e: any) => {
    const id = parseInt(e.target.dataset.id);
    setSelectShow(id);
  };

  return (
    <div>
      <main>
        <div className="content mla mra">
          <div className="mt20 flexNormal watchStateZone spBw">
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
                  (selectShow === null || selectShow === watch.Watch) && (
                    <div
                      className={`aWatch hrefBox mt15 watch_${watch.Watch}`}
                      key={index}
                    >
                      {watch.Title}
                      <Link
                        href="/anime/[slug]"
                        as={`/anime/${watch.Slug}`}
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

  const data = ret["Data"];
  return {
    props: {
      watches: data,
      kind: "user",
      list: 3,
      uid: uid,
    },
  };
};

export default UsersWatch;
