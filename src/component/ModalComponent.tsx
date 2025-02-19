import React from "react";
import styled from "styled-components";
import { Button, CancelButton } from "./ButtonComponent";

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  display: flex;
  flex-direction: column;
  position: relative;
  animation: slideDown 0.3s ease-out;

  @keyframes slideDown {
    from {
      transform: translateY(-10px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .buttons {
    display: flex;
    flex-direction: row;
    gap: 10px;
    button {
      height: 30px;
    }
  }

  @media (max-width: 768px) {
    scale: 0.7;
  }
`;
const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  color: gray;
`;

// 기본 모달 ------------------------------------------------------------------------------------------
interface ModalProps {
  isOpen: boolean; // 모달의 열림 상태
  onClose: () => void; // 모달 닫기 함수
  onConfirm: () => void; // 확인 버튼 클릭 시 호출되는 함수
  children: React.ReactNode; // 모달의 자식 요소
  confirmText?: string; // 확인 버튼 텍스트 (기본값: "확인")
  cancelText?: string; // 취소 버튼 텍스트 (기본값: "취소")
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  children,
  confirmText = "확인",
  cancelText = "취소",
}) => {
  if (!isOpen) return null;

  return (
    <ModalBackdrop>
      <ModalContent>
        <p>{children}</p>
        <div className="buttons">
          <Button onClick={onConfirm}>{confirmText}</Button>
          <CancelButton onClick={onClose}>{cancelText}</CancelButton>
        </div>
      </ModalContent>
    </ModalBackdrop>
  );
};

// 확인 모달 --------------------------------------------------------------------------------------------------
interface CheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  buttonProps?: React.ComponentProps<typeof Button>;
}

export const CheckModal: React.FC<CheckModalProps> = ({
  isOpen,
  onClose,
  children,
  buttonProps,
}) => {
  if (!isOpen) return null;

  return (
    <ModalBackdrop>
      <ModalContent>
        <p>{children}</p>
        <Button onClick={onClose} {...buttonProps}>
          확인
        </Button>
      </ModalContent>
    </ModalBackdrop>
  );
};

// 닫기 모달------------------------------------------------------------------------------------
interface CloseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
export const CloseModal: React.FC<CloseModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <ModalBackdrop>
      <ModalContent>
        <CloseButton onClick={onClose}>✖</CloseButton>
        <p>{children}</p>
      </ModalContent>
    </ModalBackdrop>
  );
};
