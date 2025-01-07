import { useState } from "react";
import { ISelectModal } from "./SelectModal.type";
import styles from "./SelectModal.module.scss";
import SelectModalContent from "./Content/SelectModalContent";
import Grid from "@/components/UI/Grid/Grid";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
export default function SelectModal<T>(props: ISelectModal<T>) {
  const {
    name,
    type,
    validation,
    icon,
    onSubmit,
    selectKeys,
    isEditable,
    title,
    api,
    colDef,
  } = props;

  const [open, setOpen] = useState(false);

  const OpenModal = () => {
    setOpen(true);
  };
  const CloseModal = () => {
    setOpen(false);
  };

  const ModalComponent = () => {
    return (
      <Modal
        center
        open={open}
        onClose={CloseModal}
        classNames={{
          root: styles.root,
          modal: styles.modal,
          modalContainer: styles.modalContainer,
        }}
        showCloseIcon={false}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Grid className={styles.content}>
          <SelectModalContent
            colDef={colDef}
            api={api}
            onSubmit={(values) => {
              type === "single" && onSubmit(values[0]);
              type === "multi" && onSubmit(values);
              CloseModal();
            }}
            selectKeys={selectKeys}
            selectMode={type}
            values={
              type === "single"
                ? [props.value].filter((item) => !!item)
                : props.values
            }
          />
        </Grid>
      </Modal>
    );
  };

  return [OpenModal, CloseModal, ModalComponent as any];
}
