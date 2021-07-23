import { BACKEND_URL } from "../Config";

export const fetchPostRole = async (num: number, roleName: string) => {
  const res = await fetch(`${BACKEND_URL}/admin/role/post/`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    body: JSON.stringify({ num: num, role: roleName }),
  });
  return res;
};

export const fetchAllRole = async () => {
  const res = await fetch(`${BACKEND_URL}/admin/role/`, {
    method: "GET",
    mode: "cors",
    credentials: "include",
  });
  return res;
};
