import axios from "axios";
import type { User, Post } from "../types";

const API_URL = "https://jsonplaceholder.typicode.com";

export const getUsers = async (): Promise<User[]> => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const getPosts = async (): Promise<Post[]> => {
  const response = await axios.get(`${API_URL}/posts`);
  return response.data;
};

export const createUser = async (user: Omit<User, "id">): Promise<User> => {
  const response = await axios.post(`${API_URL}/users`, user);
  return response.data;
};

export const updateUser = async (id: number, user: User): Promise<User> => {
  const response = await axios.put(`${API_URL}/users/${id}`, user);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/users/${id}`);
};

// CREATE: Yeni bir gönderi oluştur
// body'i de ekleyelim, formda kullanacağız.
export const createPost = async (post: Omit<Post, "id">): Promise<Post> => {
  const response = await axios.post(`${API_URL}/posts`, post);
  return response.data;
};

// UPDATE: Bir gönderiyi güncelle
export const updatePost = async (id: number, post: Post): Promise<Post> => {
  const response = await axios.put(`${API_URL}/posts/${id}`, post);
  return response.data;
};

// DELETE: Bir gönderiyi sil
export const deletePost = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/posts/${id}`);
};
