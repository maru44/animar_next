import "firebase/auth";
import { GoogleLogin } from "../helper/Firebase";
import { useSetRecoilState } from "recoil";
import CurrentUserState from "../states/CurrentUser";
import { TUser } from "../types/auth";

const GoogleOauth: React.FC = () => {
  const setCurrentUser = useSetRecoilState(CurrentUserState);

  const login = async () => {
    const ret: any = await GoogleLogin();
    if (ret) {
      const User: TUser = {
        displayName: ret["displayName"],
        email: ret["email"],
        phoneNumber: ret["phoneNumber"],
        photoUrl: ret["photoURL"],
        providerId: "google.com",
        rawId: ret["uid"],
        isVerify: ret["emailVerified"],
      };
      setCurrentUser(User);
    }
  };
  return (
    <div>
      <button className="w100 googleLoginBtn" onClick={login}>
        Googleでログインする
      </button>
    </div>
  );
};

export default GoogleOauth;
