import { memo } from "react";
import moment from "moment-jalaali";

export const genericMemo: <T>(
  component: T,
  propsAreEqual?: (
    prevProps: React.PropsWithChildren<T>,
    nextProps: React.PropsWithChildren<T>
  ) => boolean
) => T = memo;

export const GenerateDateFromTo = (
  from_date: string,
  to_date: string,
  data_type: "monthly" | "yearly" | "daily" | "weekly"
) => {
  moment.loadPersian({ usePersianDigits: false });

  let startDate = moment(from_date);
  let endDate = moment(to_date);

  let dates = [];

  while (startDate.isSameOrBefore(endDate)) {
    dates.push(startDate.format("jYYYY-jMM-jDD"));
    if (data_type === "daily") {
      startDate.add(1, "day");
    }
    if (data_type === "weekly") {
      startDate.add(1, "week");
    }
    if (data_type === "monthly") {
      startDate.add(1, "month");
    }
    if (data_type === "yearly") {
      startDate.add(1, "year");
    }
  }

  return dates;
};
