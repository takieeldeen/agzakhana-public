import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const endpoints = {
  auth: {
    login: "/v1/auth/login",
    checkAuth: "/v1/auth/checkAuth",
    register: "/v1/auth/register",
    logout: "/v1/auth/logout",
  },
};

export default axiosInstance;
