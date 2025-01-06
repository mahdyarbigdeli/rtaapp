import { CSSProperties } from "react";
import styles from "./styles.module.scss";

interface IProps extends CSSProperties {
  children: JSX.Element | JSX.Element[];
}

export default function CellContainer(props: IProps) {
  const { children } = props;
  return (
    <div
      className={styles.container}
      style={{
        ...props,
      }}>
      {children}
    </div>
  );
}
