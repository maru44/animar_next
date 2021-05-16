import { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { useState } from "react";
import { BACKEND_URL } from "../../helper/Config";
import { TWatchJoinAnime } from "../../types/anime";

import Header from "../../components/Header";
import Link from "next/link";

interface Props {
  watches: TWatchJoinAnime[];
}
interface Params extends ParsedUrlQuery {
  uid: string;
}

const UsersWatch: NextPage<Props> = (props) => {
  const [showWatches, setShowWatches] = useState(props.watches);
  return (
    <div>
      <Header></Header>
      <main>
        <div className="content mla mra">
          <div className="changeWatchStates"></div>
          <div className="watchListArea flexNormal alCen spBw flexWrap">
            {showWatches &&
              showWatches.map((watch, index) => (
                <div
                  className={`aWatch hrefBox mt10 watch_${watch.Watch}`}
                  key={index}
                >
                  {watch.Title}
                  {watch.Watch}
                  <Link
                    href="/anime/[slug]"
                    as={`/anime/${watch.Slug}`}
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
    },
  };
};

export default UsersWatch;
