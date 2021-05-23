import { BACKEND_URL } from "./Config";

interface TBlogInput {
  Title: string;
  Abstract: string;
  Content: string;
  UserId: string;
}

export const fetchPostBlog = async (
  title: string,
  abst: string,
  content: string
) => {
  const res = await fetch(`${BACKEND_URL}/blog/post/`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      Title: title,
      Abstract: abst,
      Content: content,
    }),
  });
  const ret = await res.json();
  console.log(ret);

  return ret["ID"];
};
