import { IUser } from "@/types/auth.types";
import { Icon } from "@iconify/react/dist/iconify.js";

interface IRoute {
  path: string;
  icon: JSX.Element;
  title: string;
  childrens: IRoute[];
  allowedRoles: IUser["role"][];
}

export const routes: IRoute[] = [
  {
    title: "صفحه اصلی",
    childrens: [],
    icon: <Icon icon='material-symbols:home-rounded' />,
    path: "/",
    allowedRoles: ["admin", "customer", "supplier"],
  },
  {
    title: "کانال ها",
    childrens: [],
    icon: <Icon icon='uil:channel' />,
    path: "/channels",
    allowedRoles: ["admin", "customer", "supplier"],
  },
  {
    title: "کاربران",
    childrens: [
      {
        title: "ایجاد کاربر",
        childrens: [],
        icon: <Icon icon='uil:channel' />,
        path: "/users/create",
        allowedRoles: ["admin", "customer", "supplier"],
      },
    ],
    icon: <Icon icon='flowbite:users-solid' />,
    path: "/users",
    allowedRoles: ["admin"],
  },
];
