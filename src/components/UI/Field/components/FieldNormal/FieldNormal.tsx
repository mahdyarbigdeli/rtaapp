import { Icon } from "@iconify/react/dist/iconify.js";
import { IFieldType } from "../../types/Field.types";
import { useEffect, useState } from "react";

type Props<T> = {
  styles: any;
} & IFieldType<T>;

export default function FieldNormal<T>(props: Props<T>) {
  const { type, name, value, placeHodler, styles, title } = props;

  const [isShow, setIsShow] = useState(false);

  const [debouncedValue, setDebouncedValue] = useState("first_time_load");

  useEffect(() => {
    if (debouncedValue === "first_time_load") return;
    if (debounce === 0) {
      onChange(debouncedValue);
      return;
    }
    const timer = setTimeout(() => {
      onChange(debouncedValue);
    }, debounce);

    return () => clearTimeout(timer);
  }, [debouncedValue]);

  if (type === "textarea") return <></>;
  if (type === "radio") return <></>;
  if (type === "checkbox") return <></>;
  if (type === "switch") return <></>;
  if (type === "file") return <></>;
  if (type === "custome") return <></>;
  if (type === "modalField") return <></>;
  if (type === "file-system") return <></>;
  if (type === "image-preview") return <></>;
  if (type === "select") return <></>;
  if (type === "date") return <></>;
  if (type === "map") return <></>;
  const { length, onChange, debounce = 0 } = props;

  return (
    <>
      <input
        className={styles.input}
        type={(isShow && "text") || type}
        onChange={(event) => {
          setDebouncedValue(event as any);
        }}
        name={name}
        placeholder={placeHodler}
        title={title}
        defaultValue={value}
        autoComplete='new-password'
        minLength={length?.min}
        maxLength={length?.max}
        readOnly={false}
      />
      {type === "password" && !isShow && (
        <Icon
          className={styles.hideIcon}
          onClick={() => setIsShow(true)}
          icon='bxs:show'
        />
      )}
      {type === "password" && isShow && (
        <Icon
          className={styles.hideIcon}
          onClick={() => setIsShow(false)}
          icon='mdi:hide'
        />
      )}
    </>
  );
}
