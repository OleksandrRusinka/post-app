// post
export interface IPost {
  id: number | string
  created_at: string
  title: string
  body: string
  source?: 'fakejson' | 'user'
}

// create post
export interface ICreatePostDto {
  title: string
  body: string
}

// update post
export interface IUpdatePostDto {
  id: number | string
  title: string
  body: string
}

// query params
export interface IPostByIdQueryParams {
  id: string | number
}

// filters
export interface IPostFilters {
  search?: string
  userId?: number
  source?: 'fakejson' | 'user'
  page?: number
  limit?: number
}

// supabase post response
export interface ISupabasePost {
  id: string
  created_at: string
  title: string
  body: string
}
