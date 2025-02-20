import React, { useState } from "react";
import { GlobalFont } from "../../style/GlobalStyled";
import { Button } from "../../component/ButtonComponent";
import { InputBox } from "../../component/InputComponent";
import { MyProfileContainer } from "../../style/MypageComponentStyled";

const MyProfile = React.memo(() => {
  const [confirmPw, setConfirmPw] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("내 정보 수정");
  const menuItems = ["내 정보 수정", "비밀번호 변경", "내가 작성한 댓글"];
  const infoItems = [
    { label: "이름", value: "박지숙", editable: isEditable },
    { label: "닉네임", value: "그럴쑥도있지", editable: isEditable },
    { label: "아이디", value: "jisuk0415", editable: isEditable },
    { label: "이메일", value: "jisuk0415@naver.com", editable: false },
  ];
  const EditInfo = () => {
    return (
      <>
        <div className="info-title">
          계정 정보
          <Button $margin="0 20px" onClick={() => setIsEditable(!isEditable)}>
            {isEditable ? "수정 완료" : "수정하기"}
          </Button>
        </div>
        <div className="info-container">
          {infoItems.map((item, index) => (
            <>
              <div className="info-item">
                <span className="title content-font1">{item.label}</span>
                <input
                  className={`content content-font2 ${
                    item.editable ? "editable" : ""
                  }`}
                  value={item.value}
                  readOnly={!item.editable}
                />
              </div>
              {index < infoItems.length - 1 && <hr />}
            </>
          ))}
        </div>
        <div className="info-title">
          비밀 번호
          <Button $margin="0 20px" onClick={() => setIsEditable(!isEditable)}>
            {isEditable ? "변경완료" : "변경하기"}
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
      </>
    );
  };

  const ChangePw = () => {
    return (
      <>
        <div className="info-item">
          <span className="title content-font1 pw">신규 비밀번호</span>
          <input className={`content content-font2 editable pw-input`} />
        </div>
        <div className="info-item">
          <span className="title content-font1 pw">비밀번호 확인</span>
          <input className={`content content-font2 editable pw-input`} />
        </div>
        <div className="button-container pw-button">
          <Button onClick={() => setIsEditable(!isEditable)}>변경 완료</Button>
        </div>
      </>
    );
  };

  const handleConfirmPw = () => {
    setConfirmPw(true);
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
            {/* <input
              type="text"
              placeholder="비밀번호 입력"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleConfirmPw();
                }
              }}
            /> */}
            <InputBox placeholder="비밀번호 입력" />
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
          {selectedMenu === "비밀번호 변경" && <ChangePw />}
        </>
      )}
    </MyProfileContainer>
  );
});

export default MyProfile;
