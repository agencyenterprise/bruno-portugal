'use server'

import prisma from '@/prisma/client'
import { revalidatePath } from 'next/cache'

interface NewPostParams {
  authorId: number
  title: string
  content?: string | undefined
}

export const newPost = async ({ title, content, authorId }: NewPostParams) => {
  const post = await prisma.post.create({
    data: {
      title,
      content,
      author: {
        connect: {
          id: Number(authorId),
        },
      },
    },
  })

  revalidatePath('/', 'page')

  return post
}
