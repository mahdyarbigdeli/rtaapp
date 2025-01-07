import {
  ITransaction,
  ITransactionsParams,
} from "@/types/snapp/transactions/transactions.types";
import apiRoutes from "@/utils/apisRoutes";
import axiosConfig from "@/utils/axiosConfig";
const { postRequest, getRequest } = axiosConfig;
import { VITE_API_URL } from "@/utils/ENV";

const { create, list, cancelTransaction, finalizeTransaction, updateStatus } =
  apiRoutes.snappay;

export const GetAllTransactionsAPI = async (params: any) => {
  const url = `${VITE_API_URL}${list}`;
  console.log(url);
  return getRequest<ITransaction[]>(url, params);
};

export const CreateTransactionsAPI = async (data: ITransactionsParams) => {
  const url = `${VITE_API_URL}${create}`;
  const res = await postRequest<ITransaction[]>(url, {
    ...data,
    paymentMethodTypeDto: "INSTALLMENT",
  });
  return res;
};

export const CancelTransactionAPI = async (transaction_id: string) => {
  const url = `${VITE_API_URL}${cancelTransaction(transaction_id)}`;
  const res = await postRequest(url);
  return res;
};
export const FinalizeTransactionAPI = async (transaction_id: string) => {
  const url = `${VITE_API_URL}${finalizeTransaction(transaction_id)}`;
  const res = await postRequest(url);
  return res;
};
export const UpdateTransactionStatusAPI = async (transaction_id: string) => {
  const url = `${VITE_API_URL}${updateStatus}`;
  const res = await postRequest(url, {
    transaction_id: transaction_id,
  });
  return res;
};
