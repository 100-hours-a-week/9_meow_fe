import useTokenStore from "@/store/useTokenStore";
import axios from "axios";

const baseURL = `${import.meta.env.VITE_API_URL}`;

const defaultInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

defaultInstance.interceptors.request.use(
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

export default defaultInstance;
