import apiRoutes from "@/utils/apisRoutes";
import axiosConfig from "@/utils/axiosConfig";
import { VITE_API_URL } from "@/utils/ENV";

const { postRequest } = axiosConfig;

const { tokenByCredentials } = apiRoutes.snappay;

export const GetTokenByCredentionals = () => {
  const url = `${VITE_API_URL}${tokenByCredentials}`;
  return postRequest(url);
};

