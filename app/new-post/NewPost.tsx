'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { generateAIPost, newPost } from './actions'
import { UserFromDB, fetchUsers } from '../user/actions'
import { useEffect, useState } from 'react'

export default function NewPost({users}: {users: UserFromDB[]}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<{
    authorId: number
    title: string
    content?: string
  }>()

  // const [users, setUsers] = useState<UserFromDB[] | null>(null);
  const [gptKeywords, setGPTKeywords] = useState<string>('');
  const [error, setError] = useState<string | null>('');

  const router = useRouter()

  // this would be another way to do it if we want to fetch on the client side

//   useEffect(() => {
//     const fetchData = async () => {
//       const users: UserFromDB[] = await fetchUsers();
//       setUsers(users);
//     };
//     fetchData();
//   }, []);

  async function generateChatGPTPost() {
    try {
      const postCreated = await generateAIPost(gptKeywords);
      if (postCreated) {
        setValue('title', postCreated.title);
        setValue('content', postCreated.content);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occured');
    }
  }

  return (
    <>
      <h1 className="text-center font-bold text-lg my-4">New Post</h1>
      <form
        className="flex flex-col gap-4 max-w-lg mx-auto"
        onSubmit={handleSubmit(async data => {
          await newPost(data)
          router.push('/')
        })}
      >
        <div className="flex flex-col">
          <label className="font-bold" htmlFor="author">
            Author
          </label>
          <select className="p-2 border border-gray-400 rounded-sm" id="author" {...register('authorId')}>
            {users && users.map((user: UserFromDB) => (
              <option value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="font-bold" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            className="p-2 border border-gray-400 rounded-sm"
            placeholder="An eye-catching blog post"
            {...register('title', { required: true })}
          />
          {errors.title && <p className="text-red-500 font-bold">Title is required.</p>}
        </div>
        <div className="flex flex-col">
          <label className="font-bold" htmlFor="keywords">
            Content draft keywords
          </label>
          <div className="flex items-center gap-2">
            <input
              name="keywords"
              id="keywords"
              className="p-2 border border-gray-400 rounded-sm flex-1"
              placeholder="software development, AI, ChatGPT"
              onChange={(e) => setGPTKeywords(e.target.value)}
            />
            <button onClick={generateChatGPTPost} type="button" className="border border-orange-600 rounded-sm p-2 bg-orange-400 text-white font-bold">
              Generate
            </button>
          </div>
          {error && <p className="text-red-500 font-bold">{error}</p>}
        </div>
        <div className="flex flex-col">
          <label className="font-bold" htmlFor="content">
            Content
          </label>
          <textarea id="content" className="p-2 border border-gray-400 rounded-sm" rows={3} {...register('content')} />
        </div>
        <button type="submit" className="border border-orange-600 rounded-sm p-2 bg-orange-400 text-white font-bold">
          Submit
        </button>
      </form>
    </>
  )
}
