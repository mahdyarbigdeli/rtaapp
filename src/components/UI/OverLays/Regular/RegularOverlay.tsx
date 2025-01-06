import { Icon } from "@iconify/react/dist/iconify.js";
import styles from "./styles.module.scss";

interface Props {
  loading?: boolean;
}

function RegularOverlay({ loading = false }: Props) {
  const getClasss = [loading && styles.loading, styles.overlay].join(" ");

  return (
    <section className={getClasss}>
      <Icon icon='svg-spinners:8-dots-rotate' />
      <h1>درحال بروزرسانی</h1>
    </section>
  );
}

export default RegularOverlay;
