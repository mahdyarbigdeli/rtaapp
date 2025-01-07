// @ts-ignore

const apiRoutes = {
  auth: {
    login: "/auth/login/",
    register: "/auth/register/",
    users: {
      list: "/auth/users/",
    },
    channels: {
      assigine: "/auth/channels/",
    },
  },
  snappay: {
    assignCredentials: "/snappay/assign-credentials/",
    token: "/snappay/token/",
    tokenByCredentials: "/snappay/token-by-credentials/",
    create: "/snappay/transactions/",
    list: "/snappay/transactions/list/",
    cancelTransaction: (id: string) => `/snappay/transactions/${id}/cancel/`,
    finalizeTransaction: (id: string) =>
      `/snappay/transactions/${id}/finalize/`,
    updateStatus: `/snappay/transactions/status/`,
  },
};

export default apiRoutes;
