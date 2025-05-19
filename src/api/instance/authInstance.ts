import { TOKEN_KEY } from "@/store/useTokenStore";
import axios from "axios";

const baseURL = `${import.meta.env.VITE_API_URL}`;

const authInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

authInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default authInstance;
