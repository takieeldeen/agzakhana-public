const IS_SERVER = typeof window === "undefined";
const axiosModule = IS_SERVER
  ? await import("./axios-server")
  : await import("./axios-client");

const axios = axiosModule.default;
export const endpoints = {
  helpers: {
    permissions: "/v1/permissions",
  },
  roles: {
    list: "/v1/roles",
    details: (id: string) => `/v1/roles/${id}`,
  },
};

export default axios;
