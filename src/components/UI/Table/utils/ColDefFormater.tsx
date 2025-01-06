import DateFilter from "@/components/UI/Table/Components/FloatingFilter/DateFilter/DateFilter";
import { ColDef } from "@ag-grid-community/core";
import CellDate from "@/components/UI/Table/Components/Cells/CellDate/CellDate";
import TimeFilter from "@/components/UI/Table/Components/FloatingFilter/TimeFilter/TimeFilter";
import CellTime from "@/components/UI/Table/Components/Cells/CellTime/CellTime";
import CellBoolean from "@/components/UI/Table/Components/Cells/CellBoolean/CellBoolean";
import BooleanFilter from "@/components/UI/Table/Components/FloatingFilter/BooleanFilter/BooleanFilter";
import CellPrice from "@/components/UI/Table/Components/Cells/CellPrice/CellPrice";
import CellImage from "@/components/UI/Table/Components/Cells/CellImage/CellImage";
import { dateToJalai, getTimeFromDate } from "@/utils/Converters";

export const FormatDateColumn = (item: ColDef) => {
  if (
    item.filter === "agDateColumnFilter" ||
    item.cellDataType === "date" ||
    item.field === "created_at" ||
    item.field === "updated_at"
  ) {
    item = {
      ...item,
      floatingFilterComponent: (props: any) => {
        return <DateFilter {...props} />;
      },
      filter: "agDateColumnFilter",
      filterParams: {
        comparator: function (filterLocalDateAtMidnight: any, cellValue: any) {
          if (!cellValue) return 1;
          const filterDate = filterLocalDateAtMidnight.getTime();
          const cellDate = new Date(cellValue).getTime();
          const jalaliCellDate = dateToJalai(new Date(cellDate));
          const jalaliFilterDate = dateToJalai(new Date(filterDate));
          return jalaliCellDate === jalaliFilterDate ? 0 : 1;

          return 0;
        },
      },
      cellRenderer: ({ value }: any) => <CellDate value={value} />,
      tooltipValueGetter({ value }) {
        if (!value || value.trim() === "") return "تعریف نشده";
        return dateToJalai(value);
      },
    };
  }

  return item;
};

export const FormatTimeColumn = (item: ColDef) => {
  if (item.filter === "agTimeColumnFilter" || item.cellDataType === "time") {
    item = {
      ...item,
      floatingFilterComponent: (props: any) => {
        return <TimeFilter {...props} />;
      },
      filter: "agTimeColumnFilter",
      filterParams: {
        comparator: function (filterLocalDateAtMidnight: any, cellValue: any) {
          if (!cellValue) return 1;
          const filterTime = getTimeFromDate(
            new Date(filterLocalDateAtMidnight),
          );
          const cellTime = getTimeFromDate(new Date(cellValue));
          return 0;
          // return jalaliCellDate === jalaliFilterDate ? 0 : 1;
        },
      },
      cellRenderer: ({ value }: any) => <CellTime value={value} />,
      tooltipValueGetter({ value }) {
        if (!value || value.trim() === "") return "تعریف نشده";
        const time = getTimeFromDate(new Date(value));
        return time;
      },
    };
  }

  return item;
};

export const FormatBooleanColumn = (item: ColDef) => {
  const { cellDataType } = item;

  if (cellDataType === "textBoolean") {
    item = {
      ...item,
      editable: false,
      cellRenderer: (props: any) => {
        return <CellBoolean {...props} />;
      },
      floatingFilterComponent: (props: any) => (
        <BooleanFilter
          {...props}
          options={[
            {
              label: "فعال",
              value: true,
            },
            {
              label: "غیر فعال",
              value: false,
            },
          ]}
        />
      ),
    };
  }

  return item;
};

export const FormatPriceColumn = (item: ColDef) => {
  const { cellDataType } = item;

  if (cellDataType === "price") {
    item = {
      ...item,
      editable: true,
      cellRenderer: (props: any) => {
        return <CellPrice {...props} />;
      },
      cellDataType: "number",
    };
  }

  return item;
};

export const FormatActionColumn = (item: ColDef) => {
  const { field, headerName } = item;
  if (headerName === "عملیات") {
    item = {
      ...item,
      filter: false,
      sortable: false,
      editable: false,
    };
  }

  return item;
};

export const FormatImageColumn = (item: ColDef) => {
  if (item.cellDataType !== "image") return item;
  const column: ColDef = {
    ...item,
    cellRenderer: (props: any) => <CellImage {...props} />,
  };

  return column;
};
