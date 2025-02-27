import { useState } from "react";
import { AuthBox, ResultBox, FindBox } from "../../style/AuthStyled";
import { InputBox } from "../../component/InputComponent";
import { Button } from "../../component/ButtonComponent";
import { CheckModal } from "../../component/ModalComponent";

export const FindIdPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [foundId, setFoundId] = useState(""); // 찾은 아이디 저장
  const isFormValid = name.trim() !== "" && email.trim() !== "";

  const handleSubmit = () => {
    if (isFormValid) {
      const fakeId = "exampleUser123"; // 임시 아이디
      setFoundId(fakeId);
      setIsModalOpen(true);
    }
  };

  return (
    <AuthBox>
      <h2>아이디 찾기</h2>
      <FindBox>
        <InputBox
          type="text"
          placeholder="이름 입력"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputBox
          type="email"
          placeholder="이메일 입력"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FindBox>
      <Button onClick={handleSubmit} disabled={!isFormValid}>
        아이디 찾기
      </Button>
      <CheckModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ResultBox>
          <p>아이디 찾기 결과</p>
          {foundId ? ` ${foundId}` : "아이디를 찾을 수 없습니다."}
        </ResultBox>
      </CheckModal>
    </AuthBox>
  );
};
