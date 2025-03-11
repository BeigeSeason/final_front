import { setUserInfo } from "../../redux/authSlice";
import React, { useState } from "react";
import { useToast } from "../../context/ToastContext";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import AxiosApi from "../../api/AxiosApi";
import { Button } from "../../component/ButtonComponent";
import { InputBox } from "../../component/InputComponent";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface EditInfoData {
  isEditable: boolean;
  setIsEditable: React.Dispatch<React.SetStateAction<boolean>>;
  isPwEditable: boolean;
  setIsPwEditable: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditInfo = (props: EditInfoData) => {
  const { isEditable, setIsEditable, isPwEditable, setIsPwEditable } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const { userId, nickname, name, email, profile } = useSelector(
    (state: RootState) => state.auth
  );
  const [editName, setEditName] = useState<string>(name ?? "");
  const [editNickname, setEditNickname] = useState<string>(nickname ?? "");
  // const [editId, setEditId] = useState<string>(userId ?? "");
  const [newPw, setNewPw] = useState<string>("");
  const [confirmPwValue, setConfirmPwValue] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [isValid, setIsValid] = useState({
    // id: false,
    nickname: false,
  });
  // const [idChecked, setIdChecked] = useState<boolean>(false);
  const [nicknameChecked, setNicknameChecked] = useState<boolean>(false);

  const [nameError, setNameError] = useState<string>("");
  const [nicknameError, setNicknameError] = useState<string>("");
  // const [idError, setIdError] = useState<string>("");
  const [pwError, setPwError] = useState<string>("");
  const [pwConfirmError, setPwConfirmError] = useState<string>("");

  const isFormValid =
    (!nameError && editNickname === nickname) ||
    (!nameError && nicknameChecked);
  const isPwValid =
    (newPw === "" && confirmPwValue === "") || // 비밀번호 입력 전에는 true
    (!pwError && !pwConfirmError && newPw !== "" && confirmPwValue !== "");

  const handleEditClick = async () => {
    setIsEditable(!isEditable);
    if (
      userId &&
      isEditable &&
      isFormValid &&
      (name !== editName || nickname !== editNickname)
    ) {
      // 수정 완료 시 서버로 데이터 전송 가능
      const response = await AxiosApi.updateMember(
        userId,
        editName,
        editNickname
      );
      if (response.data) {
        dispatch(
          setUserInfo({
            userId: userId,
            nickname: editNickname,
            name: editName,
            email: email,
            profile: profile,
          })
        );
        setNicknameError("");
        showToast("정보 수정이 완료되었습니다.", "info");
      } else {
        showToast("정보 수정이 실패했습니다.", "error");
      }
    }
    if (!isEditable) {
      setIsPwEditable(false);
      setNewPw("");
      setConfirmPwValue("");
      setPwError("");
      setPwConfirmError("");
    }
  };

  const handleChangePwClick = async () => {
    setIsPwEditable(!isPwEditable);
    if (isPwEditable && isPwValid) {
      // 비밀번호 변경 완료 시 서버로 데이터 전송 가능
      if (userId) {
        await AxiosApi.changeMemberPw(userId, newPw);
        showToast("비밀번호 변경이 완료되었습니다.", "success");
      }
    }
    if (!isPwEditable) {
      setIsEditable(false);
      setNewPw("");
      setConfirmPwValue("");
    }
  };

  // 닉네임 중복 체크
  const handleCheckNickname = async () => {
    const isNicknameExists = await AxiosApi.checkMemberNicknameExists(
      editNickname
    );
    const errorMessage = isNicknameExists
      ? "이미 존재하는 닉네임입니다."
      : "사용 가능한 닉네임입니다.";
    setNicknameError(errorMessage);
    setIsValid((prev) => ({ ...prev, nickname: !isNicknameExists }));
    setNicknameChecked(isNicknameExists ? false : true);
  };
  // 아이디 중복 체크
  // const handleCheckId = async () => {
  //   const isIdExists = await AxiosApi.checkMemberIdExists(editId);
  //   const errorMessage = isIdExists
  //     ? "이미 존재하는 아이디입니다."
  //     : "사용 가능한 아이디입니다.";
  //   setIdError(errorMessage);
  //   setIsValid((prev) => ({ ...prev, id: !isIdExists }));
  //   setIdChecked(isIdExists ? false : true);
  // };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const value = e.target.value;
    if (field === "name") {
      setEditName(value);
      setNameError(validateName(value));
    } else if (field === "nickname") {
      setEditNickname(value);
      setNicknameError(validateNickname(value));
      setNicknameChecked(false);
    } else if (field === "newPw") {
      setNewPw(value);
      setPwError(validatePassword(value));
    } else if (field === "confirmPw") {
      setConfirmPwValue(value);
      setPwConfirmError(validateConfirmPassword(newPw, value));
    }
  };

  const validateName = (value: string) => {
    return value.length < 2 ? "이름은 2글자 이상이어야 합니다." : "";
  };

  const validateNickname = (value: string) => {
    return value.length < 2 ? "닉네임은 2글자 이상이어야 합니다." : "";
  };

  // const validateId = (value: string) => {
  //   if (!/^[a-zA-Z\d]{5,}$/.test(value)) {
  //     return "아이디는 영어 또는 숫자를 사용한 5자 이상이어야 합니다.";
  //   }
  //   return "";
  // };

  const validatePassword = (value: string) => {
    if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(value)) {
      return "비밀번호는 영어, 숫자, 특수문자를 포함해야 하며 8자 이상이어야 합니다.";
    }
    return "";
  };

  const validateConfirmPassword = (newPw: string, confirmPw: string) => {
    return newPw === confirmPw ? "" : "비밀번호가 일치하지 않습니다.";
  };

  const eyeIconStyle = {
    position: "absolute" as const,
    right: "23%",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
  };

  return (
    <>
      <div className="info-title">
        계정 정보
        <Button
          $margin="0 20px"
          onClick={handleEditClick}
          disabled={isEditable ? !isFormValid : false}
        >
          {isEditable ? "수정 완료" : "수정하기"}
        </Button>
      </div>
      <div className="info-container">
        <div className="info-item">
          <span className="title content-font1">이름</span>
          <InputBox
            className={`content content-font2 ${isEditable ? "editable" : ""}`}
            value={editName}
            readOnly={!isEditable}
            onChange={(e) => handleInputChange(e, "name")}
          />
          {nameError && <span className="error-message">{nameError}</span>}
        </div>
        <div className="info-item">
          <span className="title content-font1">닉네임</span>
          <InputBox
            className={`content content-font2 ${isEditable ? "editable" : ""}`}
            value={editNickname}
            readOnly={!isEditable}
            onChange={(e) => handleInputChange(e, "nickname")}
          />
          {isEditable && (
            <Button onClick={handleCheckNickname} disabled={nicknameChecked}>
              {nicknameChecked ? "사용 가능" : "중복 확인"}
            </Button>
          )}
          {nicknameError && (
            <>
              <span
                className="error-message"
                style={{
                  color:
                    nicknameError === "사용 가능한 닉네임입니다."
                      ? "blue"
                      : "red",
                }}
              >
                {nicknameError}
              </span>
            </>
          )}
        </div>
        <div className="info-item">
          <span className="title content-font1">아이디</span>
          <InputBox
            className={`content content-font2`}
            value={userId ?? ""}
            readOnly={!isEditable}
            onChange={(e) => handleInputChange(e, "id")}
          />
          {/* {isEditable && (
            <Button onClick={handleCheckId} disabled={idChecked}>
              {idChecked ? "사용 가능" : "중복 확인"}
            </Button>
          )}
          {idError && (
            <span
              className="error-message"
              style={{
                color:
                  idError === "사용 가능한 아이디입니다." ? "blue" : "red",
              }}
            >
              {idError}
            </span>
          )} */}
        </div>
        <div className="info-item">
          <span className="title content-font1">이메일</span>
          <InputBox
            className="content content-font2"
            value={email ?? ""}
            readOnly
          />
        </div>
      </div>
      <div className="info-title">
        비밀 번호
        <Button
          $margin="0 10px 0 20px"
          onClick={handleChangePwClick}
          disabled={!isPwValid}
        >
          {isPwEditable ? "변경완료" : "변경하기"}
        </Button>
        <Button
          bgColor="transparent"
          color="#ccc"
          border="1px solid #ccc"
          hoverBgColor="#f1f1f1"
          onClick={() => navigate("/signout")}
        >
          회원 탈퇴
        </Button>
      </div>
      {isPwEditable && (
        <>
          <div className="info-item">
            <span className="title content-font1 pw">신규 비밀번호</span>
            <div className="new-pw-container">
              <InputBox
                className="content-pw content-font2 editable"
                type={showPassword ? "text" : "password"}
                value={newPw}
                onChange={(e) => handleInputChange(e, "newPw")}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={eyeIconStyle}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
              {pwError && <span className="error-message-pw">{pwError}</span>}
            </div>
          </div>
          <div className="info-item">
            <span className="title content-font1 pw">비밀번호 확인</span>
            <div className="new-pw-container">
              <InputBox
                className="content-pw content-font2 editable"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPwValue}
                onChange={(e) => handleInputChange(e, "confirmPw")}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && isPwValid) {
                    handleChangePwClick();
                  }
                }}
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={eyeIconStyle}
              >
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
              {pwConfirmError && (
                <span className="error-message-pw">{pwConfirmError}</span>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};
