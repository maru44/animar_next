import { TUser } from "../types/auth";
import { BACKEND_URL } from "./Config";

// set cookie by inputed email and password
export const SetJWTCookie = async (email: string, password: string) => {
  const res = await fetch(`${BACKEND_URL}/auth/login/post/`, {
    method: "POST",
    mode: "cors",
    credentials: "include", // responseからset-cookieを受け取るために必要
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({ Email: email, Password: password }),
  });
  return res.status;
};

export const fetchRegister = async (
  email: string,
  password: string,
  name: string
) => {
  const res = await fetch(`${BACKEND_URL}/auth/register/`, {
    method: "POST",
    mode: "cors",
    credentials: "include", // responseからset-cookieを受け取るために必要
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      Email: email,
      Password: password,
      DisplayName: name,
    }),
  });
  return res;
};

// refresh idToken by refreshToken
export const RefreshToken = async () => {
  const res = await fetch(`${BACKEND_URL}/auth/refresh/`, {
    method: "GET",
    mode: "cors",
    credentials: "include",
  });
};

// get user model from idToken(cookie)
export const getUserModelFromCookie = async () => {
  const res = await fetch(`${BACKEND_URL}/auth/user/cookie/`, {
    method: "GET",
    mode: "cors",
    credentials: "include",
  });
  return res;
};

export const fetchCurrentUser = async () => {
  try {
    const res = await getUserModelFromCookie();
    if (res.status !== 200) {
      await RefreshToken();
      const resAgain = await getUserModelFromCookie();
      const ret = await resAgain.json();
      const user: TUser = ret["user"];
      user.isVerify = ret["is_verify"];
      return user;
    } else {
      const ret = await res.json();
      const user: TUser = ret["user"];
      user.isVerify = ret["is_verify"];
      return user;
    }
  } catch (e) {
    return null;
  }
};

export const fetchUpdateProfile = async (e: any) => {
  const formData = new FormData();
  formData.set("dname", e.target.dname.value);
  if (e.target.image.files.length !== 0) {
    formData.set("image", e.target.image.files[0]);
  }

  const res = await fetch(`${BACKEND_URL}/auth/profile/update/`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    body: formData,
  });
  const ret = await res.json();
  return ret;
};

export const fetchUserModel = async (uid: string) => {
  const res = await fetch(`${BACKEND_URL}/auth/user/?uid=${uid}`);
  if (res.status === 200) {
    const ret = await res.json();
    return ret["user"];
  }
  return null;
};
