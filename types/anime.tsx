import { TUser } from "./auth";

export type TAnime = {
  id: number;
  slug: string;
  title: string;
  thumb_url?: string;
  abbribation?: string;
  description?: string;
  copyright?: string;
  series_id: number;
  state: string;
  count_episodes?: string;
  created_at: string;
  updated_at: string;
};

export type TReview = {
  id: number;
  content: string;
  rating: number;
  anime_id: number;
  created_at: string;
  updated_at: string;
  user_id: string;
};

export type TWatchCount = {
  state: number;
  count: number;
};

export type TWatchJoinAnime = {
  state: number;
  anime_id: number;
  user_id: string;
  created_at: string;
  updated_at: string;
  title: string;
  slug: string;
  description: string;
  anime_state: string;
};

export type TReviewJoinAnime = {
  id: number;
  content: string;
  rating: number;
  anime_id: number;
  user_id: string;
  created_at: string;
  updated_at: string;
  title: string;
  slug: string;
  anime_content: string;
  anime_state: string;
};

export type TAnimeMinimum = {
  id: number;
  title: string;
  slug?: string;
};

export type TAnimeAdmin = {
  id: number;
  slug: string;
  title: string;
  abbreviation: string;
  kana: string;
  copyright: string;
  eng_name: string;
  thumb_url: string;
  description: string;
  state: string;
  series_id: number;
  count_episodes: string;
  created_at: string;
  updated_at: string;
};

export type TSeries = {
  id: number;
  eng_name: string;
  series_name: string;
  created_at: string;
  updated_at: string;
};
