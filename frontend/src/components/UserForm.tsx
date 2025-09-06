import React, { useState, useEffect } from "react";
import type { User } from "../types";
import formStyles from "./Form.module.css";
import btnStyles from "./Button.module.css";

// Omit<User, 'id'>: User tipinden 'id'yi çıkar.
type UserFormData = Omit<User, "id">;

interface UserFormProps {
  currentUser: User | null;
  onSave: (user: UserFormData, id?: number) => void;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({
  currentUser,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    username: "",
    email: "",
  });

  // Eğer bir kullanıcı düzenleniyorsa (currentUser değiştiyse), formu onun bilgileriyle doldur.
  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name,
        username: currentUser.username,
        email: currentUser.email,
      });
    } else {
      // Eğer yeni kullanıcı ekleniyorsa formu temizle
      setFormData({ name: "", username: "", email: "" });
    }
  }, [currentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData, currentUser?.id);
  };

  return (
    <div className={formStyles.modalBackdrop}>
      <form onSubmit={handleSubmit} className={formStyles.modalContent}>
        <h2>{currentUser ? "Edit User" : "Add New User"}</h2>

        <div className={formStyles.formGroup}>
          {/* DEĞİŞİKLİK: htmlFor ve id eklendi */}
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={formStyles.formGroup}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className={formStyles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={formStyles.formActions}>
          <button
            type="button"
            onClick={onCancel}
            className={`${btnStyles.btn} ${btnStyles.marginRight}`}
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

export default UserForm;
