import axios from 'axios';

export async function getPost(id) {
  const post = await axios(`/posts/${id}`);
  return post;
}
