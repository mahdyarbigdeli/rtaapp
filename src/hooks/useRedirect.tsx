import { useNavigate } from "react-router-dom";

export default function useRedirect() {
  const navigate = useNavigate();

  return {
    SNAPP: {
      goTransactions: () => navigate("/channels/snapp/transactions/list"),
    },
    MINI_PAY: {
      goMiniPay: () => navigate("/channels/mini-pay"),
    },
  };
}
