'use server'
import prisma from '@/prisma/client'
import { cache } from 'react'
import HomePage from './home-page'

// in case we need the whole User object in the future it's easy to do so
// right now, we just need the author's name, so for data privacy and to not fetch sensible data (email)
// I've choosen to only get their names
const getPosts = cache(async () => {
  return await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      author: {
        select: {
          name: true
        }
      }
    },
  })
})

export default async function Page() {
  const posts = await getPosts()
  return <HomePage posts={posts} />
}
