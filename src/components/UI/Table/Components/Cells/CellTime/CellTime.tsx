import { getTimeFromDate } from "@/utils/Converters";
import CellContainer from "../../../Containers/CellContainer/CellContainer";

interface ICellProps {
  value: Date;
}

export default function CellTime({ value }: ICellProps) {
  return (
    <CellContainer>
      <p>{value ? getTimeFromDate(new Date(value)) : "---"}</p>
    </CellContainer>
  );
}
