export type TPlatformAdmin = {
  ID: number;
  EngName: string;
  PlatName: string;
  BaseUrl: string;
  Image: string;
  IsValid: boolean;
  CreatedAt: string;
  UpdatedAt: string;
};

export type TRelationPlatform = {
  PlatformId: number;
  AnimeId: number;
  LinkUrl: string;
  CreatedAt: string;
  UpdatedAt: string;
};
