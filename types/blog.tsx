import { TUser } from "./auth";

export type TBlog = {
  id: number;
  slug: string;
  title: string;
  abstract: string;
  content: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  animes: TMinAnime[];
};

export type TBlogJoinUser = {
  id: number;
  slug: string;
  title: string;
  abstract: string;
  content: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  animes: TMinAnime[];
  User: TUser;
};

export type TMinAnime = {
  anime_id: number;
  slug: string;
  title: string;
};
