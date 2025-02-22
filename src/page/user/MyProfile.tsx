import React, { useEffect, useState } from "react";
import { GlobalFont } from "../../style/GlobalStyled";
import { Button } from "../../component/ButtonComponent";
import { InputBox } from "../../component/InputComponent";
import { MyProfileContainer } from "../../style/MypageComponentStyled";

interface InfoItem {
  label: string;
  value: string;
  editable: boolean;
}

const MyProfile = React.memo(() => {
  const [confirmPw, setConfirmPw] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [isPwEditable, setIsPwEditable] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<string>("내 정보 수정");
  const menuItems: string[] = ["내 정보 수정", "내가 작성한 댓글"];
  const [infoItems, setInfoItems] = useState<InfoItem[]>([
    { label: "이름", value: "박지숙", editable: isEditable },
    { label: "닉네임", value: "그럴쑥도있지", editable: isEditable },
    { label: "아이디", value: "jisuk0415", editable: isEditable },
    { label: "이메일", value: "jisuk0415@naver.com", editable: false },
  ]);

  const EditInfo = () => {
    const [editName, setEditName] = useState<string>(
      infoItems.find((item) => item.label === "이름")?.value || "기본값"
    );
    const [editNickname, setEditNickname] = useState<string>(
      infoItems.find((item) => item.label === "닉네임")?.value || "기본값"
    );
    const [editId, setEditId] = useState<string>(
      infoItems.find((item) => item.label === "아이디")?.value || "기본값"
    );

    const [newPw, setNewPw] = useState<string | null>(null);
    const [confirmPw, setConfirmPw] = useState<string | null>(null);

    const [nameError, setNameError] = useState<string>("");
    const [nicknameError, setNicknameError] = useState<string>("");
    const [idError, setIdError] = useState<string>("");
    const [pwError, setPwError] = useState<string>("");
    const [pwConfirmError, setPwconfirmError] = useState<string>("");

    const isFormValid = !nameError && !nicknameError && !idError;
    const isPwValid = !pwError && !pwConfirmError;

    const handleEditClick = () => {
      setIsEditable(!isEditable);
      if (isEditable) {
        // 수정 완료 시
        setInfoItems([
          { label: "이름", value: editName, editable: isEditable },
          { label: "닉네임", value: editNickname, editable: isEditable },
          { label: "아이디", value: editId, editable: isEditable },
          { label: "이메일", value: "jisuk0415@naver.com", editable: false },
        ]);
      } else {
        // 수정 모드로 전환할 때 비밀번호 변경 모드 해제
        setIsPwEditable(false);
        setNewPw("");
        setConfirmPw("");
        setPwError("");
        setPwconfirmError("");
      }
    };

    const handleChangePwClick = () => {
      setIsPwEditable(!isPwEditable);
      if (isPwEditable) {
        // 비밀번호 변경 완료 시 초기화
        setNewPw("");
        setConfirmPw("");
        setPwError("");
        setPwconfirmError("");
      } else {
        // 비밀번호 변경 모드로 진입할 때, 계정 정보 수정 모드 해제
        setIsEditable(false);
        setEditName(
          infoItems.find((item) => item.label === "이름")?.value || ""
        );
        setEditNickname(
          infoItems.find((item) => item.label === "닉네임")?.value || ""
        );
        setEditId(
          infoItems.find((item) => item.label === "아이디")?.value || ""
        );
        setNameError("");
        setNicknameError("");
        setIdError("");
      }
    };

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
      } else if (field === "id") {
        setEditId(value);
        setIdError(validateId(value));
      } else if (field === "newPw") {
        setNewPw(value);
        setPwError(validatePassword(value)); // 비밀번호 유효성 검사
      } else if (field === "confirmPw") {
        setConfirmPw(value);
        setPwconfirmError(validateConfirmPassword(newPw, value)); // 비밀번호 확인 검사
      }
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

    // 아이디 유효성 검사 ---------------
    const validateId = (value: string) => {
      if (!/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{5,}$/.test(value)) {
        return "아이디는 영어 또는 숫자를 사용한 5자 이상이어야 합니다.";
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
      newPw: string | null,
      confirmPassword: string
    ) => {
      if (newPw !== confirmPassword) {
        return "비밀번호가 일치하지 않습니다.";
      }
      return "";
    };

    return (
      <>
        <div className="info-title">
          계정 정보
          <Button
            $margin="0 20px"
            onClick={() => handleEditClick()}
            disabled={!isFormValid} // isFormValid가 true일 때만 버튼 활성화
          >
            {" "}
            {isEditable ? "수정 완료" : "수정하기"}
          </Button>
        </div>
        <div className="info-container">
          <div className="info-item">
            <span className="title content-font1">이름</span>
            <InputBox
              className={`content content-font2 ${
                isEditable ? "editable" : ""
              }`}
              value={
                isEditable
                  ? editName
                  : infoItems.find((item) => item.label === "이름")?.value
              }
              readOnly={!isEditable}
              onChange={(e) => handleInputChange(e, "name")}
            />
            {nameError && <span className="error-message">{nameError}</span>}
          </div>
          <div className="info-item">
            <span className="title content-font1">닉네임</span>
            <InputBox
              className={`content content-font2 ${
                isEditable ? "editable" : ""
              }`}
              value={
                isEditable
                  ? editNickname
                  : infoItems.find((item) => item.label === "닉네임")?.value
              }
              readOnly={!isEditable}
              onChange={(e) => handleInputChange(e, "nickname")}
            />
            {nicknameError && (
              <span className="error-message">{nicknameError}</span>
            )}
          </div>
          <div className="info-item">
            <span className="title content-font1">아이디</span>
            <InputBox
              className={`content content-font2 ${
                isEditable ? "editable" : ""
              }`}
              value={
                isEditable
                  ? editId
                  : infoItems.find((item) => item.label === "아이디")?.value
              }
              readOnly={!isEditable}
              onChange={(e) => handleInputChange(e, "id")}
            />
            {idError && <span className="error-message">{idError}</span>}
          </div>
          <div className="info-item">
            <span className="title content-font1">이메일</span>
            <InputBox
              className="content content-font2"
              value={infoItems.find((item) => item.label === "이메일")?.value}
              readOnly
            />
          </div>
        </div>
        <div className="info-title">
          비밀 번호
          <Button
            $margin="0 10px 0 20px"
            onClick={() => handleChangePwClick()}
            disabled={!isPwValid}
          >
            {isPwEditable ? "변경완료" : "변경하기"}
          </Button>
          <Button
            bgColor="transparent"
            color="#ccc"
            border="1px solid #ccc"
            hoverBgColor="#f1f1f1"
          >
            회원 탈퇴
          </Button>
        </div>
        {isPwEditable && (
          <>
            <div className="info-item">
              <span className="title content-font1 pw">신규 비밀번호</span>
              <InputBox
                className={`content content-font2 editable`}
                onChange={(e) => handleInputChange(e, "newPw")}
              />
              {pwError && <span className="error-message">{pwError}</span>}
            </div>
            <div className="info-item">
              <span className="title content-font1 pw">비밀번호 확인</span>
              <InputBox
                className={`content content-font2 editable`}
                onChange={(e) => handleInputChange(e, "confirmPw")}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleConfirmPwChange();
                  }
                }}
              />
              {pwConfirmError && (
                <span className="error-message">{pwConfirmError}</span>
              )}
            </div>
          </>
        )}
      </>
    );
  };

  const MyComments = () => {
    return (
      <>
        <div className="info-item">내가 작성한 댓글</div>
      </>
    );
  };

  // 처음에 개인정보 보호를 위해 비번 입력 확인
  const handleConfirmPw = () => {
    setConfirmPw(true);
  };

  const handleConfirmPwChange = () => {
    setIsPwEditable(!isPwEditable);
  };

  return (
    <MyProfileContainer>
      <GlobalFont />
      {!confirmPw ? (
        <>
          <p className="check-pw content-font1">개인정보 보호를 위해</p>
          <p className="check-pw content-font1">
            비밀번호를 다시 입력해주세요.
          </p>
          <div className="input-container check-pw">
            <InputBox
              placeholder="비밀번호 입력"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleConfirmPw();
                }
              }}
            />
            <p className="validate">비밀번호가 일치하지 않습니다.</p>
            <Button onClick={() => handleConfirmPw()}>확인</Button>
          </div>
        </>
      ) : (
        <>
          <GlobalFont />
          <div className="sub-menu">
            {menuItems.map((menu, index) => (
              <div key={menu} style={{ display: "inline" }}>
                <button
                  className={`content-font1 ${
                    selectedMenu === menu ? "selected" : ""
                  }`}
                  onClick={() => setSelectedMenu(menu)}
                >
                  {menu}
                </button>
                {index < menuItems.length - 1 && (
                  <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                )}
              </div>
            ))}
          </div>
          {selectedMenu === "내 정보 수정" && <EditInfo />}
          {selectedMenu === "내가 작성한 댓글" && <MyComments />}
        </>
      )}
    </MyProfileContainer>
  );
});

export default MyProfile;
