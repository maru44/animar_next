import { BACKEND_URL } from "../../helper/Config";

export const fetchPostStaff = async (
  familyName: string,
  givenName: string,
  engName: string
) => {
  const res = await fetch(`${BACKEND_URL}/admin/staff/post/`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    body: JSON.stringify({
      family_name: familyName,
      given_name: givenName,
      eng_name: engName,
    }),
  });
  return res;
};

export const fetchAllStaff = async () => {
  const res = await fetch(`${BACKEND_URL}/staff/`, {
    method: "GET",
    mode: "cors",
    credentials: "include",
  });
  return res;
};
