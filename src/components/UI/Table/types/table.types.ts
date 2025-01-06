import { ISearch, ISort } from "@/types/AxiosConfig.type";
import { CellValueChangedEvent, ColDef, IRowNode } from "@ag-grid-community/core";

export interface IResponse<T> {
  data: T[] | T;
  meta: IMeta;
}

export interface IMeta {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

export interface ILink {
  url?: string;
  label: string;
  active: boolean;
}

export interface ITablePropsType {
  colDefs: ColDef[];
  rowData: any[];
  onCellValueChanged?: (props: CellValueChangedEvent<any, any>) => void;
  onCellDoubleClick?: (e: any) => void;
  onCellSingleClick?: (e: any) => void;
  onFilterChange?: (filters: ISearch<any>) => void;
  onRowStyle?: (params: any) => any;
  onSortChnage?: (value: ISort<any>) => void;
  onRenderRow?: (node: IRowNode<any>) => void;
  rowSelection?: "single" | "multiple";
  loading?: boolean;
  autoHeight?: boolean;
}
