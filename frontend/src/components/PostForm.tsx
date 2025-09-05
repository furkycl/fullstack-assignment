import React, { useState, useEffect } from "react";
import type { Post } from "../types";
import formStyles from "./Form.module.css";
import btnStyles from "./Button.module.css";

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
    <div className={formStyles.modalBackdrop}>
      <form onSubmit={handleSubmit} className={formStyles.modalContent}>
        <h2>{currentPost ? "Edit Post" : "Add New Post"}</h2>

        <div className={formStyles.formGroup}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className={formStyles.formGroup}>
          <label>Body:</label>
          <textarea
            name="body"
            value={formData.body}
            onChange={handleChange}
            required
            style={{ minHeight: "80px" }}
          />
        </div>

        <div className={formStyles.formGroup}>
          <label>User ID:</label>
          <input
            type="number"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
            min="1"
          />
        </div>

        <div className={formStyles.formActions}>
          <button
            type="button"
            onClick={onCancel}
            className={btnStyles.btn}
            style={{ marginRight: "10px" }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`${btnStyles.btn} ${btnStyles.btnPrimary}`}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
