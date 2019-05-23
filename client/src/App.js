import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get('/api/posts');
      setPosts(data.posts);
    }
    fetchPosts();
  }, []);
  return (
    <div className="App">
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
