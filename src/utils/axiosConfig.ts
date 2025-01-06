import { ShowError, ShowSuccess } from "@/components/UI/Toast/toast";
import axios, { AxiosRequestConfig } from "axios";
import { store } from "@/@redux/store";
import { userActions } from "@/@redux/slices/UserSlice";
import moment from "moment-jalaali";
import { IResponseAxios } from "@/types/AxiosConfig.type";

const setHeaders = () => {
  // Common
  axios.defaults.headers.common["Accept"] = "application/json";
  axios.defaults.headers.common["Content-Type"] = "application/json";
  axios.defaults.withCredentials = false;
};

const getToken = () => {
  setHeaders();
  const state = store.getState();
  const user = state?.user as any;
  const token = user?.accessToken;
  return token ? `Bearer ${token}` : undefined;
};

axios.interceptors.request.use(
  (config) => {
    config.headers.Authorization = getToken();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
axios.interceptors.response.use(
  (response) => {
    const message = response.data.message;
    if (message) {
      ShowSuccess(message);
    }

    return response.data;
  },
  (error) => {
    if (error.status === 401) {
      store.dispatch(userActions.logout());
    }
    const response = error.response;
    if (response) {
      const message = response.data.message || response.statusText;
      ShowError(message);

      const errorCode = response.data?.errorData?.message;
      errorCode && ShowError(errorCode);
    }

    return Promise.reject(error);
  },
);

const postRequest = async <T>(
  url: string,
  data?: any,
  otherConfigs?: AxiosRequestConfig,
): Promise<IResponseAxios<T>> => {
  const res = await axios.post(url, data, otherConfigs);
  return res as any;
};

const uploadFileRequest = async (
  url: string,
  data?: any,
  otherConfigs?: AxiosRequestConfig,
) => {
  const res = await axios.post(url, data, {
    ...otherConfigs,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};

const getRequest = async <T>(
  url: string,
  params?: Partial<Record<keyof T, any>>,
): Promise<IResponseAxios<T>> => {
  const res = await axios.get(url, {
    params,
  });

  return res as any;
};

const putRequest = async (url: string, rawData?: any) => {
  const res = await axios.put(url, rawData);
  return res;
};

const deleteRequest = async (url: string, data?: any) => {
  const res = await axios.delete(url, {
    data: data,
  });
  return res;
};

const downloadRequest = async (
  url: string,
  method?: "POST" | "GET",
  extenstion?: string,
  download?: boolean,
) => {
  const allowDownload = download === undefined ? true : download;
  const fileExtentions = extenstion ? extenstion : "";
  const res = await axios({
    method: method,
    url: url,
    responseType: "blob",
  });

  if (!allowDownload) return res;

  const bloblUrl = URL.createObjectURL(res as any);

  const a = document.createElement("a");
  a.href = bloblUrl;

  const fileName = moment().format("jYYYY-jMM-jDD") + fileExtentions;

  a.setAttribute("download", fileName);
  a.click();
  return res;
};

export default {
  postRequest,
  getRequest,
  putRequest,
  deleteRequest,
  downloadRequest,
  uploadFileRequest,
};
