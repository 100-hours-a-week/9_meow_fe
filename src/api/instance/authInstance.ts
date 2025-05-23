import useTokenStore, { TOKEN_KEY } from "@/store/useTokenStore";
import axios from "axios";
import { postRefresh } from "../login";

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

authInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response: { accessToken: string } = await postRefresh();
        const newToken = response.accessToken;
        useTokenStore.getState().setToken(newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return authInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default authInstance;
