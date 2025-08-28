import axiosConstructor from "axios";

const axios = axiosConstructor.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const endpoints = {
  auth: {
    login: "/v1/auth/login",
    loginWithGoogle: "/v1/auth/login-with-google",
    checkAuth: "/v1/auth/checkAuth",
    register: "/v1/auth/register",
    logout: "/v1/auth/logout",
  },
  products: {
    list: "/v1/products",
    manufacturers: "/v1/products/filters/manufacturer",
  },
  categories: {
    all: "/v1/categories",
  },
};

export default axios;
