import Axios from "axios";
import { message, notification } from "antd";

const axiosInstance = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      // location.replace("{REDIRECT_ROUTE_HERE}");
    }
    if (error?.response?.status === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      //  navigate("/auth/login");
      notification.error({ message: "You are not authorized to access this page" });
      window.location.href = "/auth/login";
    }

    return Promise.reject(error);
  }
);

export const axios = axiosInstance;
