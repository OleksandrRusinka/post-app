export interface Post {
  id: number
  userId: number
  title: string
  body: string
  source?: 'fakejson' | 'user'
}

export interface CreatePostDto {
  title: string
  body: string
  userId: number
}

export interface IPagination {
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
}
