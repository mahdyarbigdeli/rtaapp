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
