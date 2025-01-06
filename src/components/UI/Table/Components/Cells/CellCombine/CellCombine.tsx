import styles from "./CellCombin.module.scss";

interface ICellCombine {
  primaryValue: any;
  secondaryValue: any;
  direction?: "row" | "column";
}

export default function CellCombine({
  primaryValue,
  secondaryValue,
  direction = "row",
}: ICellCombine) {
  return (
    <div
      style={{
        flexDirection: direction,
      }}
      className={styles.cell}>
      <span>{primaryValue}</span>
      <small>{secondaryValue}</small>
    </div>
  );
}
