import { NextPage } from "next";
import Header from "../../components/Header";
import { BACKEND_URL } from "../../helper/Config";
import { fetchRegister } from "../../helper/UserHelper";

const Register: NextPage = () => {
  const startRegister = async (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const ret = await fetchRegister(email, password);
    console.log(ret);
  };

  return (
    <div>
      <Header></Header>
      <main>
        <div className="content mla mra">
          <form onSubmit={startRegister}>
            <div className="field">
              <label htmlFor="email">メールアドレス</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="field mt10">
              <label htmlFor="password">パスワード</label>
              <input type="password" id="password" name="password" required />
            </div>
            <div className="field mt10">
              <button type="submit" className="">
                ログイン
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Register;
