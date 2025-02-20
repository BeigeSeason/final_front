import React, { useState } from "react";
import { AuthBox } from "../../style/AuthStyled";
import { SignupTerms1, SignupTerms2 } from "../../component/TermsComponent";
import { Button } from "../../component/ButtonComponent"; // 버튼 컴포넌트 임포트

export const SignupPage = () => {
  const [isTermsAgreed, setIsTermsAgreed] = useState(false);
  const [isPrivacyAgreed, setIsPrivacyAgreed] = useState(false);
  const [showForm, setShowForm] = useState(false);

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
          <h3>회원가입 정보 입력</h3>
          <form>
            <div>
              <label htmlFor="username">사용자 이름:</label>
              <input type="text" id="username" required />
            </div>
            <div>
              <label htmlFor="password">비밀번호:</label>
              <input type="password" id="password" required />
            </div>
            {/* 추가 필드들... */}
            <Button>회원가입</Button>
          </form>
        </div>
      )}
    </AuthBox>
  );
};
