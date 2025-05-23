import useTokenStore from "@/store/useTokenStore";
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
    const token = useTokenStore.getState().token;
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
        alert("토큰 갱신에 실패했다옹... 로그아웃 하고 다시 로그인 해보라냥");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default authInstance;
