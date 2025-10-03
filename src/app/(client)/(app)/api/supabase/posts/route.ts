import { NextResponse } from 'next/server'

import SupabaseManager from '@/pkg/integration/supabase/supabase.client'

export async function GET(): Promise<NextResponse> {
  const supabase = SupabaseManager.getClient()

  const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ posts: data }, { status: 200 })
}

export async function POST(req: Request): Promise<NextResponse> {
  const body = await req.json()
  const { title, body: content } = body

  if (!title || !content) {
    return NextResponse.json({ error: 'Title and body are required' }, { status: 400 })
  }

  const supabase = SupabaseManager.getClient()

  const { data, error } = await supabase
    .from('posts')
    .insert([
      {
        title,
        body: content,
      },
    ])
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!data) {
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }

  return NextResponse.json({ post: data }, { status: 201 })
}

export async function PUT(req: Request): Promise<NextResponse> {
  const body = await req.json()
  const { id, title, body: content } = body

  if (!id || !title || !content) {
    return NextResponse.json({ error: 'ID, title and body are required' }, { status: 400 })
  }

  const supabase = SupabaseManager.getClient()

  const { data, error } = await supabase
    .from('posts')
    .update({
      title,
      body: content,
    })
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ post: data }, { status: 200 })
}

export async function DELETE(req: Request): Promise<NextResponse> {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 })
  }

  const supabase = SupabaseManager.getClient()

  const { error } = await supabase.from('posts').delete().eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ success: true }, { status: 200 })
}
