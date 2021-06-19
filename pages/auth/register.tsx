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
import { useRequireAnonymous } from "../../hooks/useRequireLogin";
import CurrentUserState from "../../states/CurrentUser";
import RuleModal from "../../components/RuleModal";

const Register: NextPage = () => {
  useRequireAnonymous();
  const [messages, setMessages] = useState<IMessage[]>(null);
  const [openRule, setOpenRule] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
  const setCurrentUser = useSetRecoilState(CurrentUserState);
  const router = useRouter();

  const closeRule = () => {
    setOpenRule(false);
  };
  const openRuleExe = () => {
    setOpenRule(true);
  };
  const changeAccept = (e: any) => {
    setIsAccept(e.target.checked);
  };

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
      const res = await fetchRegister(email, password, name);
      switch (res.status) {
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
            <div className="field mt20">
              <label htmlFor="dname">表示名</label>
              <input type="text" id="dname" name="dname" placeholder="任意" />
            </div>
            <div className="field mt20">
              <label htmlFor="password">パスワード</label>
              <input type="password" id="password" name="password" required />
            </div>
            <div className="field mt20">
              <label htmlFor="password2">確認用パスワード</label>
              <input type="password" id="password2" name="password2" required />
            </div>
            <div className="mt30 field">
              <input
                id="ruleInput"
                onClick={changeAccept}
                className="mr20"
                type="checkbox"
              />
              <a className="active" id="ruleOpen" onClick={openRuleExe}>
                利用規約
              </a>
              に同意します。
              <RuleModal open={openRule} closeFunc={closeRule}></RuleModal>
            </div>
            <div className="field mt20 wM500px">
              <button type="submit" className="floatR" disabled={!isAccept}>
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
