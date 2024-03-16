export type Category = {
  id: string
  name: string
  image: string
}
export type Art = {
  id: string
  ownerId: string
  title: string
  description: string
  artType: ArtType
  originUrl: string
  tags: string
  isPremium: boolean
  watermarked_url: string
  downloads: number
  likes: number
}
export enum ArtType {
  digital = 'digital',
  physical = 'physical'
}
