import useGlobalStates from "@/@redux/hooks/useGlobalStates";
import Header from "@/components/layout/Header/Header";
import { Outlet } from "react-router-dom";

import styles from "./styles.module.scss";

export default function RootLayout() {
  const { user } = useGlobalStates();

  return (
    <div className={styles.layout}>
      {user.accessToken && <Header />}
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}
