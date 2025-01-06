import {
  FormatActionColumn,
  FormatBooleanColumn,
  FormatDateColumn,
  FormatImageColumn,
  FormatPriceColumn,
  FormatTimeColumn,
} from "./ColDefFormater";
import { ColDef } from "@ag-grid-community/core";

export const cleanedColDef = (defs: ColDef[]) =>
  defs.map((item) => {
    const dateFormated = FormatDateColumn(item);
    const booleanFormated = FormatBooleanColumn(dateFormated);
    const actionFormated = FormatActionColumn(booleanFormated);
    const timeFormated = FormatTimeColumn(actionFormated);
    const priceFormatted = FormatPriceColumn(timeFormated);
    const imageFormatted = FormatImageColumn(priceFormatted);
    return imageFormatted;
  });
