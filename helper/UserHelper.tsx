import { BACKEND_URL } from "./Config";

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

export const RefreshToken = async () => {
  const res = await fetch(`${BACKEND_URL}/auth/refresh/`, {
    method: "GET",
    mode: "cors",
    credentials: "include",
  });
};
