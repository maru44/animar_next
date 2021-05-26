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
  const ret: { [key: string]: number } = await res.json();
  const status = ret["Status"];

  return status;
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
  const ret = await res.json();

  return ret;
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
  const ret = await res.json();
  console.log(ret);

  return ret;
};

export const fetchCurrentUser = async () => {
  try {
    const ret = await getUserModelFromCookie();
    if (ret["Status"] === 4001) {
      await RefreshToken();
      const ret = await getUserModelFromCookie();
      if (ret["Status"] === 4002) {
        return null;
      }
      const user: TUser = ret["User"];
      user.isVerify = ret["IsVerify"];
      return user;
    } else if (ret["Status"] === 200) {
      const user: TUser = ret["User"];
      user.isVerify = ret["IsVerify"];
      return user;
    } else if (ret["Status"] === 4002) {
      return null;
    }
  } catch (e) {
    console.log(e);
  }
};

export const fetchUpdateProfile = async (e: any) => {
  let formData = new FormData();
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
