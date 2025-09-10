import axiosConstructor from "axios";

const axios = axiosConstructor.create({
  baseURL: "http://localhost:8080/api",
  // baseURL:
  //   "https://agzakhana-responsible-bilby-wa.cfapps.us10-001.hana.ondemand.com/api",
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
    details: (productId: string) => `/v1/products/${productId}`,
    manufacturers: "/v1/products/filters/manufacturer",
  },
  deals: {
    list: "/v1/deals",
    manufacturers: "/v1/deals/filters/manufacturer",
    categories: "/v1/deals/filters/category",
  },
  categories: {
    all: "/v1/categories",
  },
  cart: {
    list: "/v1/cart",
    single: (cartItem: string) => `/v1/cart/${cartItem}`,
  },
  reviews: {
    list: (productId: string) => `/v1/products/${productId}/reviews`,
    single: (productId: string, reviewId: string) =>
      `/v1/products/${productId}/reviews/${reviewId}`,
  },
};

export default axios;
