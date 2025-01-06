"use client";
import Accordion from "@/components/UI/accordion/Accordion";
import { Property } from "csstype";
import { CSSProperties, DetailedHTMLProps, HTMLAttributes } from "react";

import styles from "./styles.module.scss";

// @ts-ignore
interface IRow
  extends CSSProperties,
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  expanded?: boolean;
  children: JSX.Element | JSX.Element[] | any;
  gap?: string;
  alingment?: {
    vertical: Property.AlignItems;
    horizontal?: Property.JustifyContent;
  };
  style?: CSSProperties;
  disabled?: boolean;
  center?: boolean;
  accoridon?: boolean;
}

export default function Flex(props: IRow) {
  const {
    expanded = true,
    children,
    gap = "0.25rem",
    alingment = {
      vertical: "inherit",
      horizontal: "inherit",
    },
    style = {},
    disabled = false,
    onClick = (events: any) => {},
    center = false,
    accoridon = true,
  } = props;

  const getClass = () => {
    return [props.className, disabled ? styles.disabled : ""].join(" ");
  };

  if (accoridon) {
    return (
      <div
        style={{
          gridColumn: props.gridColumn,
        }}>
        <Accordion state={expanded}>
          <div
            style={{
              display: "flex",
              flexDirection: props.flexDirection,
              gap: gap,
              position: "relative",
              flexWrap: "wrap",
              alignItems: center ? "center" : alingment.vertical,
              justifyContent: center ? "center" : alingment.horizontal,
              ...style,
              ...props,
            }}
            className={getClass()}
            onClick={onClick}>
            {children}
          </div>
        </Accordion>
      </div>
    );
  } else {
    return (
      <div
        style={{
          gridColumn: props.gridColumn,
        }}>
        <div
          style={{
            display: "flex",
            flexDirection: props.flexDirection,
            gap: gap,
            position: "relative",
            flexWrap: "wrap",
            alignItems: center ? "center" : alingment.vertical,
            justifyContent: center ? "center" : alingment.horizontal,
            ...style,
            ...props,
          }}
          className={getClass()}
          onClick={onClick}>
          {children}
        </div>
      </div>
    );
  }
}
