/* eslint-disable no-param-reassign */
import axios from 'axios';

export async function home() {
  try {
    const response = await axios.all([
      axios.get('/pages/home'),
      axios.get('/posts'),
    ]);
    const content = response.reduce((object, resp) => {
      const { data } = resp;
      if ('page' in data) {
        object = { ...data.page, name: 'home' };
      } else if ('posts' in data) {
        object.posts = data.posts;
      }
      return object;
    }, {});
    // console.log(content);
    return content;
  } catch (error) {
    return null;
  }
}

export async function postById(id) {
  try {
    const response = await axios.get(`/posts/${id}`);
    return { ...response.data.post };
  } catch (error) {
    return null;
  }
}
