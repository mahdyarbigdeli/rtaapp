import { useEffect, useState } from "react";
import { IFieldType } from "../../types/Field.types";

import Select from "react-select";

type Props<T> = {
  styles: any;
} & IFieldType<T>;

export default function FieldSelect<T>(props: Props<T>) {
  const { type, value } = props;

  const [_value, setValues] = useState<any>(value);
  useEffect(() => {
    if (type !== "select") return;
    if (selectMode === "multi") return;

    const find = options.find((item) => item[selectKeys.value] === value);
    setValues(find);
  }, [value]);

  const root = document.querySelector("body");

  const [targetPortal, setTargetPortal] = useState(root as Element);

  useEffect(() => {
    setTimeout(() => {
      const isInsideModal = document.querySelector(
        ".react-responsive-modal-root",
      );
      if (isInsideModal) {
        setTargetPortal(isInsideModal);
      }
    }, 100);
  }, []);

  if (type !== "select") return <></>;
  const {
    name,
    onChange,
    options,
    selectKeys,
    selectMode,
    styles,
    disabled,
    icon,
    isShow,
    placeHodler,
    readOnly,
    title,
    validation,
    viariant,
  } = props;

  return (
    <Select
      options={options.map((item) => ({
        ...item,
        label: item[selectKeys.label],
        value: item[selectKeys.value],
      }))}
      isMulti={selectMode === "multi"}
      onChange={(values) => onChange(values)}
      placeholder={"انتخاب کنید ...."}
      value={value}
      isSearchable={false}
      styles={{
        container(base, props) {
          return {
            ...base,
            width: "100%",
            maxWidth: "100%",
            color: "#000000",
            fontFamily: "iran-sans",
          };
        },
        control(base, props) {
          return {
            ...base,
            backgroundColor: "transparent",
            border: "none !important",
            outline: "none !important",
            boxShadow: "none !important",
            fontFamily: "iran-sans",
          };
        },
        menu(base, props) {
          return {
            ...base,
            backgroundColor: "white",
            width: "max-content",
            minWidth: "100%",
            fontFamily: "iran-sans",
          };
        },
        option(base, props) {
          return {
            ...base,
            backgroundColor: "transparent",
            color: "var(--color-primary)",
            fontFamily: "iran-sans",
          };
        },
        placeholder(base, props) {
          return {
            ...base,
            color: "white",
          };
        },
        singleValue(base, props) {
          return {
            ...base,
            color: "white",
          };
        },
      }}
      menuPortalTarget={targetPortal as any}
      isRtl
    />
  );
}
