import { useState } from "react";
import styles from "./styles.module.scss";
import CellContainer from "../../../Containers/CellContainer/CellContainer";

export type IStatusType = {
  label: string;
  value: any;
  icon: JSX.Element;
  variant:
    | "success"
    | "warning"
    | "info"
    | "question"
    | "danger"
    | "primary"
    | "indigo"
    | "secondary"
    | "tertiary"
    | "quaternary"
    | "quinary"
    | "senary";
};

interface ICellStatusType {
  options: IStatusType[];
  defaultValue: IStatusType["value"];
  fill?: boolean;
}

export default function CellStatus({
  options,
  defaultValue,
  fill,
}: ICellStatusType) {
  const [currentValue, setCurrentValue] = useState(
    options.find((item) => item.value === defaultValue),
  );

  const getClasse = () => {
    return [
      styles[currentValue?.variant || ""],
      styles.cell,
      fill && styles.fill,
    ].join(" ");
  };

  return (
    <CellContainer>
      <div className={getClasse()}>
        {currentValue?.icon}
        <span>{currentValue?.label}</span>
      </div>
    </CellContainer>
  );
}
