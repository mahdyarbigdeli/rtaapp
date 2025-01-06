import { ILogin, IUser } from "@/types/auth.types";
import apiRoutes from "@/utils/apisRoutes";
import axiosConfig from "@/utils/axiosConfig";
import { VITE_API_URL } from "@/utils/ENV";

const { login } = apiRoutes.auth;

const { postRequest } = axiosConfig;

export const LoginAPI = (data: ILogin) => {
  const url = `${VITE_API_URL}${login}`;
  return postRequest<{
    data: IUser;
  }>(url, data);
};
