import axios from "axios";

// Using VITE_API_URL to match the Render Blueprint and Dockerfile configuration
// If you prefer VITE_API_BASE_URL, ensure to update render.yaml and Dockerfile
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

const api = axios.create({
    baseURL: API_URL,
});

export default api;
