import React, { useState, useEffect } from "react";
import type { User } from "../types";

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
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        }}
      >
        <h2>{currentUser ? "Edit User" : "Add New User"}</h2>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: "95%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Username:
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            style={{ width: "95%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: "95%", padding: "8px" }}
          />
        </div>
        <div style={{ textAlign: "right" }}>
          <button
            type="button"
            onClick={onCancel}
            style={{ marginRight: "10px" }}
          >
            Cancel
          </button>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
