import { NextPage } from "next";
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
    const name = e.target.dname.value;
    const ret = await fetchRegister(email, password, name);
    if (ret["Status"] === 200) {
      const CurrentUser = await fetchCurrentUser();
      setCurrentUser(CurrentUser);
      setMessages(null);
      router.push("/anime");
    } else {
      setMessages(null);
      const mess: IMessage = {
        title: "ユーザーの作成に失敗しました",
        content: "お手数をおかけしますがもう一度お願いいたします。",
      };
      messages ? setMessages(addMessage(mess, messages)) : setMessages([mess]);
    }
  };

  return (
    <div>
      <main>
        <MessageComponent messages={messages}></MessageComponent>
        <div className="content mla mra">
          <form onSubmit={startRegister}>
            <div className="field">
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
            <div className="field mt10 wM500px">
              <button type="submit" className="floatR">
                登録する
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Register;
