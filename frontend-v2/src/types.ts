export type Category = {
  id: string;
  name: string;
  image: string;
};

export enum ArtType {
  digital = "digital",
  physical = "physical",
}

export type Art = {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  artType: ArtType;
  originUrl: string;
  tags: string;
  isPremium: boolean;
  watermarked_url: string;
  downloads: number;
  likes: number;
};

export type User = {
  id: string;
  name: string;
};