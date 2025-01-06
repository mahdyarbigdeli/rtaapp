import styles from "./styles.module.scss";
import CellContainer from "../../../Containers/CellContainer/CellContainer";

interface ICellSelectProp {
  value: any;
  api: any;
  node: any;
  column: any;
}

export default function CellPrice({ value }: ICellSelectProp) {
  return (
    <CellContainer>
      <div className={styles.cellPrice}>
        <>
          <span>{(value as number).toLocaleString()}</span>
          <small>تومان</small>
        </>
      </div>
    </CellContainer>
  );
}
