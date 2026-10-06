import axios from "axios";

const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

// ---- BOOKS ----
export const getBooks = () => API.get("/books");
export const getBook = (id) => API.get(`/books/${id}`);

export const createBook = (data, token) =>
    API.post("/books", data, {
        headers: { Authorization: `Bearer ${token}` },
    });

export const updateBook = (id, data, token) =>
    API.put(`/books/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });

export const deleteBook = (id, token) =>
    API.delete(`/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });

// ---- AUTH ----
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const googleLogin = (token) => API.post("/auth/google", { token });

// ---- POSTS ----
export const getPosts = () => API.get("/posts");

export const createPost = (data, token) =>
    API.post("/posts", data, {
        headers: { Authorization: `Bearer ${token}` },
    });

export const likePost = (id) => API.post(`/posts/${id}/like`);

export const deletePost = (id, token) =>
    API.delete(`/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });

export const addComment = (postId, text, token) =>
    API.post(
        `/posts/${postId}/comment`, { text }, { headers: { Authorization: `Bearer ${token}` } }
    );