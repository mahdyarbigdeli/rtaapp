import React, { CSSProperties, InputHTMLAttributes } from "react";
import { IVariant } from "@/types/Variables";

type IMultiValue<T> = {
  selectMode: "multi";
  value: T[];
  onChange: (event: T[]) => void;
};

type ISingleValue<T> = {
  selectMode: "single";
  value: T;
  onChange: (event?: T) => void;
};

type ISelectMode<T> = ISingleValue<T> | IMultiValue<T>;

export type ITextFieldType = {
  type: "text" | "password" | "number";
  length?: {
    min: number;
    max: number;
  };
  value: string | number;
  onChange: (event: any) => void;
};

export type ITextAreaFieldType = {
  type: "textarea";
  textAreaSize?: {
    col: number;
    row: number;
  };
  length?: {
    min: number;
    max: number;
  };
  onChange: (event: any) => void;
};

export type IRadioFieldType = {
  type: "radio";
  value: string;
  checked: boolean | undefined;
  onChange: (event: any) => void;
};

export type IColorFieldType = {
  type: "color";
  value: string;
  onChange: (event: any) => void;
  length?: {
    min: number;
    max: number;
  };
};

export type ICheckBoxFieldType = {
  type: "checkbox";
  checked: boolean | undefined;
  onChange: (event: any) => void;
};

export type ISwitchFieldType = {
  type: "switch";
  onChange: (event: boolean) => void;
};

export type IFileFieldType<T = any> = {
  type: "file";
  accept: InputHTMLAttributes<any>["accept"];
} & ISelectMode<T>;

export type ICustomeFieldType = {
  type: "custome";
  children: React.ReactElement | React.ReactElement[];
};

export type IFieldImagePreview = {
  type: "image-preview";
};

export type IFileSystemFieldType<T> = {
  type: "file-system";
  accept: InputHTMLAttributes<any>["accept"];
} & ISelectMode<T>;

export type IModalFieldTypeSingle<T> = {
  selectMode: "single";
  value?: any;
  onChange: (values?: T) => void;
};

export type IModalFieldTypeMultiple<T> = {
  selectMode: "multi";
  value: any[];
  onOpenModal: (value: string) => void;
  onChange: (values: T[]) => void;
};

export type IModalFieldType<T> = {
  type: "modalField";
  editable: boolean;
  selectKeys: {
    labelKey: keyof T;
    valueKey: keyof T;
  };
  onOpenModal: () => void;
} & (IModalFieldTypeSingle<T> | IModalFieldTypeMultiple<T>);

export type IFieldSelectType<T> = {
  type: "select";
  selectKeys: {
    label: keyof T;
    value: keyof T;
  };
  options: T[];
} & ISelectMode<T>;

export type IFieldDateType = {
  type: "date";
  onChange: (date?: string) => void;
  min?: string;
  max?: string;
};

export type IFieldMapType<T> = {
  type: "map";
} & ISelectMode<T>;

export type IBase<T = any> = {
  name: string;
  value: any;
  placeHodler?: string;
  title?: string;
  disabled?: boolean;
  styles?: CSSProperties;
  validation?: {
    message?: string | undefined;
    onValid?: () => void;
    tooltip?: boolean;
  };
  readOnly?: boolean;
  icon?: JSX.Element | React.ReactElement;
  viariant?: IVariant | "glassMorphism";
  isShow?: boolean;
  debounce?: number;
} & (
  | ITextFieldType
  | IRadioFieldType
  | ITextAreaFieldType
  | ICheckBoxFieldType
  | ISwitchFieldType
  | IFileFieldType
  | ICustomeFieldType
  | IFieldImagePreview
  | IColorFieldType
  | IFieldSelectType<T>
  | IFieldMapType<T>
  | IFileSystemFieldType<T>
  | IModalFieldType<T>
  | IFieldDateType
);

export type IFieldType<T = any> = {} & IBase<T>;
