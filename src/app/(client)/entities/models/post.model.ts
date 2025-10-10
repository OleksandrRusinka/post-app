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

// supabase post response
export interface ISupabasePost {
  id: string
  createdAt: string | null
  title: string
  body: string
}
