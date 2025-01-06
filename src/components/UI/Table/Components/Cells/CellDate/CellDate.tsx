import { dateToJalai } from "@/utils/Converters";
import CellContainer from "../../../Containers/CellContainer/CellContainer";

interface ICellProps {
  value: Date;
}

export default function CellDate({ value }: ICellProps) {
  return (
    <CellContainer>
      <p>{dateToJalai(value)}</p>
    </CellContainer>
  );
}
