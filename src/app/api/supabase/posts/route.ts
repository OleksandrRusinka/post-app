import { NextResponse } from 'next/server'

import { createClient } from '@/pkg/libraries/supabase/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { title, body: content } = body

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and body are required' }, { status: 400 })
    }

    const supabase = await createClient()

    const { data, error } = await supabase
      .from('posts')
      .insert({
        title: title,
        body: content,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ post: data }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}

export async function GET() {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ posts: data }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const { id, title, body: content } = body

    if (!id || !title || !content) {
      return NextResponse.json({ error: 'ID, title and body are required' }, { status: 400 })
    }

    const supabase = await createClient()

    const { data, error } = await supabase
      .from('posts')
      .update({
        title: title,
        body: content,
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ post: data }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const supabase = await createClient()

    const { error } = await supabase.from('posts').delete().eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
