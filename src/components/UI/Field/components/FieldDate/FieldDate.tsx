import { InputDatePicker } from "jalaali-react-date-picker";
import { IFieldType } from "../../types/Field.types";
import "jalaali-react-date-picker/lib/styles/index.css";

import styles from "./styles.module.scss";
import { dateToJalai } from "@/utils/Converters";
import { useState } from "react";
import useViewSize from "@/hooks/useViewSize";
import { Icon } from "@iconify/react/dist/iconify.js";

type Props<T> = {} & IFieldType<T>;

export default function FieldDate<T>(props: Props<T>) {
  const { type } = props;

  const [isOpen, setIsOpen] = useState(false);

  const { isMobile } = useViewSize();

  if (type !== "date") return <></>;

  const { onChange, value, placeHodler } = props;

  const togglePicker = () => {
    setIsOpen((prev) => !prev);
  };

  const resetDate = () => {
    onChange(undefined);
  };

  const classess = [styles.container, isMobile && styles.isMobilePicker].join(
    " ",
  );

  return (
    <div
      className={classess}
      onClick={togglePicker}>
      <InputDatePicker
        open={isOpen}
        placement={"bottom"}
        wrapperClassName={styles.wrapperClassName}
        onChange={(event) => {
          const value = event?.format("YYYY-MM-DD");
          onChange(value);
        }}
      />

      <div className={styles.picker}>
        <span>{dateToJalai(value, placeHodler)}</span>
        <div className={styles.icons}>
          {isOpen && (
            <Icon
              icon={"ic:baseline-refresh"}
              onClick={resetDate}
            />
          )}
          {isOpen && <Icon icon={"material-symbols:cancel-rounded"} />}
          {isOpen || <Icon icon={"clarity:date-solid"} />}
        </div>
      </div>
    </div>
  );
}
