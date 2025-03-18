import { Icon } from "@iconify/react/dist/iconify.js";
import { IFieldType } from "../../types/Field.types";
import { useEffect, useState, useRef } from "react";

type Props<T> = {
  styles: any;
} & IFieldType<T>;

export default function FieldNormal<T>(props: Props<T>) {
  const {
    type,
    name,
    value,
    placeHodler,
    styles,
    title,
    persianLetterFormmater = false,
  } = props;

  const [isShow, setIsShow] = useState(false);
  const [previewValue, setPreviewValue] = useState(
    persianLetterFormmater ? Number.parseInt(value).toLocaleString() : value,
  );

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
  const { onChange } = props;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!persianLetterFormmater) {
      setPreviewValue(e.target.value);
      onChange(e);
      return;
    }

    const rawValue = e.target.value.replace(/,/g, ""); // Remove commas
    if (!/^\d*$/.test(rawValue)) return; // Ensure only numbers

    if (!rawValue) {
      setPreviewValue(rawValue);
      onChange(e);
      return;
    }

    const formattedValue = persianLetterFormmater
      ? Number.parseInt(rawValue).toLocaleString()
      : rawValue;

    setPreviewValue(formattedValue);
    const temp = e;
    temp.target.value = rawValue;
    onChange(temp);
  };

  useEffect(() => {
    setPreviewValue(
      !!value === false
        ? ""
        : persianLetterFormmater
        ? Number.parseInt(value).toLocaleString()
        : value,
    );
  }, [value]);

  return (
    <>
      <input
        className={styles.input}
        type={"text"}
        onChange={handleInputChange}
        value={previewValue}
        defaultValue={previewValue}
        name={name}
        placeholder={placeHodler}
        title={title}
        autoComplete='new-password'
        readOnly={false}
        dir='ltr'
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
