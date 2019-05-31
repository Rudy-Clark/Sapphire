/* eslint-disable no-param-reassign */
import axios from 'axios';

const pages = {
  home: '/',
};

export function loadPage(payload) {
  // eslint-disable-next-line consistent-return
  async function loadHomePage() {
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
      console.log(content);
      return content;
    } catch (error) {
      console.error(error);
    }
  }
  switch (payload.location.pathname) {
    case pages.home:
      return loadHomePage;
    default:
      return false;
  }
}
