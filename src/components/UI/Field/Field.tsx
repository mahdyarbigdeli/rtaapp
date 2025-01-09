"use client";

import { IFieldType } from "./types/Field.types";
import { useRef } from "react";

import "./styles.module.scss";
import ReactSwitch from "react-switch";
import {Checkbox} from "@mui/joy";

import { genericMemo } from "@/utils/Generator";
import styles from "./styles.module.scss";
import FieldNormal from "./components/FieldNormal/FieldNormal";
import FieldSelect from "./components/FieldSelect/FieldSelect";
import FieldDate from "./components/FieldDate/FieldDate";
import { Icon } from "@iconify/react/dist/iconify.js";

function Component<T>(props: IFieldType<T>) {
  const {
    type,
    disabled,
    icon,
    readOnly,
    title,
    validation,
    value,
    styles: userStyles,
    viariant = "glassMorphism",
  } = props;

  const name = props.name as any;

  const placeHodler = "";

  const inputRef = useRef<any>();

  const RenderTextAreaInput = () => {
    if (type !== "textarea") return <></>;
    const { value, length, onChange } = props;
    return (
      <textarea
        className={`${styles.textArea}`}
        onChange={onChange}
        name={name}
        placeholder={placeHodler}
        title={title}
        value={value}
        readOnly={readOnly}
        autoComplete='new-password'
        minLength={length?.min}
        maxLength={length?.max}
        rows={5}
      />
    );
  };

  const RenderFileInput = () => {
    if (type !== "file") return <></>;
    const { value, accept, onChange, selectMode = "single" } = props;

    const RenderSingle = () => {
      if (selectMode !== "single") return <></>;
      return (
        <>
          {!!value && (
            <div className={styles.hasFile}>
              <Icon icon='ok' />
              <span>فایل انتخاب شده</span>
            </div>
          )}
        </>
      );
    };

    const RenderMulti = () => {
      if (selectMode !== "multi") return <></>;

      const values: File[] = value ? Array(...value) : [];

      return (
        <>
          {!!values && values?.length > 0 && (
            <>
              {values.map((file) => {
                return (
                  <div
                    className={styles.fileItem}
                    key={file.name}
                    onClick={(event) => {
                      const newValues = values.filter((item) => {
                        return item !== file;
                      });
                      onChange(newValues);
                    }}>
                    <Icon icon='file' />
                    <p className={styles.fileName}>{file.name}</p>
                  </div>
                );
              })}
            </>
          )}
        </>
      );
    };

    return (
      <div className={styles.file}>
        <div className={styles.fileList}>
          {RenderSingle()}
          {RenderMulti()}
          <label className={styles.noFile}>
            <Icon icon='lucide:edit' />
            <span>انتخاب فایل</span>
            <input
              className={styles.input}
              ref={inputRef}
              type={"file"}
              onChange={(event) => {
                const files = event.target.files;
                if (files && files?.length !== 0) {
                  if (selectMode === "multi") {
                    onChange(files as any);
                  } else {
                    onChange(files[0] as any);
                  }
                } else {
                  onChange(undefined as any);
                }
              }}
              name={name}
              placeholder={placeHodler}
              title={title}
              readOnly={readOnly}
              accept={accept}
              multiple={selectMode === "multi"}
            />
          </label>
        </div>

        {!!value && (
          <button
            type='button'
            className={styles.deleteButton}
            onClick={() => {
              inputRef.current!!.value = [];
              const changeEvent = new Event("change", { bubbles: true });
              inputRef.current.dispatchEvent(changeEvent);
            }}>
            <Icon icon='delete' />
          </button>
        )}
      </div>
    );
  };

  const RenderRadio = () => {
    if (type !== "radio") return <></>;
    const { value, onChange, checked } = props;

    return (
      <label className={styles.radio}>
        <input
          type='radio'
          value={value}
          onChange={onChange}
          name={name}
          checked={checked}
        />
        <span>{title}</span>
      </label>
    );
  };

  const RenderCheckbox = () => {
    if (type !== "checkbox") return <></>;
    const { checked, onChange } = props;
    return (
      <label className={styles.checkbox}>
        <Checkbox
          onChange={onChange}
          name={name}
          checked={checked}
        />
        <span>{title}</span>
      </label>
    );
  };

  const RenderModalField = () => {
    if (type !== "modalField") return <></>;
    const {
      editable,
      name,
      onChange,
      onOpenModal,
      selectKeys,
      selectMode,
      value,
    } = props;

    const handleOnDelete = (target: T) => {
      if (selectMode === "multi") {
        const temp = value.filter(
          (item: T) =>
            item[selectKeys.valueKey] !== target[selectKeys.valueKey],
        );
        onChange(temp);
      }

      if (selectMode === "single") {
        onChange(undefined);
      }
    };

    const Item = ({
      onDelete,
      label,
      value,
    }: {
      label: string;
      value: any;
      onDelete: () => void;
    }) => {
      return (
        <div
          className={styles.item}
          onClick={onDelete}>
          <Icon icon='delete' />
          <span>{label}</span>
        </div>
      );
    };

    const RenderSingle = () => {
      if (selectMode !== "single") return <></>;
      if (!props.value) return <></>;
      const label = props.value[selectKeys.labelKey] as string;
      const value = props.value[selectKeys.valueKey] as string;
      return (
        <Item
          label={label}
          value={value}
          onDelete={() => handleOnDelete(props.value)}
        />
      );
    };

    const RenderMulti = () => {
      if (selectMode !== "multi") return <></>;

      return value.map((item: T) => {
        const label = item[selectKeys.labelKey] as string;
        const value = item[selectKeys.valueKey] as string;

        return (
          <Item
            label={label}
            value={value}
            onDelete={() => handleOnDelete(item)}
            key={item as any}
          />
        );
      }) as any;
    };

    return (
      <div className={styles.modalField}>
        <div className={styles.items}>
          {RenderSingle()}
          {RenderMulti()}
        </div>
        <div
          className={styles.edit}
          onClick={() => {
            console.log("aliii");
            onOpenModal();
          }}>
          <Icon icon='edit' />
          <span>ویرایش</span>
        </div>
      </div>
    );
  };

  const RenderChildren = () => {
    if (type !== "custome") return <></>;
    const { children } = props;
    return children;
  };

  const RenderSwitch = () => {
    if (type !== "switch") return <></>;

    const { value, onChange } = props;
    return (
      <label className={styles.switch}>
        <ReactSwitch
          checked={value || false}
          onChange={(value) => {
            onChange(value);
          }}
          name={name}
          height={23}
        />
        <span>{title || placeHodler}</span>
      </label>
    );
  };

  const RenderImagePrevew = () => {
    if (type !== "image-preview") return <></>;

    if (value) {
      let src = value;
      if (value.name) {
        src = URL.createObjectURL(value);
      }
      return (
        <img
          className={styles.imagePreview}
          src={src}
        />
      );
    }
    if (!value)
      return (
        <Icon
          className={styles.imagePreview}
          icon='line-md:image'
        />
      );
  };

  const RenderErrorBox = () => {
    if (!validation?.message) return <></>;
    const { tooltip = false } = validation;
    if (validation.message.trim() === "") return <></>;
    const errorIconStyles = [styles.errorBox, tooltip && styles.tooltip].join(
      " ",
    );

    if (tooltip)
      return (
        <Icon
          className={errorIconStyles}
          icon='warning'
        />
      );

    if (!tooltip) {
      return (
        <div className={styles.errorBox}>
          <Icon icon='warning' />
          <span> {validation?.message}</span>
        </div>
      );
    }
  };

  const RenderHeader = () => {
    if (type === "checkbox") return <></>;
    if (type === "radio") return <></>;
    if (type === "switch") return <></>;

    return (
      <legend className={styles.legend}>
        {icon}
        <span>{title}</span>
      </legend>
    );
  };

  const getFieldClasss = () => {
    return [
      styles.field,
      disabled && styles.disabled,
      styles[viariant],
      value && styles.hasValue,
      readOnly && styles.readOnly,
    ].join(" ");
  };

  const RenderFileSystem = () => {
    if (type !== "file-system") return <></>;
    return <></>;
  };

  return (
    <fieldset
      className={getFieldClasss()}
      style={userStyles}>
      {RenderHeader()}
      <FieldNormal
        {...props}
        styles={styles}
      />
      <FieldSelect
        {...props}
        styles={styles}
      />
      <FieldDate
        {...props}
        styles={styles}
      />
      {RenderTextAreaInput()}
      {RenderFileInput()}
      {RenderRadio()}
      {RenderImagePrevew()}
      {RenderFileSystem()}
      {RenderSwitch()}
      {RenderCheckbox()}
      {RenderModalField()}
      {RenderErrorBox()}
      {RenderChildren()}
    </fieldset>
  );
}

const Field = genericMemo(Component, (prev: any, n: any) => {
  const validationChanged = prev.validation?.message !== n.validation?.message;
  const valueChanged = prev.value !== n.value;
  const chackedChanged = prev.checked !== n.checked;
  const disabled = prev.disabled != n.disabled;
  if (validationChanged) return false;
  if (valueChanged) return false;
  if (chackedChanged) return false;
  if (disabled) return false;

  return true;
});

export default Field;
