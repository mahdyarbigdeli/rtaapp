import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

interface ICellSelectProp {
  options: any[];
  value: any;
  api: any;
  node: any;
  column: any;
}

export default function CellSelect({
  options,
  api,
  node,
  value,
  column,
}: ICellSelectProp) {
  const [selectOptions, setSelectOptions] = useState([
    {
      label: "همه",
      value: undefined,
      color: "transparent",
    },
    ...options,
  ]);

  const [selectedColor, setSelectedColor] = useState<any>(undefined);

  const handleChange = (e: any) => {
    const { colDef } = column;
    const { cellDataType } = colDef;
    api.stopEditing();

    const selectedValue = e.target.value;
    let parsedValue;

    if (cellDataType === "number") {
      parsedValue = Number.parseFloat(selectedValue);
    } else {
      parsedValue = selectedValue;
    }

    node.setDataValue(fieldName, parsedValue);
  };

  const fieldName = column?.colId;

  useEffect(() => {
    const color = options.find((item: any) => {
      return item?.value === value;
    })?.color;

    if (color) setSelectedColor(color);
    else {
      const firstOptions = options[0];
      if (firstOptions) {
        const color = firstOptions?.color;
        if (color) {
          setSelectedColor(color);
          return;
        }
      }

      setSelectedColor("-bs-primary-dark");
    }
  }, [value]);

  useEffect(() => {
    if (value) {
    } else {
      api.stopEditing();
      node.setDataValue(fieldName, options[0].value);
    }
  }, [value]);

  return (
    <div
      key={value}
      className={styles.SelectCell}
      style={{
        backgroundColor: selectedColor,
      }}>
      <select
        defaultValue={value || selectOptions[0].value}
        onChange={handleChange}
        name={fieldName}>
        {selectOptions.map((option: any, index: number) => {
          return (
            <option
              key={index}
              value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}
