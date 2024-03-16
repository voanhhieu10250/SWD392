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
  watermarked_url: string
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
