import { NextPage } from "next";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import Header from "../../components/Header";
import { BACKEND_URL } from "../../helper/Config";
import {
  SetJWTCookie,
  RefreshToken,
  fetchCurrentUser,
} from "../../helper/UserHelper";
import CurrentUserState from "../../states/CurrentUser";

const Login: NextPage = () => {
  const setCurrentUser = useSetRecoilState(CurrentUserState);
  const router = useRouter();

  const loginStart = async (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const ret = await SetJWTCookie(email, password);
    if (ret === 200) {
      const currentUser = await fetchCurrentUser();
      setCurrentUser(currentUser);
      router.push("/anime");
    } else {
      console.log("failed");
    }
  };

  return (
    <div>
      <main>
        <div className="content mla mra">
          <form onSubmit={loginStart}>
            <div className="field">
              <label htmlFor="email">メールアドレス</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="field mt20">
              <label htmlFor="password">パスワード</label>
              <input type="password" id="password" name="password" required />
            </div>
            <div className="mt10 wM500px">
              <button type="submit" className="floatR">
                ログイン
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
