import { useState } from "react";
import { Button, CancelButton } from "../component/ButtonComponent";
import { Modal, CheckModal, CloseModal } from "../component/ModalComponent";
import { GlobalFont } from "../style/GlobalStyled";

export const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    handleCloseModal(); // 모달 닫기
  };
  return (
    <>
      <GlobalFont />
      <div>
        <Button onClick={handleOpenModal}>확인</Button>
        <CancelButton>취소</CancelButton>
        <p>메인페이지입니다.</p>
      </div>
      <CloseModal isOpen={isModalOpen} onClose={handleCloseModal}>
        모달 테스트
      </CloseModal>
    </>
  );
};
