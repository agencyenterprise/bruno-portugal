'use server'

import prisma from '@/prisma/client'
import { revalidatePath } from 'next/cache'
import { OpenAI } from 'openai'

interface NewPostParams {
  authorId: number
  title: string
  content?: string | undefined
}

const client = new OpenAI();

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

export const generateAIPost = async (content: string | null) => {

  if (!content || !Array.isArray(content)) {
    throw Error('No keywords provided');
  }

  const prompt = `Write a blog post based on the following keywords: ${content.join(", ")}. 
    The response should include a title and a body of the post. Format the output as JSON with "title" and "content" keys.`;

  const response = await client.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "system", content: prompt }],
    temperature: 0.7,
  });

  // Extract response from ChatGPT
  const rawText = response.choices[0]?.message?.content;
  const generatedPost = JSON.parse(rawText || `{ "title": "Untitled", "content": "No content available." }`);

  return generatedPost;
}
