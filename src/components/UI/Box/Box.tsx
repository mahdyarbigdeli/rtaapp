"use client";
import styles from "./styles.module.scss";
import { CSSProperties } from "react";
import RegularOverlay from "../Table/OverLays/Regular/RegularOverlay";
import BoxHeader from "./components/BoxHeader/BoxHeader";
import { ISize, IVariant } from "@/types/Variables";

export interface IBoxProps {
  children?: JSX.Element | JSX.Element[] | React.ReactElement;
  header: string;
  icon?: JSX.Element;
  border?: {
    thickness?: ISize;
    variant?: IVariant | "default";
  };
  isFieldSet?: boolean;
  fontSize?: {
    header?: ISize;
  };
  style?: CSSProperties;
  legend?: {
    style?: CSSProperties;
    component?: JSX.Element | JSX.Element[];
  };
  isLoading?: boolean;
  showHeader?: boolean;
  glassMorphism?: boolean;
  resizable?: boolean;
  movable?: boolean;
  pageController?: {
    closeButton: boolean;
    minimizeButton: boolean;
    sizeButton: boolean;
    refresh: {
      show: boolean;
      onClick: () => void;
    };
  };
}

export default function Box({
  children,
  header,
  icon,
  isFieldSet = false,
  style = {},
  legend,
  isLoading = false,
  showHeader = true,
  glassMorphism = false,
  pageController = {
    closeButton: false,
    minimizeButton: false,
    sizeButton: false,
    refresh: {
      show: false,
      onClick() {},
    },
  },
}: IBoxProps) {
  const getClass = () => {
    const classs = [
      styles.box,
      isLoading && styles.loading,
      glassMorphism && styles.glassMorphism,
      isFieldSet && styles.isFieldSet,
    ];

    return classs.join(" ");
  };

  return (
    <fieldset
      className={getClass()}
      style={{
        width: "100%",
        height: "100%",
        ...style,
      }}>
      {showHeader && (
        <BoxHeader
          header={header}
          icon={icon}
          isFieldSet={isFieldSet}
          legend={legend}
        />
      )}
      <div className={styles.content}>{children}</div>
      {isLoading && (
        <div className={styles.OverLay}>
          <RegularOverlay />
        </div>
      )}
    </fieldset>
  );
}
