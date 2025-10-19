import axios from "axios";

// Use the Vite dev proxy: all requests go to /api/* in dev
const api = axios.create({ baseURL: "/api" });

// Attach JWT automatically (if present)
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default api;
