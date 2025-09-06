import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUsers, deleteUser, createUser, updateUser } from "../services/api";
import type { User } from "../types";
import UserForm from "./UserForm";
import listStyles from "./List.module.css";
import btnStyles from "./Button.module.css";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  // Veri yüklenirken arayüzde "Loading..." göstermek için state
  const [loading, setLoading] = useState<boolean>(true);
  // API hatası olursa hata mesajını tutan state
  const [error, setError] = useState<string | null>(null);

  // Ekleme/Düzenleme formunun (modal) açık olup olmadığını kontrol eden state
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Hangi kullanıcının düzenlendiğini tutan state.
  // Eğer 'null' ise, yeni kullanıcı ekleme modundayız demektir.
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // --- VERİ ÇEKME (READ) ---

  // Bu useEffect, bileşen ilk render edildiğinde sadece bir kez çalışır.
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Boş dependency array [] sayesinde sadece ilk render'da çalışır.

  // --- CRUD İŞLEM FONKSİYONLARI (HANDLER'LAR) ---

  // DELETE
  const handleDelete = async (userId: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(userId);
        // State'i güncelle: Silinen kullanıcıyı listeden filtreleyerek çıkar.
        setUsers((currentUsers) =>
          currentUsers.filter((user) => user.id !== userId)
        );
      } catch {
        alert("Failed to delete user.");
      }
    }
  };

  // CREATE (Başlangıç) - Modal'ı "yeni kullanıcı" modunda açar.
  const handleAddNewUser = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  // UPDATE (Başlangıç) - Modal'ı "kullanıcı düzenle" modunda açar.
  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  // Modal'ı kapatma fonksiyonu
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // CREATE ve UPDATE (Kaydetme) - UserForm'dan gelen veriyi işler.
  const handleSaveUser = async (formData: Omit<User, "id">, id?: number) => {
    try {
      // id varsa UPDATE işlemi yapılıyor demektir.
      if (id) {
        // Form verisi ve id'yi birleştirip API'ye gönder.
        const updatedUserData = { ...formData, id };
        const updatedUser = await updateUser(id, updatedUserData);

        // State'i güncelle: Mevcut listede ilgili kullanıcıyı bul ve yenisiyle değiştir.
        setUsers((currentUsers) =>
          currentUsers.map((user) => (user.id === id ? updatedUser : user))
        );
      } else {
        // id yoksa CREATE işlemi yapılıyor demektir.
        const newUser = await createUser(formData);

        // Not: jsonplaceholder API'si her zaman aynı ID'yi döner.
        // Bu yüzden, frontend'de benzersiz olması için geçici bir ID atıyoruz.
        // Backend'e bağlandığımızda bu satıra gerek kalmayacak.
        newUser.id = Date.now();

        // State'i güncelle: Yeni kullanıcıyı listenin başına ekle.
        setUsers((currentUsers) => [newUser, ...currentUsers]);
      }
    } catch {
      alert("Failed to save user.");
    } finally {
      // İşlem başarılı da olsa, başarısız da olsa modal'ı kapat.
      setIsModalOpen(false);
    }
  };

  // --- RENDER AŞAMASI ---

  // Yükleme durumu
  if (loading) return <div>Loading...</div>;
  // Hata durumu
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div className={listStyles.header}>
        <h1>User Management</h1>
        <button
          onClick={handleAddNewUser}
          className={`${btnStyles.btn} ${btnStyles.btnPrimary}`}
        >
          Add New User
        </button>
      </div>
      <Link to="/">← Back to Home</Link>

      <ul className={listStyles.list} style={{ marginTop: "1rem" }}>
        {users.map((user) => (
          <li key={user.id} className={listStyles.listItem}>
            <div className={listStyles.itemContent}>
              <strong>{user.name}</strong> ({user.username})
              <br />
              <small>{user.email}</small>
            </div>
            <div>
              <button
                onClick={() => handleEditUser(user)}
                className={`${btnStyles.btn} ${btnStyles.btnSecondary} ${btnStyles.marginRight}`}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className={`${btnStyles.btn} ${btnStyles.btnDanger}`}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal, sadece isModalOpen true ise render edilir. */}
      {isModalOpen && (
        <UserForm
          currentUser={editingUser}
          onSave={handleSaveUser}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default UserList;
