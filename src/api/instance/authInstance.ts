import useTokenStore from "@/store/useTokenStore";
import axios from "axios";
import { postReissue } from "../login";

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
    if (!token) {
      return Promise.reject(new Error("No token available"));
    }
    config.headers.Authorization = `Bearer ${token}`;
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
        const response: { accessToken: string } = await postReissue();
        const newToken = response.accessToken;
        useTokenStore.getState().setToken(newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return authInstance(originalRequest);
      } catch (reissueError) {
        alert("토큰 갱신에 실패했다옹... 다시 로그인 해보라냥");
        window.location.href = "/login";
        useTokenStore.getState().clearToken();
        return Promise.reject(reissueError);
      }
    }

    return Promise.reject(error);
  },
);

export default authInstance;
