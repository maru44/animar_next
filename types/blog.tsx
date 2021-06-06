import { TUser } from "./auth";

export type TBlog = {
  ID: number;
  Slug: string;
  Title: string;
  Abstract: string;
  Content: string;
  UserId: string;
  CreatedAt: string;
  UpdatedAt: string;
  Animes: TMinAnime[];
};

export type TBlogJoinUser = {
  ID: number;
  Slug: string;
  Title: string;
  Abstract: string;
  Content: string;
  UserId: string;
  CreatedAt: string;
  UpdatedAt: string;
  Animes: TMinAnime[];
  User: TUser;
};

export type TMinAnime = {
  AnimeId: number;
  Slug: string;
  Title: string;
};
