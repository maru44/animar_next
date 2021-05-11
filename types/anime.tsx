export type TAnime = {
  ID: number;
  Slug: string;
  Title: string;
  Content: string;
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
