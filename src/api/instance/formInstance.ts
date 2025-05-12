import axios from "axios";

const baseURL = `${import.meta.env.VITE_API_URL}`;

const formInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export default formInstance;
