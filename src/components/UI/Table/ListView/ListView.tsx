import styles from "./ListView.module.scss";
import { IMeta } from "../types/table.types";
import Pagination from "../Desktop/Pagination";
import DesktopTable from "../Desktop/DesktopTable";
import {
  CellValueChangedEvent,
  ColDef,
  IRowNode,
} from "@ag-grid-community/core";
import { CSSProperties } from "react";
import CellContainer from "../Containers/CellContainer/CellContainer";
import CellCheckBox from "../Components/Cells/CellCheckBox/CellCheckBox";
import { CustomCellRendererProps } from "ag-grid-react";
import { cleanedColDef } from "../utils/TableUtills";
import { ISort } from "@/types/AxiosConfig.type";
interface ListViewType<T> {
  data: any[];
  isLoading: boolean;
  forceRefresh: () => void;
  colDefs: ColDef[];
  onCellValueChange?: (props: CellValueChangedEvent<any, any>) => void;
  onFilterChange: (filters: any) => void;
  onSortChange: (sorts: ISort<T>) => void;
  onCellSingleClick?: (cell: { data: T }) => void;
  onCellDoubleClick?: (cell: { data: T }) => void;
  onSelectionChange?: (data: T[]) => void;
  onRowStyle?: (params: {
    data: T;
    rowIndex: number;
  }) => CSSProperties | undefined;
  autoHeight?: boolean;
  tableKey: string;
  pagination?: {
    meta: IMeta;
    currentPage: number;
    nextPage: () => void;
    setCurrentPage: (page: number) => void;
  };
  rowSelection?: "single" | "multiple";
  RowSelectionConfig?: {
    showSelectCheckBox: boolean;
    defaultSelectedRows: T[];
    labelKey: keyof T;
    valueKey: keyof T;
    onSelectRow: (data: T) => void;
    onUnSelectRow: (data: T) => void;
    selectMode: "single" | "multiple";
  };
  onRednerRow?: (row: IRowNode<T>) => void;
  forceMode?: "mobile" | "desktop" | "both";
}
export default function ListView<T>(props: ListViewType<T>) {
  const {
    data,
    isLoading,
    colDefs: initialColDef,
    onCellValueChange = () => {},
    onCellDoubleClick = () => {},
    onFilterChange,
    onCellSingleClick,
    onRowStyle,
    autoHeight = false,
    onSortChange,
    pagination,
    rowSelection,
    onRednerRow,
    RowSelectionConfig,
  } = props;

  const RenderPagination = () => {
    if (!pagination) return <></>;
    const { currentPage, meta, nextPage, setCurrentPage } = pagination;

    return (
      <div className={styles.tableFooter}>
        <Pagination
          meta={meta}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          className={styles.pagination}
        />
      </div>
    );
  };

  const SelectColumn: ColDef = {
    headerName: "انتخاب",
    field: "indexSelector",
    maxWidth: 100,
    editable: false,
    sortable: false,
    hide: !!RowSelectionConfig?.showSelectCheckBox === false,
    cellRenderer: (
      rowProps: CustomCellRendererProps & {
        value: boolean;
        data: T;
        rowData: T;
      },
    ) => {
      if (!RowSelectionConfig) return <></>;

      const {
        defaultSelectedRows,
        labelKey,
        onSelectRow,
        onUnSelectRow,
        showSelectCheckBox,
        valueKey,
        selectMode,
      } = RowSelectionConfig;

      const value = rowProps.data[valueKey] || rowProps.rowData[valueKey];

      const isChecked = !!defaultSelectedRows.find(
        (item) => item[valueKey] === value,
      );

      return (
        <CellContainer>
          <CellCheckBox<T>
            {...(rowProps as any)}
            value={isChecked}
            showTitle={false}
            onChange={({ data, value }) => {
              if (value) onSelectRow(data);
              if (!value) onUnSelectRow(data);
            }}
          />
        </CellContainer>
      );
    },
  };

  return (
    <section className={styles.list}>
      <div className={styles.tableBody}>
        <DesktopTable
          rowData={data.map((item) => {
            return {
              ...item,
              indexSelector:
                (RowSelectionConfig &&
                  RowSelectionConfig?.defaultSelectedRows?.find(
                    (target) =>
                      target[RowSelectionConfig["valueKey"]] ===
                      item[RowSelectionConfig["valueKey"]],
                  )) ||
                false,
            };
          })}
          colDefs={[SelectColumn, ...cleanedColDef(initialColDef)]}
          onCellValueChanged={(props: any) => onCellValueChange(props)}
          onFilterChange={onFilterChange}
          onCellSingleClick={onCellSingleClick}
          onRowStyle={onRowStyle}
          onSortChnage={onSortChange}
          rowSelection={rowSelection}
          onRenderRow={onRednerRow}
          loading={isLoading}
          onCellDoubleClick={onCellDoubleClick}
          autoHeight={autoHeight}
        />
      </div>
      <RenderPagination />
    </section>
  );
}
