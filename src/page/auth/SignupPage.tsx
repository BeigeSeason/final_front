import { useState, useEffect } from "react";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isAllValid, setIsAllValid] = useState(false);

  const isFormFilled =
    username && email && password && confirmPassword && name && nickname;

  useEffect(() => {
    const noErrors = Object.values(errors).every((error) => error === "");
    setIsAllValid(noErrors);
  }, [errors]);

  // 아이디 유효성 검사 ---------------
  const validateUsername = (value: string) => {
    if (!/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{5,}$/.test(value)) {
      return "아이디는 영어 또는 숫자를 사용한 5자 이상이어야 합니다.";
    }
    return "";
  };

  // 이메일 유효성 검사 --------------------
  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "유효한 이메일 주소가 아닙니다.";
    }
    return "";
  };

  // 비밀번호 유효성 검사 ------------------
  const validatePassword = (value: string) => {
    if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(value)) {
      return "비밀번호는 영어, 숫자, 특수문자를 포함해야 하며 8자 이상이어야 합니다.";
    }
    return "";
  };

  // 비밀번호 재확인 검사 ---------------------
  const validateConfirmPassword = (
    password: string,
    confirmPassword: string
  ) => {
    if (password !== confirmPassword) {
      return "비밀번호가 일치하지 않습니다.";
    }
    return "";
  };

  // 이름 유효성 검사 ------------------
  const validateName = (value: string) => {
    if (value.length < 2) {
      return "이름은 2글자 이상이어야 합니다.";
    }
    return "";
  };

  // 닉네임 유효성 검사 -------------------
  const validateNickname = (value: string) => {
    if (value.length < 2) {
      return "닉네임은 2글자 이상이어야 합니다.";
    }
    return "";
  };

  const validateField = async (
    field: string,
    value: string,
    password?: string
  ) => {
    let errorMessage = "";

    if (field === "username") {
      errorMessage = await validateUsername(value);
    }

    if (field === "email") {
      errorMessage = validateEmail(value);
    }

    if (field === "password") {
      errorMessage = validatePassword(value);
    }

    if (field === "confirmPassword" && password) {
      errorMessage = validateConfirmPassword(password, value);
    }

    if (field === "name") {
      errorMessage = validateName(value);
    }

    if (field === "nickname") {
      errorMessage = validateNickname(value);
    }

    setErrors((prev) => ({ ...prev, [field]: errorMessage }));
  };

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>, field: string) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setter(value);
      if (field === "confirmPassword") {
        validateField(field, value, password);
      } else {
        validateField(field, value);
      }
    };

  const handleUsernameChange = handleInputChange(setUsername, "username");
  const handleEmailChange = handleInputChange(setEmail, "email");
  const handlePasswordChange = handleInputChange(setPassword, "password");
  const handleConfirmPasswordChange = handleInputChange(
    setConfirmPassword,
    "confirmPassword"
  );
  const handleNameChange = handleInputChange(setName, "name");
  const handleNicknameChange = handleInputChange(setNickname, "nickname");

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

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO:
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
            <div className="signupBox">
              {errors.username && (
                <p className="errmsg" style={{ color: "red" }}>
                  {errors.username}
                </p>
              )}
              <InputBox
                className="inputbox"
                id="username"
                value={username}
                onChange={handleUsernameChange}
                placeholder="아이디 입력"
                required
              />
            </div>
            <div className="signupBox">
              {errors.email && (
                <p className="errmsg" style={{ color: "red" }}>
                  {errors.email}
                </p>
              )}
              <InputBox
                className="inputbox"
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="이메일 입력"
                required
              />
            </div>

            <div className="signupBox">
              {errors.password && (
                <p className="errmsg" style={{ color: "red" }}>
                  {errors.password}
                </p>
              )}
              <InputBox
                className="inputbox"
                id="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="비밀번호 입력"
                required
              />
            </div>
            <div className="signupBox">
              {errors.confirmPassword && (
                <p className="errmsg" style={{ color: "red" }}>
                  {errors.confirmPassword}
                </p>
              )}
              <InputBox
                className="inputbox"
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="비밀번호 재확인"
                required
              />
            </div>
            <div className="signupBox">
              {errors.name && (
                <p className="errmsg" style={{ color: "red" }}>
                  {errors.name}
                </p>
              )}
              <InputBox
                className="inputbox"
                id="name"
                value={name}
                onChange={handleNameChange}
                placeholder="이름 입력"
                required
              />
            </div>
            <div className="signupBox">
              {errors.nickname && (
                <p className="errmsg" style={{ color: "red" }}>
                  {errors.nickname}
                </p>
              )}
              <InputBox
                className="inputbox"
                id="nickname"
                value={nickname}
                onChange={handleNicknameChange}
                placeholder="닉네임 입력"
                required
              />
            </div>
            <Button type="submit" disabled={!isFormFilled || !isAllValid}>
              회원가입
            </Button>
          </form>

          <CheckModal isOpen={showModal} onClose={handleCloseModal}>
            회원가입이 완료되었습니다!
          </CheckModal>
        </div>
      )}
    </AuthBox>
  );
};
