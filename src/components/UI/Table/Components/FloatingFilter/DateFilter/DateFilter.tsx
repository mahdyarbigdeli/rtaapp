import { IFloatingFilterParams } from "ag-grid-community";
import {
  DatePicker,
  InputRangePicker,
  InputDatePicker,
} from "jalaali-react-date-picker";
import styles from "./styles.module.scss";
import { useState } from "react";
import { dateToJalai } from "@/utils/Converters";
import { Icon } from "@iconify/react/dist/iconify.js";
import moment from "moment-jalaali";

interface ISelectOptions {
  value: any;
  onChange: (date?: string) => void;
}

export default function DateFilter(props: ISelectOptions) {
  const { onChange, value } = props;

  const [dateTitle, setDateTitle] = useState<any>(
    value ? moment(value).format("jYYYY-jMM-jDD") : "",
  );

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`${styles.cellContainer} ${
        dateTitle !== "" && styles.hasValue
      }`}
      onClick={() => {
        setIsOpen((prev) => !prev);
      }}>
      <div className={styles.container}>
        <div className={styles.title}>
          {!value && <Icon icon='clarity:date-solid' />}
          {value && (
            <Icon
              icon='mdi:clear-box'
              onClick={() => {
                onChange(undefined);
              }}
            />
          )}
          <span>{dateTitle}</span>
        </div>
        <InputDatePicker
          open={isOpen}
          onChange={(event: any) => {
            if (!event) return;
            const date = new Date(event._d);
            const result = moment(date).format("YYYY-MM-DD");
            onChange(result);
          }}
          className={styles.input}
          wrapperClassName={styles.input}
        />
      </div>
    </div>
  );
}
