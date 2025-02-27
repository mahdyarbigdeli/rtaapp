import { NavLink, Outlet } from "react-router-dom";

import styles from "./styles.module.scss";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function MiniPayLayout() {
  const routes = [
    {
      title: "تراکنش جدید",
      path: "/channels/mini-pay/transaction/new",
      icon: <Icon icon="carbon:add-filled" />,
      children: [],
    },
    {
      title: "لغو تراکنش",
      path: "/channels/mini-pay/transaction/cancel",
      icon: <Icon icon="mdi:cancel-box" />,
      children: [],
    },
  ];

  const navLinkClass = ({ isActive }: { isActive: boolean }) => {
    return [
      styles.navLink,
      isActive && styles.isActive,
      styles.others,
      styles.others,
    ].join(" ");
  };

  return (
    <section className={styles.layout}>
      <div className={styles.content}>
        <div className={styles.page}>
          <Outlet />
        </div>
        <nav className={styles.sideBar}>
          {routes.map((route) => {
            return (
              <NavLink
                to={route.path}
                className={navLinkClass}>
                <span>{route.title}</span>
                {route.icon}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </section>
  );
}
