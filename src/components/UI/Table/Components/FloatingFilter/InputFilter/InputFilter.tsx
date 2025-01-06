import { useEffect, useState } from "react";

import styles from "./styles.module.scss";

function InputFilter({ parentFilterInstance }: any) {
  const [filterData, setFilterData] = useState<any>(undefined);

  useEffect(() => {
    if (!filterData) return;
    const delayDebounceFn = setTimeout(() => {
      handleChange(filterData);
      // Send Axios request here
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [filterData]);

  const handleChange = (e: any) => {
    const value = e.target.value;
    parentFilterInstance((instance: any) => {
      instance.onFloatingFilterChanged("equal", value);
    });
  };

  return (
    <div className={styles.cellContainer}>
      <input
        className={styles.input}
        type='text'
        placeholder=''
        onChange={(e) => setFilterData(e)}
      />
    </div>
  );
}

export default InputFilter;
