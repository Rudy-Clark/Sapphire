import axios from 'axios';

const pages = {
  home: '/',
};

export function loadPage(payload) {
  function loadHomePage() {
    return axios.all([axios.get('/pages/home'), axios.get('/posts')]);
  }
  switch (payload.location.pathname) {
    case pages.home:
      return loadHomePage;
    default:
      return false;
  }
}
