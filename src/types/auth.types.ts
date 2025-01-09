import { ColDef } from "@ag-grid-community/core";
import { ISelectUser } from "./auth/auth.types";

export interface ILogin {
  username: string;
  password: string;
}

export interface IUser {
  userId: number;
  role: "admin" | "customer" | "supplier";
  username: string;
  email: string;
  channel: Channel;
  accessToken: string;
}

interface Channel {
  snappay: boolean;
}

export interface IAssigineChannel {
  name: string;
  user: ISelectUser;
}

export const usersColDef: ColDef[] = [
  {
    headerName: "شناسه",
    field: "id",
  },
  {
    headerName: "نام کاربری",
    field: "username",
  },
  {
    headerName: "ایمیل",
    field: "email",
    flex: 1,
  },
  {
    headerName: "نقش",
    field: "role",
    flex: 1,
  },
];
