import { useState } from "react";
import { AuthBox, ResultBox } from "../../style/AuthStyled";
import { InputBox } from "../../component/InputComponent";
import { Button } from "../../component/ButtonComponent";
import { CheckModal } from "../../component/ModalComponent";

export const FindPwPage = () => {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isFormValid = id.trim() !== "" && email.trim() !== "";

  const handleSubmit = () => {
    setIsModalOpen(true);
  };
  return (
    <AuthBox>
      <h2>임시 비밀번호 발급</h2>
      <InputBox
        type="text"
        placeholder="아이디 입력"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <InputBox
        type="email"
        placeholder="이메일 입력"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button onClick={handleSubmit} disabled={!isFormValid}>
        비밀번호 찾기
      </Button>
      <CheckModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ResultBox>{email}로 임시 비밀번호가 발급되었습니다.</ResultBox>
      </CheckModal>
    </AuthBox>
  );
};
