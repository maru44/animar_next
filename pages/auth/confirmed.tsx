import { NextPage } from "next";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { fetchCurrentUser, RefreshToken } from "../../helper/UserHelper";
import { CurrentUserState } from "../../states/CurrentUser";
import { useRouter } from "next/router";

const Confirmed: NextPage = () => {
  const setCurrentUser = useSetRecoilState(CurrentUserState);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const CurrentUser = await fetchCurrentUser();
      if (CurrentUser && CurrentUser.isVerify) {
        router.push("/anime");
      } else {
        await RefreshToken();
        const CurrentUser = await fetchCurrentUser();
        setCurrentUser(CurrentUser);
        router.reload();
      }
    })();
  }, []);

  return <div></div>;
};

export default Confirmed;
