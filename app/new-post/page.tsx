import { fetchUsers } from '../api/user/route'
import NewPost from './NewPost'

// This will fetch the users on the server side, at build time, before rendering.
export default async function NewPostPage() {
  const users = await fetchUsers();
  return <NewPost users={users} />
}