import { User } from '~/types/User.ts'

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
  watermarkedUrl: string
  downloads: number
  likes: number
}
export enum ArtType {
  digital = 'digital',
  physical = 'physical'
}

export interface ResponseObj<T> {
  status: number
  msg: null | string
  data: T
}

export interface PageResponse<T> {
  content: T[]
  pageable: {
    pageNumber: number
    pageSize: number
    sort: {
      empty: boolean
      sorted: boolean
      unsorted: boolean
    }
    offset: number
    paged: boolean
    unpaged: boolean
  }
  last: boolean
  totalElements: number
  totalPages: number
  size: number
  number: number
  sort: {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
  first: boolean
  numberOfElements: number
  empty: boolean
}

export type ResellTransaction = {
  id: number
  amount: bigint
  date: Date
  transactionFee: number
  art: Art
  buyerUser: User
  sellerUser: User
}

export enum PreOrderStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED'
}

export enum ResellStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED'
}
