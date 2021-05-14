export type TAnime = {
  ID: number;
  Slug: string;
  Title: string;
  Content: string;
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
};

export type TWatchCount = {
  State: number;
  Count: number;
};
