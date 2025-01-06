import Flex from "@/components/UI/Flex/Flex";
import { IBoxProps } from "../../Box";

import styles from "./styles.module.scss";

interface IProps {
  isFieldSet: boolean;
  legend: IBoxProps["legend"];
  icon?: JSX.Element;
  header: IBoxProps["header"];
}

export default function BoxHeader({
  isFieldSet,
  legend,
  icon,
  header,
}: IProps) {
  const isFieldClass = [styles.legendFielSet].join(" ");
  const isNotFieldClass = [styles.header, "draggable-header"].join(" ");

  if (isFieldSet) {
    return (
      <legend
        style={{
          color: "var(--color-dark-1)",
          ...legend?.style,
        }}
        className={isFieldClass}>
        <Flex
          alignItems='center'
          gap='0.25rem'>
          {icon}
          <span>{header}</span>
        </Flex>
      </legend>
    );
  }

  if (!isFieldSet) {
    return (
      <div
        className={isNotFieldClass}
        style={{ ...legend?.style }}>
        {icon}
        <span>{header}</span>
      </div>
    );
  }
}
