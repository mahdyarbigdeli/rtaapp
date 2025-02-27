"use client";
import styles from "./styles.module.scss";
import { CSSProperties, useEffect, useState } from "react";
import RegularOverlay from "../Table/OverLays/Regular/RegularOverlay";
import BoxHeader from "./components/BoxHeader/BoxHeader";
import { ISize, IVariant } from "@/types/Variables";
import { Icon } from "@iconify/react/dist/iconify.js";
import Accordion from "../accordion/Accordion";
import Grid from "../Grid/Grid";

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
  alert?: {
    message: string;
    status: "success" | "danger";
    duration: number;
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
  alert,
}: IBoxProps) {
  const getBoxClass = () => {
    const classs = [
      styles.box,
      isLoading && styles.loading,
      glassMorphism && styles.glassMorphism,
      isFieldSet && styles.isFieldSet,
    ];

    return classs.join(" ");
  };

  const getAlertClass = [styles.alert, styles[alert?.status || ""]].join(" ");

  const [isShowAlert, setIsShowAlert] = useState(false);

  useEffect(() => {
    if (!alert) return;
    const { duration, message, status } = alert;
    if (!message) {
      setIsShowAlert(false);
      return;
    }

    setIsShowAlert(true);
    const debounce = setTimeout(() => {
      setIsShowAlert(false);
    }, duration);
    return () => clearTimeout(debounce);
  }, [alert?.message, alert?.duration, alert?.status]);

  return (
    <fieldset
      className={getBoxClass()}
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
      {alert && (
        <Grid expanded={isShowAlert}>
          <div className={getAlertClass}>
            <p>{alert!!.message}</p>
            <Icon icon='ooui:success' />
          </div>
        </Grid>
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
