import { NextPage } from "next";
import { BACKEND_URL } from "../../helper/Config";
import { SetJWTCookie, RefreshToken } from "../../helper/UserHelper";

const Login: NextPage = () => {
  const loginStart = async (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const ret = await SetJWTCookie(email, password);
    if (ret === 200) {
      console.log("success");
    } else {
      console.log("failed");
    }
  };

  const refreshStart = async (e: any) => {
    const res = await RefreshToken();
  };

  const getClaims = async (e: any) => {
    const res = await fetch(`${BACKEND_URL}/auth/cookie/`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    });
  };

  return (
    <div>
      <form onSubmit={loginStart}>
        <div className="">
          <label htmlFor="email">メールアドレス</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="">
          <label htmlFor="password">パスワード</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div className="">
          <button type="submit" className="">
            ログイン
          </button>
        </div>
        <div className="">
          <button type="button" onClick={refreshStart}>
            リフレッシュテスト
          </button>
        </div>
        <div className="">
          <button type="button" onClick={getClaims}>
            claim
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
