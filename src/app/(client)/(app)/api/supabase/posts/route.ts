import { desc, eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'

import { db } from '@/db'
import { posts } from '@/db/schema'

// GET
export async function GET(): Promise<NextResponse> {
  try {
    const data = await db.select().from(posts).orderBy(desc(posts.createdAt))

    return NextResponse.json({ posts: data }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}

// POST
export async function POST(req: Request): Promise<NextResponse> {
  try {
    const requestBody = await req.json()
    const { title, body } = requestBody

    if (!title || !body) {
      return NextResponse.json({ error: 'Title and body are required' }, { status: 400 })
    }

    const [newPost] = await db
      .insert(posts)
      .values({
        title,
        body,
      })
      .returning()

    if (!newPost) {
      return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
    }

    return NextResponse.json({ post: newPost }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}

// PUT
export async function PUT(req: Request): Promise<NextResponse> {
  try {
    const requestBody = await req.json()
    const { id, title, body } = requestBody

    if (!id || !title || !body) {
      return NextResponse.json({ error: 'ID, title and body are required' }, { status: 400 })
    }

    const [updatedPost] = await db
      .update(posts)
      .set({
        title,
        body,
      })
      .where(eq(posts.id, id))
      .returning()

    return NextResponse.json({ post: updatedPost }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}

// DELETE
export async function DELETE(req: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const deletedPosts = await db.delete(posts).where(eq(posts.id, id)).returning()

    return NextResponse.json({ success: true, deleted: deletedPosts.length }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
