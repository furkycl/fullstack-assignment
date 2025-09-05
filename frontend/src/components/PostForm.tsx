import React, { useState, useEffect } from "react";
import type { Post } from "../types";

// Form verisi için tip tanımı. id'yi dışarıda bırakıyoruz.
type PostFormData = Omit<Post, "id">;

interface PostFormProps {
  currentPost: Post | null;
  onSave: (post: PostFormData, id?: number) => void;
  onCancel: () => void;
}

const PostForm: React.FC<PostFormProps> = ({
  currentPost,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState<PostFormData>({
    title: "",
    body: "",
    userId: 1, // Varsayılan olarak bir userId atayalım
  });

  // Eğer bir gönderi düzenleniyorsa formu doldur
  useEffect(() => {
    if (currentPost) {
      setFormData({
        title: currentPost.title,
        body: currentPost.body,
        userId: currentPost.userId,
      });
    }
  }, [currentPost]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    // userId'yi sayıya çevirelim
    const processedValue = name === "userId" ? parseInt(value, 10) : value;
    setFormData((prev) => ({ ...prev, [name]: processedValue }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.userId || formData.userId < 1) {
      alert("User ID is required and must be a positive number.");
      return;
    }
    onSave(formData, currentPost?.id);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "5px",
          width: "400px",
        }}
      >
        <h2>{currentPost ? "Edit Post" : "Add New Post"}</h2>
        <div style={{ marginBottom: "10px" }}>
          <label>Title: </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            style={{ width: "95%" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Body: </label>
          <textarea
            name="body"
            value={formData.body}
            onChange={handleChange}
            required
            style={{ width: "95%", minHeight: "80px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>User ID: </label>
          <input
            type="number"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
            min="1"
            style={{ width: "95%" }}
          />
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel} style={{ marginLeft: "10px" }}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default PostForm;
