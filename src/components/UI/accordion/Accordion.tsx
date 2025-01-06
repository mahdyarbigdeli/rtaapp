import React, { CSSProperties } from "react";

import styles from "./styles.module.scss";

interface AccordionProps extends CSSProperties {
  state: boolean;
  children: JSX.Element | JSX.Element[];
  className?: string;
}

export default function Accordion(props: AccordionProps) {
  const { children, state, className } = props;

  const getClass = () => {
    const classs = [styles.accordion, className, state && styles.expand];
    return classs.join(" ");
  };

  return (
    <div
      className={getClass()}
      style={{
        ...props,
      }}>
      <div className={styles.children}>{children}</div>
    </div>
  );
}
