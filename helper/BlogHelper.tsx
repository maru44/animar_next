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
  content: string,
  animeIds: number[]
) => {
  const res = await fetch(`${BACKEND_URL}/blog/post/`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      title: title,
      abstract: abst,
      content: content,
      anime_ids: animeIds,
    }),
  });
  const ret = await res.json();

  return ret;
};

export const fetchDeleteBlog = async (id: string) => {
  const res = await fetch(`${BACKEND_URL}/blog/delete/?id=${id}`, {
    method: "DELETE",
    mode: "cors",
    credentials: "include",
  });
  const ret = await res.json();
  return ret;
};

export const fetchUpdateBlog = async (
  id: number,
  title: string,
  abst: string,
  content: string,
  animeIds: number[]
) => {
  const res = await fetch(`${BACKEND_URL}/blog/update/?id=${id}`, {
    method: "PUT",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      title: title,
      abstract: abst,
      content: content,
      anime_ids: animeIds,
    }),
  });
  const ret = await res.json();

  return ret;
};
