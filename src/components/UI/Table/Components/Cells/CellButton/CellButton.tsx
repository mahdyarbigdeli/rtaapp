import { IVariant } from "@/types/Variables";
import styles from "./styles.module.scss";
import React from "react";

interface Props {
  title: string;
  icon: JSX.Element;
  onClick?: () => void;
  variant: IVariant;
  disabled?: boolean;
  children?: React.ReactElement;
}

export default function CellButton({
  icon,
  title,
  variant,
  onClick,
  disabled,
  children,
}: Props) {
  return (
    <button
      type='button'
      disabled={disabled}
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}>
      {icon}
      <span>{title}</span>
      {children}
    </button>
  );
}
