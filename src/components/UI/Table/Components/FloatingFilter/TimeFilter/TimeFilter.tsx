import { IFloatingFilterParams } from "ag-grid-community";
import { DatePicker } from "jalaali-react-date-picker";
import styles from "./styles.module.scss";
import { useState } from "react";
import { dateToJalai } from "@/utils/Converters";
import { Icon } from "@iconify/react/dist/iconify.js";

interface ISelectOptions extends IFloatingFilterParams {}

export default function TimeFilter({ parentFilterInstance }: ISelectOptions) {
  const [dateTitle, setDateTitle] = useState<any>("");

  const handleChange = (value?: Date) => {
    setDateTitle(value ? dateToJalai(value) : "");
    parentFilterInstance((instance) => {
      instance.onFloatingFilterChanged("equal", value);
    });
  };

  const RenderCancel = () => {
    if (dateTitle === "") return <></>;
    return (
      <div
        className={styles.clear}
        onClick={() => handleChange(undefined)}>
        <Icon icon='cancel' />
      </div>
    );
  };

  return (
    <div
      className={`${styles.cellContainer} ${
        dateTitle !== "" && styles.hasValue
      }`}>
      <label className={styles.container}>
        <div className={styles.title}>
          {<Icon icon='date' />}
          <span>{dateTitle || "تنظیم نشده"}</span>
        </div>
        <DatePicker
          onChange={(event: any) => {
            const date = new Date(event._d);
            handleChange(date);
          }}
          className={styles.input}
        />
      </label>
      <RenderCancel />
    </div>
  );
}
