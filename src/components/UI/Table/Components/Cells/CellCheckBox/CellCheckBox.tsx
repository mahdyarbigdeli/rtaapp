import { Checkbox } from "@mui/material";
import CellContainer from "../../../Containers/CellContainer/CellContainer";
import styles from "./styles.module.scss";
import { ChangeEvent } from "react";

interface ICellBooleanProps<T> {
  value: boolean;
  api: any;
  node: any;
  column: any;
  onChange?: (props: { value: boolean; data: T }) => void;
  colDef: any;
  showTitle?: boolean;
  data: T;
}

export default function CellCheckBox<T>(props: ICellBooleanProps<T>) {
  const {
    value,
    api,
    onChange = (props) => {},
    showTitle = true,
    data,
  } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (api) {
      api.stopEditing();
    }
    onChange({
      data: data,
      value: e.target.checked,
    });
    const newValue = `${e.target.checked}`;
    // node.setDataValue(field, newValue);
  };

  return (
    <CellContainer>
      <div className={styles.cell}>
        {showTitle && (
          <>
            {value && <span>فعال</span>}
            {!value && <span>غیر فعال</span>}
          </>
        )}
        <Checkbox
          onChange={handleChange}
          sx={{
            color: "white",
            "&.Mui-checked": {
              color: "orange",
            },
            "& .MuiSvgIcon-root": {
              border: "1px solid white", // border color
            },
          }}
          checked={value}
        />
      </div>
    </CellContainer>
  );
}
