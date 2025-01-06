import {
  ITransaction,
  ITransactionsParams,
} from "@/types/snapp/transactions/transactions.types";
import apiRoutes from "@/utils/apisRoutes";
import axiosConfig from "@/utils/axiosConfig";
const { postRequest, getRequest } = axiosConfig;
import { VITE_API_URL } from "@/utils/ENV";

const { create, list, cancelTransaction, finalizeTransaction } =
  apiRoutes.snappay;

export const mockTransactions: ITransaction[] = [
  {
    id: 1,
    branch_code: "001",
    branch_name: "Branch One",
    terminal_id: "T001",
    token: "token123",
    amount: 1000,
    discount_amount: 100,
    payment_method: "Credit Card",
    transaction_id: "TXN001",
    status: "Completed",
    reference_code: "REF001",
    created_at: "2023-01-01T10:00:00Z",
    updated_at: "2023-01-01T10:00:00Z",
  },
  {
    id: 2,
    branch_code: "002",
    branch_name: "Branch Two",
    terminal_id: "T002",
    token: "token456",
    amount: 2000,
    discount_amount: 200,
    payment_method: "Debit Card",
    transaction_id: "TXN002",
    status: "PENDING",
    reference_code: "REF002",
    created_at: "2023-01-02T11:00:00Z",
    updated_at: "2023-01-02T11:00:00Z",
  },
  {
    id: 3,
    branch_code: "003",
    branch_name: "Branch Three",
    terminal_id: "T003",
    token: "token789",
    amount: 3000,
    discount_amount: 300,
    payment_method: "Cash",
    transaction_id: "TXN003",
    status: "Failed",
    reference_code: "REF003",
    created_at: "2023-01-03T12:00:00Z",
    updated_at: "2023-01-03T12:00:00Z",
  },
  {
    id: 4,
    branch_code: "004",
    branch_name: "Branch Four",
    terminal_id: "T004",
    token: "token012",
    amount: 4000,
    discount_amount: 400,
    payment_method: "Bank Transfer",
    transaction_id: "TXN004",
    status: "Completed",
    reference_code: "REF004",
    created_at: "2023-01-04T13:00:00Z",
    updated_at: "2023-01-04T13:00:00Z",
  },
  {
    id: 5,
    branch_code: "005",
    branch_name: "Branch Five",
    terminal_id: "T005",
    token: "token345",
    amount: 5000,
    discount_amount: 500,
    payment_method: "Mobile Payment",
    transaction_id: "TXN005",
    status: "PENDING",
    reference_code: "REF005",
    created_at: "2023-01-05T14:00:00Z",
    updated_at: "2023-01-05T14:00:00Z",
  },
];

export const GetAllTransactionsAPI = async (params: any) => {
  const url = `${VITE_API_URL}${list}`;
  console.log(url)
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
