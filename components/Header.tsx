import { useEffect, useRef, useState } from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";
import Link from "next/link";
import MessageComponent, { IMessage } from "./Message";
import ListHeader from "./ListHeader";
import UserHeader from "./UserHeader";
import AdminHeader from "./Admin/AdminHeader";
import { DEFAULT_USER_IMAGE } from "../helper/Config";

interface Props {
  kind?: string;
  list?: number;
  uid?: string;
}

const Header: React.FC<Props> = (props) => {
  const { isAuthChecking, CurrentUser } = useCurrentUser();
  const initialMess: IMessage = {
    title: "ini",
    content: "メールを確認して認証を完了してください。",
  };
  const [messages, setMessages] = useState<IMessage[]>(null);

  const tabList = useRef(null);

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
    <>
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
                    : { backgroundImage: `url(${DEFAULT_USER_IMAGE})` }
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
          <div className="ml20">
            <span className="toPostPage hrefBox">
              Column +
              <Link href="/column/post" passHref>
                <a className="hrefBoxIn"></a>
              </Link>
            </span>
          </div>
        </div>
        {props.kind && props.kind === "user" && (
          <UserHeader uid={props.uid} list={props.list}></UserHeader>
        )}
        {props.kind && props.kind === "admin" && (
          <AdminHeader list={props.list}></AdminHeader>
        )}
        {!props.kind && <ListHeader list={props.list}></ListHeader>}
        <MessageComponent messages={messages}></MessageComponent>
      </header>
    </>
  );
};

export default Header;
