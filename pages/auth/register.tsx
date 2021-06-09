import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import MessageComponent, {
  addMessage,
  IMessage,
} from "../../components/Message";
import { fetchCurrentUser, fetchRegister } from "../../helper/UserHelper";
import CurrentUserState from "../../states/CurrentUser";

const Register: NextPage = () => {
  const [messages, setMessages] = useState<IMessage[]>(null);
  const setCurrentUser = useSetRecoilState(CurrentUserState);
  const router = useRouter();

  const startRegister = async (e: any) => {
    e.preventDefault();

    const mess: IMessage = { title: "Now loading ..." };
    messages ? setMessages(addMessage(mess, messages)) : setMessages([mess]);

    const email = e.target.email.value;
    const password = e.target.password.value;
    const password2 = e.target.password2.value;
    const name = e.target.dname.value;
    // if password not correspond
    if (password !== password2) {
      setMessages(null);
      const mess: IMessage = {
        title: "パスワードが一致しません",
        content: "お手数をおかけしますがもう一度お願いいたします。",
      };
      messages ? setMessages(addMessage(mess, messages)) : setMessages([mess]);
    } else {
      const ret = await fetchRegister(email, password, name);
      switch (ret["status"]) {
        case 200:
          const CurrentUser = await fetchCurrentUser();
          setCurrentUser(CurrentUser);
          setMessages(null);
          router.push("/anime");
          break;
        default:
          setMessages(null);
          const mess: IMessage = {
            title: "ユーザーの作成に失敗しました",
            content: "お手数をおかけしますがもう一度お願いいたします。",
          };
          messages
            ? setMessages(addMessage(mess, messages))
            : setMessages([mess]);
          break;
      }
    }
    return;
  };

  return (
    <div>
      <main>
        <MessageComponent messages={messages}></MessageComponent>
        <div className="content mla mra">
          <form onSubmit={startRegister} className="mla mra wM500px">
            <h2 className="pt20">会員登録</h2>
            <div className="field mt20">
              <label htmlFor="email">メールアドレス</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="field mt10">
              <label htmlFor="dname">表示名</label>
              <input type="text" id="dname" name="dname" placeholder="任意" />
            </div>
            <div className="field mt10">
              <label htmlFor="password">パスワード</label>
              <input type="password" id="password" name="password" required />
            </div>
            <div className="field mt10">
              <label htmlFor="password2">確認用パスワード</label>
              <input type="password" id="password2" name="password2" required />
            </div>
            <div className="field mt10 wM500px">
              <button type="submit" className="floatR">
                登録する
              </button>
            </div>
            <div className="mt100">
              <Link href="/auth/login" passHref>
                <a className="">ログイン</a>
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Register;
