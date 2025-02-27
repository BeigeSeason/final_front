import { useState, useEffect } from "react";
import { AuthBox, TermBox } from "../../style/AuthStyled";
import { SignupTerms1, SignupTerms2 } from "../../component/TermsComponent";
import { Button } from "../../component/ButtonComponent";
import { InputBox } from "../../component/InputComponent";
import { CheckModal, ExitModal } from "../../component/ModalComponent";
import { useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Profile1 from "../../img/profile/profile1.png";
import Profile2 from "../../img/profile/profile2.png";
import Profile3 from "../../img/profile/profile3.png";
import Profile4 from "../../img/profile/profile4.png";
import Profile5 from "../../img/profile/profile5.png";
import Add from "../../img/profile/add.png";
import AxiosApi from "../../api/AxiosApi";

export const SignupPage = () => {
  const [isTermsAgreed, setIsTermsAgreed] = useState(false);
  const [isPrivacyAgreed, setIsPrivacyAgreed] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [userId, setuserId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [updatedProfile, setUpdatedProfile] = useState<string | null>(null);
  const [openEditProfileImgModal, setOpenEditProfileImgModal] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isValid, setIsValid] = useState({
    id: false,
    email: false,
    password: false,
    confirmPassword: false,
    name: false,
    nickname: false,
  });
  const [idChecked, setIdChecked] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);
  const [nicknameChecked, setNicknameChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);

  const navigate = useNavigate();

  const profileImgs = [
    { name: Profile1, alt: "기본1" },
    { name: Profile2, alt: "기본2" },
    { name: Profile3, alt: "기본3" },
    { name: Profile4, alt: "기본4" },
    { name: Profile5, alt: "기본5" },
  ];

  const isFormFilled =
    !!userId &&
    !!email &&
    !!password &&
    !!confirmPassword &&
    !!name &&
    !!nickname;
  const isAllChecked = isTermsAgreed && isPrivacyAgreed;

  // 공통 스타일 객체
  const eyeIconStyle = {
    position: "absolute" as const,
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
  };

  // 유효성 검사 함수들
  const validateid = (value: string) => {
    if (!/^[a-zA-Z\d]{5,}$/.test(value)) {
      return "아이디는 영어 또는 숫자를 사용한 5자 이상이어야 합니다.";
    }
    return "";
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "유효한 이메일 주소가 아닙니다.";
    }
    return "";
  };

  const validatePassword = (value: string) => {
    if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(value)) {
      return "비밀번호는 영어, 숫자, 특수문자를 포함해야 하며 8자 이상이어야 합니다.";
    }
    return "";
  };

  const validateConfirmPassword = (
    password: string,
    confirmPassword: string
  ) => {
    if (password !== confirmPassword) {
      return "비밀번호가 일치하지 않습니다.";
    }
    return "";
  };

  const validateName = (value: string) => {
    if (value.length < 2) {
      return "이름은 2글자 이상이어야 합니다.";
    }
    return "";
  };

  const validateNickname = (value: string) => {
    if (value.length < 2) {
      return "닉네임은 2글자 이상이어야 합니다.";
    }
    return "";
  };

  const handleChange = (field: string, value: string, password?: string) => {
    switch (field) {
      case "userId":
        setuserId(value);
        setIdChecked(false);
        break;
      case "email":
        setEmail(value);
        setEmailChecked(false);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      case "name":
        setName(value);
        break;
      case "nickname":
        setNickname(value);
        setNicknameChecked(false);
        break;
    }

    let errorMessage = "";
    switch (field) {
      case "userId":
        errorMessage = validateid(value);
        break;
      case "email":
        errorMessage = validateEmail(value);
        break;
      case "password":
        errorMessage = validatePassword(value);
        break;
      case "confirmPassword":
        errorMessage = password ? validateConfirmPassword(password, value) : "";
        break;
      case "name":
        errorMessage = validateName(value);
        break;
      case "nickname":
        errorMessage = validateNickname(value);
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: errorMessage }));
    setIsValid((prev) => ({
      ...prev,
      [field === "userId" ? "id" : field]: errorMessage === "",
    }));
  };

  // 중복 확인 함수들
  const handleCheckId = async () => {
    const isIdExists = await AxiosApi.checkMemberIdExists(userId);
    const errorMessage = isIdExists
      ? "이미 존재하는 아이디입니다."
      : "사용 가능한 아이디입니다.";
    setErrors((prev) => ({ ...prev, userId: errorMessage }));
    setIsValid((prev) => ({ ...prev, id: !isIdExists }));
    setIdChecked(true);
  };

  const handleCheckEmail = async () => {
    const isEmailExists = await AxiosApi.checkMemberEmailExists(email);
    const errorMessage = isEmailExists
      ? "이미 존재하는 이메일입니다."
      : "사용 가능한 이메일입니다.";
    setErrors((prev) => ({ ...prev, email: errorMessage }));
    setIsValid((prev) => ({ ...prev, email: !isEmailExists }));
    setEmailChecked(true);
  };

  const handleCheckNickname = async () => {
    const isNicknameExists = await AxiosApi.checkMemberNicknameExists(nickname);
    const errorMessage = isNicknameExists
      ? "이미 존재하는 닉네임입니다."
      : "사용 가능한 닉네임입니다.";
    setErrors((prev) => ({ ...prev, nickname: errorMessage }));
    setIsValid((prev) => ({ ...prev, nickname: !isNicknameExists }));
    setNicknameChecked(true);
  };

  // 이벤트 핸들러
  const handleAllAgreedChange = () => {
    const newValue = !isAllChecked;
    setIsTermsAgreed(newValue);
    setIsPrivacyAgreed(newValue);
  };

  const handleTermsChange = () => setIsTermsAgreed(!isTermsAgreed);
  const handlePrivacyChange = () => setIsPrivacyAgreed(!isPrivacyAgreed);
  const handleConfirmClick = () => setShowForm(true);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleProfileSelect = (profileName: string) => {
    setSelectedProfile(profileName);
    setOpenEditProfileImgModal(false);
    setUpdatedProfile(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const fileURL = URL.createObjectURL(event.target.files[0]);
      setUpdatedProfile(fileURL);
    }
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const signupRequest = { userId, password, name, email, nickname };
    try {
      const response = await AxiosApi.signup(signupRequest);
      console.log("회원가입 성공:", response);
      setModalMessage("회원가입이 완료되었습니다!");
      setIsSignupSuccess(true);
    } catch (error) {
      setModalMessage("회원가입에 실패했습니다. 다시 시도해주세요.");
      setIsSignupSuccess(false);
      setErrors((prev) => ({ ...prev, general: "회원가입에 실패했습니다." }));
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (isSignupSuccess) navigate("/");
  };

  // 회원가입 버튼 활성화 조건
  const isSignupButtonDisabled =
    !isFormFilled ||
    Object.values(isValid).includes(false) ||
    !idChecked ||
    !emailChecked ||
    !nicknameChecked;

  return (
    <AuthBox>
      <h2>회원가입</h2>

      {!showForm ? (
        <>
          <TermBox>
            <label>
              <input
                type="checkbox"
                checked={isAllChecked}
                onChange={handleAllAgreedChange}
              />
              전체 선택
            </label>
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
          </TermBox>
          <Button onClick={handleConfirmClick} disabled={!isAllChecked}>
            확인
          </Button>
        </>
      ) : (
        <div>
          <form onSubmit={handleSignup}>
            <div className="profile-img">
              <img
                src={selectedProfile || Profile1}
                alt="프로필"
                onClick={() => setOpenEditProfileImgModal(true)}
              />
              <label
                htmlFor="profile-upload"
                className="upload-label"
                onClick={() => setOpenEditProfileImgModal(true)}
              >
                <MdEdit />
              </label>
            </div>
            <div className="signupBox">
              {errors.userId && (
                <p className="errmsg" style={{ color: "red" }}>
                  {errors.userId}
                </p>
              )}
              <div className="validBox">
                <InputBox
                  className="inputbox"
                  id="id"
                  value={userId}
                  onChange={(e) => handleChange("userId", e.target.value)}
                  placeholder="아이디 입력"
                  required
                />
                <Button type="button" onClick={handleCheckId}>
                  중복 확인
                </Button>
              </div>
            </div>
            <div className="signupBox">
              {errors.email && (
                <p className="errmsg" style={{ color: "red" }}>
                  {errors.email}
                </p>
              )}
              <div className="validBox">
                <InputBox
                  className="inputbox"
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="이메일 입력"
                  required
                />
                <Button type="button" onClick={handleCheckEmail}>
                  중복 확인
                </Button>
              </div>
            </div>
            <div className="signupBox">
              {errors.password && (
                <p className="errmsg" style={{ color: "red" }}>
                  {errors.password}
                </p>
              )}
              <div style={{ position: "relative" }}>
                <InputBox
                  className="inputbox"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  placeholder="비밀번호 입력"
                  required
                />
                <span onClick={togglePasswordVisibility} style={eyeIconStyle}>
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>
            <div className="signupBox">
              {errors.confirmPassword && (
                <p className="errmsg" style={{ color: "red" }}>
                  {errors.confirmPassword}
                </p>
              )}
              <div style={{ position: "relative" }}>
                <InputBox
                  className="inputbox"
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) =>
                    handleChange("confirmPassword", e.target.value, password)
                  }
                  placeholder="비밀번호 재확인"
                  required
                />
                <span
                  onClick={toggleConfirmPasswordVisibility}
                  style={eyeIconStyle}
                >
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
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
                onChange={(e) => handleChange("name", e.target.value)}
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
              <div className="validBox">
                <InputBox
                  className="inputbox"
                  id="nickname"
                  value={nickname}
                  onChange={(e) => handleChange("nickname", e.target.value)}
                  placeholder="닉네임 입력"
                  required
                />
                <Button type="button" onClick={handleCheckNickname}>
                  중복 확인
                </Button>
              </div>
            </div>
            <Button
              className="submitButton"
              type="submit"
              disabled={isSignupButtonDisabled}
            >
              회원가입
            </Button>
          </form>
          <CheckModal isOpen={showModal} onClose={handleCloseModal}>
            {modalMessage}
          </CheckModal>
          {openEditProfileImgModal && (
            <ExitModal
              isOpen={openEditProfileImgModal}
              onClose={() => {
                setOpenEditProfileImgModal(false);
                setUpdatedProfile(null);
              }}
            >
              <div className="modal-container">
                {profileImgs.map((profileImg, index) => (
                  <img
                    key={index}
                    className="profile-img-basic"
                    src={profileImg.name}
                    alt={profileImg.alt}
                    onClick={() => handleProfileSelect(profileImg.name)}
                  />
                ))}
                <label htmlFor="file-upload">
                  {updatedProfile ? (
                    <img
                      className="profile-img-basic"
                      src={updatedProfile}
                      alt="선택된 이미지"
                      onClick={() => handleProfileSelect(updatedProfile)}
                    />
                  ) : (
                    <img className="profile-img-basic" src={Add} alt="추가" />
                  )}
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </div>
            </ExitModal>
          )}
        </div>
      )}
    </AuthBox>
  );
};
