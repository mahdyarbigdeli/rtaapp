import { ColDef } from "@ag-grid-community/core";
import CellStatus, {
  IStatusType,
} from "@/components/UI/Table/Components/Cells/CellStatus/CellStatus";
import { Icon } from "@iconify/react/dist/iconify.js";
export interface ITransactionsParams {
  amount: number;
  discountAmount: number;
  paymentMethodTypeDto: string;
  token: string;
}

export interface ITransaction {
  id: number;
  branch_code: string;
  branch_name: string;
  terminal_id: string;
  token: string;
  amount: number;
  discount_amount: number;
  payment_method: string;
  transaction_id: string;
  status: "PENDING" | "CANCEL" | "SETTLE";
  reference_code: string;
  created_at: string;
  updated_at: string;
}

export const transactionColumnDefs: ColDef[] = [
  {
    headerName: "شناسه تراکنش",
    field: "transaction_id",
  },
  { headerName: "کد شعبه", field: "branch_code" },
  { headerName: "نام شعبه", field: "branch_name" },
  { headerName: "شناسه ترمینال", field: "terminal_id" },
  { headerName: "توکن", field: "token" },
  { headerName: "مقدار", field: "amount" },
  { headerName: "مقدار تخفیف", field: "discount_amount" },
  { headerName: "روش پرداخت", field: "payment_method" },
];

export const transactionsStatus: IStatusType[] = [
  {
    icon: <Icon icon='mdi:receipt-text-pending' />,
    label: "در انتظار",
    value: "PENDING",
    variant: "warning",
  },
  {
    icon: <Icon icon='ic:baseline-cancel' />,
    label: "لغو شده",
    value: "CANCEL",
    variant: "danger",
  },
  {
    icon: <Icon icon='el:ok-sign' />,
    label: "تایید شده",
    value: "SETTLE",
    variant: "success",
  },
];
