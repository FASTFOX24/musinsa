import { useEffect } from "react";
import * as S from "@/styles/AlertModal.styles";

interface AlertModalProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  title: string;
  content: string;
  confirmText?: string;
}

const AlertModal = ({
  open,
  handleClose,
  handleConfirm,
  title,
  content,
  confirmText = "확인",
}: AlertModalProps) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);


  if (open === false) return null;

  return (
    <S.ModalOverlay $isOpen={open} onClick={handleClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.ModalTitle>{title}</S.ModalTitle>
        <S.ModalBody>
          <S.ModalText>{content}</S.ModalText>
        </S.ModalBody>
        <S.ModalButtons>
          <S.ConfirmButton onClick={handleConfirm}>{confirmText}</S.ConfirmButton>
          <S.CancelButton onClick={handleClose}>취소</S.CancelButton>
        </S.ModalButtons>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default AlertModal;

