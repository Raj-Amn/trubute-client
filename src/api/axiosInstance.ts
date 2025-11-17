import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://54.174.229.126/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Optional: Add token to every request (if using auth)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
