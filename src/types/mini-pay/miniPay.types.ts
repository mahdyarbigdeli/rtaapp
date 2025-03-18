// IGetInquiry

export interface IGetInquiry {
  input: string;
  branch_id: string;
  branch_name?: string;
  amount: number;
}

export interface IGetInquiryResponse {
  inquiry_id: number;
  status: string;
  amount: number;
  message: null;
  success: boolean;
  content: Content;
}

interface Content {
  inquiry_id: number;
  direct_transaction: boolean;
  default_installment: number;
  installments_details: Installmentsdetail[];
}

interface Installmentsdetail {
  installment: number;
  credit_amount: Creditamount;
  interest: Interest;
  messages: Messages;
}

interface Messages {
  installment: string;
  customer_credit: string;
  interest: string;
}

interface Interest {
  default_interest: number;
  min: number;
  max: number;
  percentage_interest: number;
}

interface Creditamount {
  default_credit_amount: number;
  min: number;
  max: number;
}

// ---------------------------------

// IPreTransaction

export interface IPreTransaction {
  inquiry_id: string;
  credit_amount: number;
  default_credit_amount: number;
}

export interface IPreTransactionResponse {
  calling_id: number;
  success: boolean;
  status: number;
  message: string;
  content: Content;
}

interface Content {
  pre_transaction_id: number;
  purchase_password: boolean;
  purchase_password_message: string;
  purchase_password_details: Purchasepassworddetails;
}

interface Purchasepassworddetails {
  purchase_password_resend: boolean;
  purchase_password_resend_time: number;
  purchase_password_resend_message: string;
  purchase_password_expiration: number;
}

// ---------------------------------

// ISetTransaction
export interface ISetTransaction {
  pre_transaction_id: string;
  purchase_password: string;
  supplier_transaction_id: string;
  resend_code_time: number;
  Param1: 0;
  Param2: 0;
}

export interface ISetTransactionResponse {
  calling_id: number;
  success: boolean;
  status: number;
  message: string;
  content: Content;
  set_transaction_response: Content;
  save_detail_response: Content;
}

interface Content {
  additionalProp1: string;
  additionalProp2: string;
  additionalProp3: string;
}

// ---------------------------------

// Refund Transaction

export interface IRefundTransaction {
  transaction_id: string;
}

export interface IRefundTransactionResponse {
  calling_id: number;
  success: boolean;
  status: number;
  message: string;
  content: Content;
}

interface Content {
  additionalProp1: string;
  additionalProp2: string;
  additionalProp3: string;
}

// ---------------------------------
