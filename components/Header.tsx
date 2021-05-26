import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";
import Link from "next/link";
import MessageComponent, { IMessage } from "./Message";
import ListHeader from "./ListHeader";

interface Props {
  what?: number;
  list?: number;
}

const Header: NextPage<Props> = (props) => {
  const { isAuthChecking, CurrentUser } = useCurrentUser();
  const initialMess: IMessage = {
    title: "ini",
    content: "メールを確認して認証を完了してください。",
  };
  const [messages, setMessages] = useState<IMessage[]>(null);
  console.log(CurrentUser);

  const tabList = useRef(null);

  /*
    if (props.what) {
        if (tabList.current !== null) {
            tabList.current.children[props.what - 1].classList.add("now");
        }
    }
    */

  useEffect(() => {
    if (CurrentUser && !CurrentUser.isVerify) {
      const messages: IMessage = {
        title: "メール認証が終了していません",
        content: "メールを確認して認証を完了してください。",
      };
      setMessages([messages]);
    }
  }, [CurrentUser]);

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
                CurrentUser.photoUrl
                  ? { backgroundImage: `url(${CurrentUser.photoUrl})` }
                  : { backgroundImage: `url(/anonymous.png)` }
              }
            >
              <Link href="/watch/[uid]" as={`/watch/${CurrentUser.rawId}`}>
                <a className="hrefBoxIn"></a>
              </Link>
            </div>
          ) : (
            <div className="hrefBox">
              ログイン
              <Link href="/auth/login" passHref>
                <a className="hrefBoxIn"></a>
              </Link>
            </div>
          )}
        </div>
      </div>
      <ListHeader list={props.list}></ListHeader>
      <MessageComponent messages={messages}></MessageComponent>
    </header>
  );
};

export default Header;
