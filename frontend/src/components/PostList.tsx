import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// API servisinden Post'lar için gerekli tüm fonksiyonları import et
import { getPosts, createPost, updatePost, deletePost } from "../services/api";
import type { Post } from "../types";
import PostForm from "./PostForm";
import listStyles from "./List.module.css";
import btnStyles from "./Button.module.css";

const PostList: React.FC = () => {
  // --- STATE YÖNETİMİ ---
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Modal yönetimi için state'ler
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  // --- VERİ ÇEKME (READ) ---
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

  // --- CRUD İŞLEM FONKSİYONLARI (HANDLER'LAR) ---

  // DELETE
  const handleDelete = async (postId: number) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(postId);
        setPosts((currentPosts) =>
          currentPosts.filter((post) => post.id !== postId)
        );
      } catch {
        alert("Failed to delete post.");
      }
    }
  };

  // CREATE (Başlangıç)
  const handleAddNewPost = () => {
    setEditingPost(null);
    setIsModalOpen(true);
  };

  // UPDATE (Başlangıç)
  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setIsModalOpen(true);
  };

  // Modal'ı kapatma
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // CREATE ve UPDATE (Kaydetme)
  const handleSavePost = async (formData: Omit<Post, "id">, id?: number) => {
    try {
      if (id) {
        // UPDATE
        const updatedPostData = { ...formData, id };
        const updatedPost = await updatePost(id, updatedPostData);
        setPosts((currentPosts) =>
          currentPosts.map((post) => (post.id === id ? updatedPost : post))
        );
      } else {
        // CREATE
        const newPost = await createPost(formData);
        newPost.id = Date.now(); // Yine sahte, geçici ID
        setPosts((currentPosts) => [newPost, ...currentPosts]);
      }
    } catch {
      alert("Failed to save post.");
    } finally {
      setIsModalOpen(false);
    }
  };

  // --- RENDER AŞAMASI ---
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div className={listStyles.header}>
        <h1>Post Management</h1>
        <button
          onClick={handleAddNewPost}
          className={`${btnStyles.btn} ${btnStyles.btnPrimary}`}
        >
          Add New Post
        </button>
      </div>
      <Link to="/">← Back to Home</Link>

      <ul className={listStyles.list} style={{ marginTop: "1rem" }}>
        {posts.map((post) => (
          <li key={post.id} className={listStyles.listItem}>
            <div className={listStyles.itemContent}>
              <strong>{post.title}</strong>
              <br />
              <small>User ID: {post.userId}</small>
            </div>
            <div>
              <button
                onClick={() => handleEditPost(post)}
                className={btnStyles.btn}
                style={{ marginRight: "10px" }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className={`${btnStyles.btn} ${btnStyles.btnDanger}`}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <PostForm
          currentPost={editingPost}
          onSave={handleSavePost}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default PostList;
