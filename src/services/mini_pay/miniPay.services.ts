import {
  IGetInquiry,
  IGetInquiryResponse,
  IPreTransaction,
  IPreTransactionResponse,
  IRefundTransaction,
  IRefundTransactionResponse,
  ISetTransaction,
  ISetTransactionResponse,
} from "@/types/mini-pay/miniPay.types";

import apiRoutes from "@/utils/apisRoutes";
import axiosConfig from "@/utils/axiosConfig";
const { postRequest, getRequest } = axiosConfig;
import { VITE_API_URL } from "@/utils/ENV";

const { getInquiry, pre_transaction, set_transaction, refund_transaction } =
  apiRoutes.miniPay;

export const GetInquiryAPI = async (data: IGetInquiry) => {
  const url = `${VITE_API_URL}${getInquiry}`;
  return postRequest<IGetInquiryResponse>(url, data);
};

export const PreTransactionAPI = async (data: IPreTransaction) => {
  const url = `${VITE_API_URL}${pre_transaction}`;
  return postRequest<IPreTransactionResponse>(url, data);
};

export const SetTransactionAPI = async (data: ISetTransaction) => {
  const url = `${VITE_API_URL}${set_transaction}`;
  return postRequest<ISetTransactionResponse>(url, data);
};

export const RefundTransactionAPI = async (data: IRefundTransaction) => {
  const url = `${VITE_API_URL}${refund_transaction}`;
  return postRequest<IRefundTransactionResponse>(url, data);
};
