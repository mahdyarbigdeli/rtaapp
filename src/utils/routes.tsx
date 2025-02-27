import { ShowQuestion } from "@/components/UI/Toast/toast";
import { IUser } from "@/types/auth.types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { store } from "@/@redux/store";
import { userActions } from "@/@redux/slices/UserSlice";

interface IRoute {
  path: string;
  icon: JSX.Element;
  title: string;
  childrens: IRoute[];
  allowedRoles: IUser["role"][];
  onClick?: () => void;
}

export const routes: IRoute[] = [
  {
    title: "خروج از حساب",
    childrens: [],
    icon: <Icon icon='material-symbols:home-rounded' />,
    path: "/",
    allowedRoles: ["admin", "customer", "supplier"],
    onClick() {
      ShowQuestion({
        onConfirm() {
          store.dispatch(userActions.logout());
        },
      });
    },
  },
  {
    title: "کانال ها",
    icon: <Icon icon='uil:channel' />,
    path: "/channels",
    allowedRoles: ["admin", "supplier"],
    childrens: [
      {
        title: "لیست کانال ها",
        childrens: [],
        icon: <Icon icon='uil:channel' />,
        path: "/channels/",
        allowedRoles: ["admin", "supplier"],
      },
      {
        title: "اختصاص دادن کانال",
        childrens: [],
        icon: <Icon icon='uil:channel' />,
        path: "/channels/assignee-user",
        allowedRoles: ["admin"],
      },
    ],
  },
  {
    title: "جسجتو",
    icon: <Icon icon='uil:channel' />,
    path: "/search",
    allowedRoles: ["admin", "supplier"],
    childrens: [
      {
        title: "جستجوی تراکنش",
        childrens: [],
        icon: <Icon icon='uil:channel' />,
        path: "/search/transaction",
        allowedRoles: ["admin", "supplier"],
      },
    ],
  },
  {
    title: "کاربران",
    childrens: [
      {
        title: "ایجاد کاربر",
        childrens: [],
        icon: <Icon icon='uil:channel' />,
        path: "/users/create",
        allowedRoles: ["admin"],
      },
      {
        title: "لیست کاربران",
        childrens: [],
        icon: <Icon icon='uil:channel' />,
        path: "/users/list",
        allowedRoles: ["admin"],
      },
    ],
    icon: <Icon icon='flowbite:users-solid' />,
    path: "/users",
    allowedRoles: ["admin"],
  },
];
