import { useState } from "react";
import { AuthBox } from "../../style/AuthStyled";
import { SignupTerms1, SignupTerms2 } from "../../component/TermsComponent";
import { Button } from "../../component/ButtonComponent";
import { InputBox } from "../../component/InputComponent";
import { CheckModal } from "../../component/ModalComponent";
import { useNavigate } from "react-router-dom";

export const SignupPage = () => {
  const [isTermsAgreed, setIsTermsAgreed] = useState(false);
  const [isPrivacyAgreed, setIsPrivacyAgreed] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleTermsChange = () => {
    setIsTermsAgreed(!isTermsAgreed);
  };

  const handlePrivacyChange = () => {
    setIsPrivacyAgreed(!isPrivacyAgreed);
  };

  const handleConfirmClick = () => {
    if (isTermsAgreed && isPrivacyAgreed) {
      setShowForm(true);
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 회원가입 로직 적어야댐
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/");
  };

  return (
    <AuthBox>
      <h2>회원가입</h2>
      {!showForm ? (
        <>
          <SignupTerms1 />
          <label>
            <input
              type="checkbox"
              checked={isTermsAgreed}
              onChange={handleTermsChange}
            />
            이용약관에 동의합니다.
          </label>
          <SignupTerms2 />

          <label>
            <input
              type="checkbox"
              checked={isPrivacyAgreed}
              onChange={handlePrivacyChange}
            />
            개인정보 처리방침에 동의합니다.
          </label>
          <Button
            onClick={handleConfirmClick}
            disabled={!isTermsAgreed || !isPrivacyAgreed}
          >
            확인
          </Button>
        </>
      ) : (
        <div>
          <form onSubmit={handleSignup}>
            <div>
              <label htmlFor="username">사용자 이름:</label>
              <InputBox
                id="username"
                value={username}
                onChange={handleUsernameChange}
                placeholder="사용자 이름을 입력하세요"
                required
              />
            </div>
            <div>
              <label htmlFor="password">비밀번호:</label>
              <InputBox
                id="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="비밀번호를 입력하세요"
                required
              />
            </div>
            <Button type="submit">회원가입</Button>
          </form>
          <CheckModal isOpen={showModal} onClose={handleCloseModal}>
            회원가입이 완료되었습니다!
          </CheckModal>
        </div>
      )}
    </AuthBox>
  );
};
