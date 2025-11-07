const IS_SERVER = typeof window === "undefined";
const axiosModule = IS_SERVER
  ? await import("./axios-server")
  : await import("./axios-client");

const axios = axiosModule.default;
export const endpoints = {
  common: {
    geocode: (lat: number, lng: number) =>
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1&accept-language=ar`,
    addressSuggestions: (q: string) =>
      `https://nominatim.openstreetmap.org/search?q=${q}&format=json&accept-language=ar&countrycodes=eg`,
    uploadFile: `/v1/dashboard/files/`,
    deleteFile: (fileId: string) => `/v1/dashboard/files/${fileId}`,
  },
  helpers: {},
  roles: {
    list: "/v1/dashboard/roles",
    details: (id: string) => `/v1/dashboard/roles/${id}`,
    activate: (id: string) => `/v1/dashboard/roles/${id}/activate`,
    deactivate: (id: string) => `/v1/dashboard/roles/${id}/deactivate`,
  },
  users: {
    list: "/v1/dashboard/users",
    details: (id: string) => `/v1/dashboard/users/${id}`,
    deleteUserRole: (roleId: string, userId: string) =>
      `/v1/dashboard/users/${userId}/roles/${roleId}`,
  },
  valueHelp: {
    permissions: "/v1/dashboard/permissions",
    cities: "/v1/dashboard/valueHelp/city",
    nationalities: "/v1/dashboard/valueHelp/nationality",
    activeBranches: "/v1/dashboard/valueHelp/branches/active-branches",
    activeRoles: "/v1/dashboard/valueHelp/roles/active",
  },
};

export default axios;
