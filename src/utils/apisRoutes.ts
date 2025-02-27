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
    getByID: `/snappay/transactions/status/`,
  },
  miniPay: {
    getInquiry: "/minipay/vpos/v3/supplier/get_inquiry",
    pre_transaction: "/minipay/vpos/v3/supplier/pre_transaction",
    set_transaction: "/minipay/vpos/v3/supplier/set_transaction",
    refund_transaction: "/minipay/vpos/v3/supplier/refund_transaction",
  },
};

export default apiRoutes;
