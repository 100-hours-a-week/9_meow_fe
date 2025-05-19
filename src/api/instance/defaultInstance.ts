import axios from "axios";

const baseURL = `${import.meta.env.VITE_API_URL}`;

const defaultInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default defaultInstance;
