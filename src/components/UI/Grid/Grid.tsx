"use client";
import { Property } from "csstype";
import React, {
  CSSProperties,
  DetailedHTMLProps,
  HTMLAttributes,
  useEffect,
} from "react";

import styles from "./styles.module.scss";
import Accordion from "../accordion/Accordion";
import useViewSize from "@/hooks/useViewSize";

// @ts-ignore
interface IGridProps<T = any>
  extends CSSProperties,
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  columns?: string;
  expanded?: boolean;
  children: React.ReactElement | React.ReactElement[] | undefined;
  gap?: string;
  alingment?: {
    vertical: Property.AlignItems;
    horizontal?: Property.JustifyContent;
  };
  styles?: CSSProperties;
  useAccordion?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  gone?: boolean;
  glassMorphism?: boolean;
  sort?: {
    items: T[];
    idKey: keyof T;
    onSortChange: (values: T[]) => void;
  };
  responsive?: {
    small?: CSSProperties;
    mobile?: CSSProperties;
    desktop?: CSSProperties;
  };
}

export default function Grid<T>(props: IGridProps<T>) {
  const {
    children,
    expanded = true,
    gap = "1rem",
    useAccordion = true,
    gridTemplateColumns,
    alingment = {
      vertical: "inherit",
      horizontal: "inherit",
    },
    disabled = false,
    styles: customeStyles,
    isLoading = false,
    gone = false,
    className,
    gridColumn,
    glassMorphism = false,
  } = props;

  const { vertical, horizontal } = alingment;

  const { isDesktop, isMobile } = useViewSize();

  const getClass = () => {
    const classs = [
      styles.grid,
      disabled ? styles.disabled : "",
      isLoading && styles.loading,
      glassMorphism && styles.glassMorphism,
    ];
    return classs.join(" ");
  };

  useEffect(() => {
    let debounce = expanded === false ? setTimeout(() => {}, 2000) : undefined;

    return clearTimeout(debounce);
  }, [gone, expanded]);

  if (gone) return <></>;

  let component;

  if (useAccordion)
    component = (
      <Accordion
        className={className}
        state={expanded}
        gridColumn={gridColumn}>
        <div
          className={getClass()}
          style={{
            display: "grid",
            gridTemplateColumns: gridTemplateColumns,
            gap: gap,
            alignItems: vertical,
            justifyContent: horizontal,
            ...customeStyles,
            ...props,
            ...(isMobile && props.responsive?.mobile),
            ...(isDesktop && props.responsive?.desktop),
          }}>
          {children}
        </div>
      </Accordion>
    );
  else {
    component = (
      <div
        className={getClass()}
        style={{
          ...props,
          ...customeStyles,
          display: "grid",
          gap: gap,
          ...(isMobile && props.responsive?.mobile),
          ...(isDesktop && props.responsive?.desktop),
        }}>
        {children}
      </div>
    );
  }

  return component;
}
