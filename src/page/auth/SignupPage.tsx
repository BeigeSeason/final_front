import { useState, useEffect } from "react";
import { AuthBox } from "../../style/AuthStyled";
import { SignupTerms1, SignupTerms2 } from "../../component/TermsComponent";
import { Button } from "../../component/ButtonComponent";
import { InputBox } from "../../component/InputComponent";
import { CheckModal, ExitModal } from "../../component/ModalComponent";
import { useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
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
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [updatedProfile, setUpdatedProfile] = useState<string | null>(null);
  const [openEditProfileImgModal, setOpenEditProfileImgModal] =
    useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  // const [isAllValid, setIsAllValid] = useState(false);

  const isFormFilled =
    !!userId &&
    !!email &&
    !!password &&
    !!confirmPassword &&
    !!name &&
    !!nickname;

  const profileImgs: { name: string; alt: string }[] = [
    { name: Profile1, alt: "기본1" },
    { name: Profile2, alt: "기본2" },
    { name: Profile3, alt: "기본3" },
    { name: Profile4, alt: "기본4" },
    { name: Profile5, alt: "기본5" },
  ];

  const handleProfileSelect = (profileName: string) => {
    setSelectedProfile(profileName);
    if (profileImgs.some((profile) => profile.name === profileName)) {
      const profileImage = profileImgs.find((pic) => pic.name === profileName);
      // console.log(">>>", profileImage?.name);
      // console.log("기본 이미지 선택된거임");
    } else {
      // console.log("firebase에 선택한 이미지 업로드 해야됨");
    }
    // 그리고 DB에 프로필 이미지 경로 넣어줘야되고, 토큰이든 localstorage든 imgPath 변경해줘야됨.
    setOpenEditProfileImgModal(false);
    setUpdatedProfile(null);
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const fileURL = URL.createObjectURL(event.target.files[0]);
      setUpdatedProfile(fileURL);
    }
  };

  // 아이디 유효성 검사 ---------------
  const validateid = (value: string) => {
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

  const [isValid, setIsValid] = useState({
    id: false,
    email: false,
    password: false,
    confirmPassword: false,
    name: false,
    nickname: false,
  });

  const handleChange = (field: string, value: string, password?: string) => {
    // 해당 필드에 대해 상태 업데이트
    switch (field) {
      case "userId":
        setuserId(value);
        break;
      case "email":
        setEmail(value);
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
        break;
      default:
        break;
    }

    // 유효성 검사
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
        if (password) {
          errorMessage = validateConfirmPassword(password, value);
        }
        break;
      case "name":
        errorMessage = validateName(value);
        break;
      case "nickname":
        errorMessage = validateNickname(value);
        break;
      default:
        break;
    }

    // 에러 메시지 상태 업데이트
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: errorMessage,
    }));
  };

  // 각 필드에서 handleChange 호출
  const handleidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    handleChange("userId", value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    handleChange("email", value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    handleChange("password", value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    handleChange("confirmPassword", value, password);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    handleChange("name", value);
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    handleChange("nickname", value);
  };

  useEffect(() => {
    // console.log("원래 경로 : ", profileImgs[0].name);
    // console.log(selectedProfile);
  }, [selectedProfile]);

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
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
  const [idChecked, setIdChecked] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);
  const [nicknameChecked, setNicknameChecked] = useState(false);
  const [isIdAvailable, setIsIdAvailable] = useState(false);
  const [isEmailAvailable, setIsEmailAvailable] = useState(false);
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);
  const [isSignupSuccess, setIsSignupSuccess] = useState<boolean>(false);

  const handleCheckId = async () => {
    const isIdAvailable = await AxiosApi.checkMemberIdExists(userId);
    if (isIdAvailable) {
      setErrors((prev) => ({ ...prev, userId: "이미 존재하는 아이디입니다." }));
      setIsIdAvailable(false); // 중복인 경우 false
    } else {
      setErrors((prev) => ({ ...prev, userId: "사용 가능한 아이디입니다." }));
      setIsIdAvailable(true); // 중복이 아닌 경우 true
    }
    setIdChecked(true);
    console.log("아이디 중복 검사 완료:", isIdAvailable);
  };

  const handleCheckEmail = async () => {
    const isEmailAvailable = await AxiosApi.checkMemberEmailExists(email);
    if (isEmailAvailable) {
      setErrors((prev) => ({ ...prev, email: "이미 존재하는 이메일입니다." }));
      setIsEmailAvailable(false); // 이메일이 이미 존재하면 사용 불가능 상태
    } else {
      setErrors((prev) => ({ ...prev, email: "사용 가능한 이메일입니다." }));
      setIsEmailAvailable(true); // 이메일이 사용 가능하면 상태 업데이트
    }
    setEmailChecked(true); // 중복 확인 후 상태 업데이트
    console.log("이메일 중복 검사 완료:", isEmailAvailable);
  };

  const handleCheckNickname = async () => {
    const isNicknameAvailable = await AxiosApi.checkMemberNicknameExists(
      nickname
    );
    if (isNicknameAvailable) {
      setErrors((prev) => ({
        ...prev,
        nickname: "이미 존재하는 닉네임입니다.",
      }));
      setIsNicknameAvailable(false); // 닉네임이 이미 존재하면 사용 불가능 상태
    } else {
      setErrors((prev) => ({ ...prev, nickname: "사용 가능한 닉네임입니다." }));
      setIsNicknameAvailable(true); // 닉네임이 사용 가능하면 상태 업데이트
    }
    setNicknameChecked(true); // 중복 확인 후 상태 업데이트
    console.log("닉네임 중복 검사 완료:", isNicknameAvailable);
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const signupRequest = {
      userId,
      password,
      name,
      email,
      nickname,
      // profileImg: selectedProfile,
    };
    try {
      const response = await AxiosApi.signup(signupRequest);
      console.log("회원가입 성공:", response);
      setModalMessage("회원가입이 완료되었습니다!");
      setIsSignupSuccess(true);
      setShowModal(true);
    } catch (error) {
      setModalMessage("회원가입에 실패했습니다. 다시 시도해주세요.");
      setIsSignupSuccess(false);
      setShowModal(true);
      setErrors((prev) => ({
        ...prev,
        general: "회원가입에 실패했습니다. 다시 시도해주세요.",
      }));
    }
  };

  useEffect(() => {
    console.log("isFormFilled:", isFormFilled);
    console.log("isValid:", isValid);
  }, [isFormFilled, isValid]);

  const handleCloseModal = () => {
    setShowModal(false);

    if (isSignupSuccess) {
      navigate("/");
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
          <form onSubmit={handleSignup}>
            <div className="profile-img">
              <img
                src={selectedProfile === null ? Profile1 : selectedProfile}
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
              <InputBox
                className="inputbox"
                id="id"
                value={userId}
                onChange={handleidChange}
                placeholder="아이디 입력"
                required
              />
              <Button type="button" onClick={handleCheckId}>
                중복 확인
              </Button>
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
              <Button type="button" onClick={handleCheckEmail}>
                중복 확인
              </Button>
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
            <Button type="button" onClick={handleCheckNickname}>
              중복 확인
            </Button>

            <Button
              className="submitButton"
              type="submit"
              disabled={
                !isFormFilled || Object.values(isValid).includes(false)
                //  ||
                // isIdAvailable ||
                // isEmailAvailable ||
                // isNicknameAvailable
              }
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
                setSelectedProfile(null);
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
                  {updatedProfile === null ? (
                    <img className="profile-img-basic" src={Add} alt="추가" />
                  ) : (
                    <img
                      className="profile-img-basic"
                      src={updatedProfile}
                      alt="선택된 이미지"
                      onClick={() => handleProfileSelect(updatedProfile)}
                    />
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
