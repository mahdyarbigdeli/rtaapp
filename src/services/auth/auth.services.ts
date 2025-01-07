import { IAssigineChannel, ILogin, IUser } from "@/types/auth.types";
import { IUserCU } from "@/types/users/users.types";
import apiRoutes from "@/utils/apisRoutes";
import axiosConfig from "@/utils/axiosConfig";
import { VITE_API_URL } from "@/utils/ENV";

const { login, register, users, channels } = apiRoutes.auth;

const { postRequest, getRequest } = axiosConfig;

export const LoginAPI = (data: ILogin) => {
  const url = `${VITE_API_URL}${login}`;
  return postRequest<IUser>(url, data);
};

export const RegisterAPI = (data: IUserCU) => {
  const url = `${VITE_API_URL}${register}`;
  return postRequest(url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const GetAllUsersAPI = (params: any) => {
  return getRequest<any[]>(`${VITE_API_URL}${users.list}`, params);
};

export const AssigineChannelAPI = (data: IAssigineChannel) => {
  return postRequest(`${VITE_API_URL}${channels.assigine}`, data);
};
