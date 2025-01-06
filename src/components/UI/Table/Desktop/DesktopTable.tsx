"use client";
import { useRef, useState } from "react";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import RegularOverlay from "../OverLays/Regular/RegularOverlay";
import "./table.scss";
import CellContainer from "../Containers/CellContainer/CellContainer";
import AG_GRID_LOCALE_FA from "../locals/locale.fa";

import InputFilter from "../Components/FloatingFilter/InputFilter/InputFilter";

import { ISearch, ISort } from "@/types/AxiosConfig.type";
import { ITablePropsType } from "../types/table.types";
import { convertStringBooleans } from "@/utils/Converters";




import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

export default function DesktopTable({
  colDefs,
  rowData,
  onCellValueChanged = () => {},
  onCellDoubleClick,
  onCellSingleClick,
  onFilterChange,
  onRowStyle,
  onSortChnage = () => {},
  rowSelection = "single",
  loading = false,
  autoHeight = true,
}: ITablePropsType) {
  const gridRef = useRef<AgGridReact<any>>(null);

  const formatValue = (value: any) => {
    if (!value) return "---";
    return value;
  };

  const GridOptions: AgGridReactProps = {
    multiSortKey: "ctrl",
    rowSelection: "multiple",
    tooltipShowDelay: 250,
    suppressColumnMoveAnimation: true,
    suppressAnimationFrame: true,
    suppressRowHoverHighlight: true,
    loadingOverlayComponent: () => <RegularOverlay />,
    defaultColDef: {
      suppressHeaderMenuButton: true,
      suppressFloatingFilterButton: true,
      suppressHeaderFilterButton: true,
      sortable: true,
      filter: false,
      floatingFilter: false,
      editable: false,
      suppressMovable: false,
      unSortIcon: true,
      cellClass: ["age-border"],
      tooltipValueGetter: () => undefined,
      minWidth: 200,
      cellRenderer: ({ value }: any) => {
        return (
          <CellContainer>
            {value !== undefined && value !== null ? formatValue(value) : "---"}
          </CellContainer>
        );
      },
      floatingFilterComponent: (params: any) => <InputFilter {...params} />,
    },
  };

  return (
    <div
      className='ag-theme-quartz'
      style={{
        height: "100%",
        width: "100%",
      }}>
      <AgGridReact
        ref={gridRef}
        columnDefs={colDefs as any}
        rowData={rowData}
        enableRtl
        localeText={AG_GRID_LOCALE_FA}
        gridOptions={GridOptions}
        onGridReady={(e) => {
          if (autoHeight)
            gridRef.current!.api.setGridOption("domLayout", "autoHeight");
        }}
        getRowStyle={onRowStyle}
        onCellDoubleClicked={onCellDoubleClick}
        onCellValueChanged={(props: any) => {
          onCellValueChanged({
            ...props,
            data: convertStringBooleans(props.data),
          });
          props.api.redrawRows();
        }}
        onFilterChanged={({ api }) => {
          const filterModels = api.getFilterModel();
          const filters: ISearch<any> = {};
          for (let key in filterModels) {
            filters[key] = filterModels[key].filter;
          }
          onFilterChange && onFilterChange(filters);
        }}
        onCellClicked={onCellSingleClick}
        onSortChanged={({ api }) => {
          const sortModel = api.getColumnState().filter((item) => item.sort);
          const sorts: ISort<any> = {};
          for (let key in sortModel) {
            const colId = sortModel[key].colId;
            const value = sortModel[key].sort;
            sorts[colId] = value;
          }
          onSortChnage(sorts);
        }}
        onRowClicked={({ node }) => {
          // onSelectionChnage(node as any);
        }}
        rowSelection={rowSelection}
        loading={loading}
      />
    </div>
  );
}
