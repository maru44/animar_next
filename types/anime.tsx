import { TUser } from "./auth";

export type TAnime = {
  ID: number;
  Slug: string;
  Title: string;
  ThumbUrl: string;
  Abbribation: string;
  Content: string;
  SeriesId: number;
  Season: string;
  OnAirState: number;
  CreatedAt: string;
  UpdatedAt: string;
};

export type TReview = {
  ID: number;
  Content: string;
  Star: number;
  AnimeId: number;
  CreatedAt: string;
  UpdatedAt: string;
  UserId: string;
  User: TUser;
};

export type TWatchCount = {
  State: number;
  Count: number;
};

export type TWatchJoinAnime = {
  Watch: number;
  AnimeId: number;
  UserId: string;
  CreatedAt: string;
  UpdatedAt: string;
  Title: string;
  Slug: string;
  Content: string;
  OnAirState: number;
};

export type TReviewJoinAnime = {
  ID: number;
  Content: string;
  Star: number;
  AnimeId: number;
  UserId: string;
  CreatedAt: string;
  UpdatedAt: string;
  Title: string;
  Slug: string;
  AnimeContent: string;
  OnAirState: string;
};

export type TAnimeMinimum = {
  ID: number;
  Title: string;
  Slug?: string;
};

export type TAnimeAdmin = {
  ID: number;
  Slug: string;
  Title: string;
  Abbreviation: string;
  Kana: string;
  EngName: string;
  ThumbUrl: string;
  Content: string;
  OnAirState: number;
  SeriesId: number;
  Season: string;
  Stories: string;
  CreatedAt: string;
  UpdatedAt: string;
};

export type TSeries = {
  ID: number;
  EngName: string;
  SeriesName: string;
  CreatedAt: string;
  UpdatedAt: string;
};
