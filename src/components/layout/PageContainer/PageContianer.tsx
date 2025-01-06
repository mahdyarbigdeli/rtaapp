import { useEffect } from "react";
import styles from "./styles.module.scss";
import RegularOverlay from "@/components/UI/OverLays/Regular/RegularOverlay";

interface IProps {
  children: React.ReactElement | React.ReactElement[];
  title: string;
  width?: string;
  height?: string;
  isLoading?: boolean;
  isModal?: boolean;
}

export default function PageContianer({
  children,
  title,
  isLoading = false,
  isModal = false,
}: IProps) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  const getClasses = () => {
    return [
      styles.pageContainer,
      isLoading && styles.isLoading,
      isModal && styles.isModal,
    ].join(" ");
  };

  return (
    <div className={getClasses()}>
      <div className={styles.content}>{children}</div>
      <div className={styles.OverLay}>
        <RegularOverlay />
      </div>
    </div>
  );
}
