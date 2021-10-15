import { BACKEND_URL } from '../Config';

export const fetchInsertPlatform = async (
  engName: string,
  platName: string,
  baseUrl: string,
  image: any,
  isValid: string
) => {
  const formData = new FormData();
  formData.set('engName', engName);
  formData.set('platName', platName);
  formData.set('baseUrl', baseUrl);
  image[0] && formData.set('image', image[0]);
  formData.set('valid', isValid);
  const res = await fetch(`${BACKEND_URL}/admin/platform/post/`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
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
  formData.set('engName', engName);
  formData.set('platName', platName);
  formData.set('baseUrl', baseUrl);
  image[0] && formData.set('image', image[0]);
  formData.set('valid', isValid);
  const res = await fetch(`${BACKEND_URL}/admin/platform/update/?id=${id}`, {
    method: 'PUT',
    mode: 'cors',
    credentials: 'include',
    body: formData,
  });
  const ret = await res.json();
  return ret;
};

export const fetchRelationPlatform = async (id: number) => {
  const res = await fetch(`${BACKEND_URL}/relation/plat/?id=${id}`, {
    mode: 'cors',
    credentials: 'include',
  });
  return res;
};

export const fetchInsertRelationPlatform = async (
  animeId: number,
  platId: number,
  linkUrl: string,
  interval: string,
  first_broadcast: string
) => {
  const res = await fetch(`${BACKEND_URL}/admin/relation/plat/post/`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify({
      anime_id: animeId,
      platform_id: platId,
      link_url: linkUrl,
      interval: interval != '' ? interval : null,
      first_broadcast: first_broadcast != '' ? first_broadcast : null,
    }),
  });
  return res;
};

export const fetchDeleteRelationPlatform = async (
  animeId: number,
  platformId: string
) => {
  const res = await fetch(
    `${BACKEND_URL}/admin/relation/plat/delete/?anime=${animeId}&platform=${platformId}`,
    {
      method: 'DELETE',
      mode: 'cors',
      credentials: 'include',
    }
  );
  const ret = await res.json();
};

export const listInterval: string[] = ['monthly', 'weekly', 'dayly', 'once'];
