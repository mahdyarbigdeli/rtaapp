import { Switch } from "@mui/material";
import CellContainer from "../../../Containers/CellContainer/CellContainer";
import styles from "./styles.module.scss";
import { ChangeEvent } from "react";

interface ICellBooleanProps {
  value: boolean;
  api: any;
  node: any;
  column: any;
  onChange?: (value: boolean) => void;
  colDef: any;
  showTitle?: boolean;
}

export default function CellBoolean({
  value,
  api,
  node,
  colDef,
  showTitle = true,
}: ICellBooleanProps) {
  const { field } = colDef;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    api.stopEditing();
    node.setDataValue(field, e.target.checked);
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
        <Switch
          defaultChecked={value}
          onChange={handleChange}
        />
      </div>
    </CellContainer>
  );
}
