import { NextPage } from "next";
import { useRef } from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";
import Link from "next/link";

interface Props {
  what?: number;
}

const Header: NextPage<Props> = (props) => {
  const { isAuthChecking, CurrentUser } = useCurrentUser();
  console.log(CurrentUser);

  const tabList = useRef(null);

  /*
    if (props.what) {
        if (tabList.current !== null) {
            tabList.current.children[props.what - 1].classList.add("now");
        }
    }
    */

  return (
    <header>
      <div className="headerCon w100 alCen flexNormal">
        <div className="headerTop hrefBox">
          LoveAni.me
          <Link href="/anime" passHref>
            <a className="hrefBoxIn"></a>
          </Link>
        </div>
        <div className="headerUserArea mla">
          {CurrentUser ? (
            <div
              className="imgCircle mla hrefBox"
              style={
                CurrentUser.PhotoURL
                  ? { backgroundImage: `url(${CurrentUser.PhotoURL})` }
                  : { backgroundImage: `url(/anonymous.png)` }
              }
            ></div>
          ) : (
            <div>
              ログイン
              <Link href="/auth/login" passHref>
                <a className="hrefBoxIn"></a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
