export type TPlatformAdmin = {
  id: number;
  eng_name: string;
  plat_name: string;
  base_url: string;
  image: string;
  is_valid: boolean;
  created_at: string;
  updated_at: string;
};

export type TRelationPlatform = {
  platform_id: number;
  anime_id: number;
  link_url: string;
  created_at: string;
  updated_at: string;
};
