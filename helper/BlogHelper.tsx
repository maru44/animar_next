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
  animeIds: number[],
  isPublic: boolean
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
      is_public: isPublic,
    }),
  });
  return res;
};

export const fetchDeleteBlog = async (id: string) => {
  const res = await fetch(`${BACKEND_URL}/blog/delete/?id=${id}`, {
    method: "DELETE",
    mode: "cors",
    credentials: "include",
  });
  return res;
};

export const fetchUpdateBlog = async (
  id: number,
  title: string,
  abst: string,
  content: string,
  animeIds: number[],
  isPublic: boolean
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
      is_public: isPublic,
    }),
  });
  return res;
};

export const fetchUploadImageColumn = async (image: any) => {
  const formData = new FormData();
  formData.set("image", image);
  const res = await fetch(`${BACKEND_URL}/blog/image/`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    body: formData,
  });
  if (res.status === 200) {
    const ret = await res.json();
    return ret["data"];
  }
  return null;
};
