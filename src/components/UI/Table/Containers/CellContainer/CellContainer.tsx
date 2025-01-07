import { CSSProperties } from "react";
import styles from "./styles.module.scss";

interface IProps extends CSSProperties {
  children: JSX.Element | JSX.Element[];
  onClick?: () => void;
}

export default function CellContainer(props: IProps) {
  const { children } = props;
  return (
    <div
      className={styles.container}
      style={{
        ...props,
      }}
      onClick={props.onClick}>
      {children}
    </div>
  );
}
