import { useState } from "react";
import { AuthBox, ResultBox, FindBox } from "../../style/AuthStyled";
import { InputBox } from "../../component/InputComponent";
import { Button } from "../../component/ButtonComponent";
import { CheckModal } from "../../component/ModalComponent";
import AxiosApi from "../../api/AxiosApi";
import { useNavigate } from "react-router-dom";

export const FindIdPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [foundId, setFoundId] = useState<string | null>(null);
  const isFormValid = name.trim() !== "" && email.trim() !== "";
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (isFormValid) {
      const result = await AxiosApi.findMemberId(name, email); // AxiosApi 사용
      setFoundId(result);
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    if (foundId) {
      navigate("/");
    }
  };

  return (
    <>
      <AuthBox>
        <h2>아이디 찾기</h2>
        <FindBox>
          <InputBox
            className="inputbox"
            type="text"
            placeholder="이름 입력"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputBox
            className="inputbox"
            type="email"
            placeholder="이메일 입력"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FindBox>
        <Button onClick={handleSubmit} disabled={!isFormValid}>
          아이디 찾기
        </Button>
      </AuthBox>
      <CheckModal isOpen={isModalOpen} onClose={handleModalClose}>
        <ResultBox>
          <h4>아이디 찾기 결과</h4>
          <div className="findId">
            <p>{foundId ? ` ${foundId}` : "아이디를 찾을 수 없습니다."}</p>
          </div>
        </ResultBox>
      </CheckModal>
    </>
  );
};
