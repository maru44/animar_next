import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { BACKEND_URL } from "../../helper/Config";
import {
  SetJWTCookie,
  RefreshToken,
  fetchCurrentUser,
} from "../../helper/UserHelper";
import { useRequireAnonymous } from "../../hooks/useRequireLogin";
import GoogleOauth from "../../components/GoogleOauth";
import CurrentUserState from "../../states/CurrentUser";
import Header from "../../components/Header";
import LocalMessage from "../../components/LocalMessage";
import React, { useState } from "react";

const Login: NextPage = () => {
  useRequireAnonymous();
  const setCurrentUser = useSetRecoilState(CurrentUserState);
  const router = useRouter();

  const [mess, setMess] = useState<string[]>(null);

  const loginStart = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMess(["ログイン中です。"]);
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    const ret = await SetJWTCookie(email, password);
    if (ret === 200) {
      const currentUser = await fetchCurrentUser();
      setCurrentUser(currentUser);
      router.push("/anime");
    } else {
      setMess(["ログインに失敗しました。emailとパスワードをご確認ください。"]);
    }
  };

  return (
    <div>
      <main>
        <div className="content mla mra">
          <form onSubmit={loginStart} className="mla mra wM500px">
            <h2 className="pt20">ログイン</h2>
            <div className="field mt20">
              <label htmlFor="email">メールアドレス</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="field mt20">
              <label htmlFor="password">パスワード</label>
              <input type="password" id="password" name="password" required />
            </div>
            <div className="mt20">
              <button type="submit" className="floatR">
                ログイン
              </button>
            </div>
            <div className="mt60">
              <LocalMessage message={mess}></LocalMessage>
            </div>
            <div className="mt100">
              <Link href="/auth/register" passHref>
                <a className="">新規登録</a>
              </Link>
            </div>
          </form>
          <div className="mt60 wM500px mla mra">
            <GoogleOauth></GoogleOauth>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
