import { NextPage } from "next";
import { fetchRegister } from "../../helper/UserHelper";

const Register: NextPage = () => {
  const startRegister = async (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.dname.value;
    const ret = await fetchRegister(email, password, name);
    console.log(ret);
  };

  return (
    <div>
      <main>
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
            <div className="field mt10">
              <button type="submit" className="">
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
