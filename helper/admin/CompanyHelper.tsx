import { BACKEND_URL } from "../Config";

export const InsertCompany = async (
  name: string,
  eng: string,
  url: string,
  twitter: string,
  explanation: string
) => {
  const res = await fetch(`${BACKEND_URL}/admin/company/post/`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    body: JSON.stringify({
      name: name,
      eng_name: eng,
      official_url: url,
      twitter_account: twitter,
      explanation: explanation,
    }),
  });
  return res;
};

export const fetchCompanies = async () => {
  const res = await fetch(`${BACKEND_URL}/company/`, {
    method: "GET",
    mode: "cors",
    credentials: "include",
  });
  return res;
};
