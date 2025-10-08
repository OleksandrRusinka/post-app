import { NextResponse } from 'next/server'

import { SupabaseManager } from '@/pkg/integration/supabase'

// GET
export async function GET(): Promise<NextResponse> {
  const supabase = SupabaseManager.getClient()

  const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ posts: data }, { status: 200 })
}

// POST
export async function POST(req: Request): Promise<NextResponse> {
  const requestBody = await req.json()
  const { title, body } = requestBody

  if (!title || !body) {
    return NextResponse.json({ error: 'Title and body are required' }, { status: 400 })
  }

  const supabase = SupabaseManager.getClient()

  const { data, error } = await supabase
    .from('posts')
    .insert([
      {
        title,
        body,
      },
    ])
    .select()
    .maybeSingle()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!data) {
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }

  const newPost = data

  return NextResponse.json({ post: newPost }, { status: 201 })
}

// PUT
export async function PUT(req: Request): Promise<NextResponse> {
  const requestBody = await req.json()
  const { id, title, body } = requestBody

  if (!id || !title || !body) {
    return NextResponse.json({ error: 'Title and body are required' }, { status: 400 })
  }

  const supabase = SupabaseManager.getClient()

  const { data, error } = await supabase
    .from('posts')
    .update({
      title,
      body,
    })
    .eq('id', id)
    .select()
    .maybeSingle()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!data) {
    return NextResponse.json({ error: 'Post update failed' }, { status: 404 })
  }

  const updatedPost = data

  return NextResponse.json({ post: updatedPost }, { status: 200 })
}

// DELETE
export async function DELETE(req: Request): Promise<NextResponse> {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 })
  }

  const supabase = SupabaseManager.getClient()

  const { error, count } = await supabase.from('posts').delete().eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, deleted: count }, { status: 200 })
}
