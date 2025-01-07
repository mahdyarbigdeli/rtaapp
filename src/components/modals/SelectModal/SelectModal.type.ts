import { ColDef } from "@ag-grid-community/core";
import { IFieldType } from "@/components/UI/Field/types/Field.types";
import { IUseTableHookProps } from "@/components/UI/Table/Hooks/useTable";

type iSingle<T> = {
  type: "single";
  value: T;
  onSubmit: (value: T) => void;
};

type iMulti<T> = {
  type: "multi";
  values: T[];
  onSubmit: (value: T[]) => void;
};

type IBase<T> = {
  name: string;
  title: string;
  validation: IFieldType["validation"];
  type: "multi" | "single";
  icon: React.ReactElement;
  isEditable: boolean;
  selectKeys: {
    valueKey: keyof T;
    labelKey: keyof T;
  };
  api: IUseTableHookProps<T>["api"];
  colDef: ColDef[];
} & (iSingle<T> | iMulti<T>);

export type ISelectModal<T> = {} & IBase<T>;
