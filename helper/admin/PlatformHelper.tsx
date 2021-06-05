import { BACKEND_URL } from "../Config";

export const fetchInsertPlatform = async (
  engName: string,
  platName: string,
  baseUrl: string,
  image: any,
  isValid: string
) => {
  const formData = new FormData();
  formData.set("engName", engName);
  formData.set("platName", platName);
  formData.set("baseUrl", baseUrl);
  image[0] && formData.set("image", image[0]);
  formData.set("valid", isValid);
  const res = await fetch(`${BACKEND_URL}/admin/platform/post/`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    body: formData,
  });
  const ret = await res.json();
  return ret;
};

export const fetchUpdatePlatform = async (
  engName: string,
  platName: string,
  baseUrl: string,
  image: any,
  isValid: string,
  id: number
) => {
  const formData = new FormData();
  formData.set("engName", engName);
  formData.set("platName", platName);
  formData.set("baseUrl", baseUrl);
  image[0] && formData.set("image", image[0]);
  formData.set("valid", isValid);
  const res = await fetch(`${BACKEND_URL}/admin/platform/update/?id=${id}`, {
    method: "PUT",
    mode: "cors",
    credentials: "include",
    body: formData,
  });
  const ret = await res.json();
  return ret;
};
