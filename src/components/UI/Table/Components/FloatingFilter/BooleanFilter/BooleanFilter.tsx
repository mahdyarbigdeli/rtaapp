import { useEffect, useState } from "react";

import styles from "./styles.module.scss";
import { IFloatingFilterParams } from "@ag-grid-community/core";

interface IOptiosType {
  label: string;
  value: any;
}

interface ISelectOptions extends IFloatingFilterParams {
  options: IOptiosType[];
}

function BooleanFilter({ options, parentFilterInstance }: ISelectOptions) {
  const [selectOptions, setSelectOptions] = useState<IOptiosType[]>([]);
  const handleChange = (e: any) => {
    const value = e.target.value && JSON.parse(e.target.value);

    parentFilterInstance((instance) => {
      instance.onFloatingFilterChanged("equal", value);
    });
  };

  useEffect(() => {
    const resetOptions = {
      value: "",
      label: "همه",
    };

    setSelectOptions([resetOptions, ...options]);
  }, [options]);

  return (
    <div className={styles.cellContainer}>
      <select
        onChange={(e) => handleChange(e)}
        className={styles.select}
        name=''
        id=''>
        {selectOptions.map((item) => {
          return (
            <option
              key={item.value}
              value={item.value}>
              {item.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default BooleanFilter;
