import CellContainer from "../../../Containers/CellContainer/CellContainer";
import styles from "./styles.module.scss";

interface ICellImageProps {
  value: string;
}

const placeHolder = "/images/placeHolders/table-place-holder.png";

export default function CellImage({ value }: ICellImageProps) {


  return (
    <CellContainer>
      <img
        src={value || placeHolder}
        className={styles.cellImage}
        onError={(event) => {
          event.preventDefault();
          event.currentTarget.src = placeHolder;
        }}
      />
    </CellContainer>
  );
}
