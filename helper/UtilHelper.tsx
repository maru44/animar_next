import { BACKEND_URL } from "./Config";

export const fetchUploadImage = async (image: any) => {
  const formData = new FormData();
  formData.set("image", image);
  const res = await fetch(`${BACKEND_URL}/utils/s3/`, {
    method: "POST",
    mode: "cors",
    body: formData,
  });
  if (res.status === 200) {
    const ret = await res.json();
    return ret["data"];
  }
  return null;
};
