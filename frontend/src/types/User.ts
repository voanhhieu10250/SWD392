export interface User {
  id: number
  username: string
  email: string
  avatar: string
  role: string
  backgroundColor: string
  bannerImg: string
  about: string
  isBanned: boolean
  isPremiumAudience: boolean
  isCreator: boolean
}
export interface TopCreator {
  id: string
  name: string
  avatar: string
  download: number
  uploadFile: number
  followers: number
}
