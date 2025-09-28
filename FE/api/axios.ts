const IS_SERVER = typeof window === "undefined";
const axiosModule = IS_SERVER
  ? await import("./axios-server")
  : await import("./axios-client");

const axios = axiosModule.default;
console.log(axios, axiosModule);
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
    similarProducts: (productId: string) => `/v1/products/${productId}/similar`,
    popularProducts: "/v1/products/popular-products",
    highlights: "/v1/products/highlights",
  },
  deals: {
    list: "/v1/deals",
    details: (dealId: string) => `/v1/deals/${dealId}`,
    today: "/v1/deals/today",
    manufacturers: "/v1/deals/filters/manufacturer",
    categories: "/v1/deals/filters/category",
  },
  categories: {
    all: "/v1/categories",
  },
  cart: {
    list: "/v1/cart",
    single: (cartItem: string) => `/v1/cart/${cartItem}`,
    details: "/v1/cart/cart-details",
    checkout: "/v1/payments/create-checkout-session",
  },
  reviews: {
    dealsList: (dealId: string) => `/v1/deals/${dealId}/reviews`,
    list: (productId: string) => `/v1/products/${productId}/reviews`,
    single: (productId: string, reviewId: string) =>
      `/v1/products/${productId}/reviews/${reviewId}`,
    dealsSingle: (dealId: string, reviewId: string) =>
      `/v1/products/${dealId}/reviews/${reviewId}`,
  },
  messages: {
    send: "/v1/messages/contact-us",
  },
  orders: {
    details: (orderId: string) => `/v1/orders/${orderId}`,
    myOrders: "/v1/orders/my-orders",
  },
};

export default axios;
