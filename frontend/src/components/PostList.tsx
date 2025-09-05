import React, { useState, useEffect } from "react";
import { getPosts } from "../services/api";
import type { Post } from "../types";
import { Link } from "react-router-dom";

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch {
        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Post List</h1>
      <Link to="/">Back to Home</Link>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong> (User ID: {post.userId})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
