import { toast } from "react-toastify";

import sweetalert2 from "sweetalert2";

import withReactContent from "sweetalert2-react-content";

export interface QuestionAlertProps {
  title?: string;
  message?: string;
  onConfirm?: () => void;
  onDeny?: () => void;
}

const Swal = withReactContent(sweetalert2);

export const ShowSuccess = (message: string) => {
  toast.success(message);
};

export const ShowError = (message: string) => {
  toast.error(message);
};

export const ShowQuestion = ({
  title,
  onConfirm,
  onDeny,
}: QuestionAlertProps) => {
  Swal.fire({
    icon: "question",
    text: title || "آیا از ادامه فرایند اطمینان دارید؟",
    confirmButtonText: "لغو",
    confirmButtonColor: "red",
    showDenyButton: true,
    denyButtonColor: "green",
    denyButtonText: "تایید",
  }).then((result) => {
    const { isConfirmed, isDenied, isDismissed, dismiss, value } = result;
    isDenied && onConfirm && onConfirm();
    isConfirmed && onDeny && onDeny();
  });
};

export default { ShowErrors: ShowError, ShowQuestion, ShowSuccess };
