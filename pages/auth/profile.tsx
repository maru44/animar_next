import { GetServerSideProps, NextPage } from "next";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { fetchUpdateProfile } from "../../helper/UserHelper";
import { useRequireLogin } from "../../hooks/useRequireLogin";
import React from "react";

// login required
const EditProfile: NextPage = (props) => {
  useRequireLogin();
  const { isAuthChecking, CurrentUser } = useCurrentUser();

  const startUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ret = await fetchUpdateProfile(e);
  };

  return (
    <div>
      <main>
        <div className="content mla mra">
          <form onSubmit={startUpdate} className="mla mra wM500px">
            <h2 className="pt20">プロフィール編集</h2>
            <div className="field mt20">
              <label htmlFor="dname">表示名</label>
              <input
                type="text"
                id="dname"
                name="dname"
                defaultValue={CurrentUser && CurrentUser.displayName}
              />
            </div>
            <div className="field mt20">
              <label htmlFor="image">プロフィール画像</label>
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                id="image"
                name="image"
              />
            </div>
            <div className="field mt40">
              <button type="submit" className="floatR">
                編集する
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditProfile;
