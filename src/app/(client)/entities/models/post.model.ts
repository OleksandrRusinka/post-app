export interface Post {
  id: number | string
  created_at: string
  title: string
  body: string
  source?: 'fakejson' | 'user'
}

export interface CreatePostDto {
  title: string
  body: string
}

export interface PostFilters {
  search?: string
  userId?: number
  source?: 'fakejson' | 'user'
  page?: number
  limit?: number
}
