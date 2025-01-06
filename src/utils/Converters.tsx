import moment from "moment-jalaali";

// @ts-expect-error
import domToPdf from "dom-to-pdf";

export const dateToJalai = (value: Date, placeHolder?: string) => {
  const m = moment(value);
  const formated = m.format("jYYYY-jMM-jDD");
  const isNan = formated.includes("NaN");
  if (isNan || !value) return placeHolder || "---";
  return formated;
};

export const getTimeFromDate = (value: Date) => {
  const date = new Date(value);
  const time = moment(date);
  return `${time.hours()}:${time.minutes()}:${time.seconds()}`;
};

export function convertStringBooleans(obj: any) {
  if (typeof obj === "object" && obj !== null) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] === "true") {
          obj[key] = true;
        } else if (obj[key] === "false") {
          obj[key] = false;
        } else if (typeof obj[key] === "object") {
          convertStringBooleans(obj[key]);
        }
      }
    }
  }
  return obj;
}

export const RenderPrice = ({ price }: { price: number }) => {
  return `${price.toLocaleString()} تومان`;
};

export const ToJson = (data: any) => {
  return JSON.stringify(data);
};

export function ResolveNestedOBject(path: string, obj = self, separator = ".") {
  var properties = Array.isArray(path) ? path : path.split(separator);
  return properties.reduce((prev, curr) => prev?.[curr], obj);
}
