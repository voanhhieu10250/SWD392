export type Category = {
  id: string;
  name: string;
  image: string;
};

export type Art = {
  id: number;
  ownerId: number;
  title: string;
  description: string;
  artType: string;
  originUrl: string;
  tags: string;
  isPremium: boolean;
  watermarked_url: string;
  downloads: number;
  likes: number;
};
