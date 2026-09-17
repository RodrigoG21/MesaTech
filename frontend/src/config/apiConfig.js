export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export const getHeaders = (accessToken) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${accessToken}`,
  "X-Requested-With": "XMLHttpRequest",
});

export const ENDPOINTS = {
  SOLICITUDES: {
    V1: {
      CREATE: "/v1/solicitudes",
      GET_ALL: "/v1/solicitudes",
      GET_MINE: "/v1/solicitudes/mias",
      UPDATE_STATUS: (id) => `/v1/solicitudes/${id}/estado`,
    },
    V2: {
      CREATE: "/v2/solicitudes",
      GET_ALL: "/v2/solicitudes",
      GET_MINE: "/v2/solicitudes/mias",
    },
  },
  CATALOGO: {
    GET: "/v1/catalogo",
    CREATE: "/v1/catalogo",
    UPDATE: (id) => `/v1/catalogo/${id}`,
    DELETE: (id) => `/v1/catalogo/${id}`,
  },
};
