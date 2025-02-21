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
  const [isPwChange, setIsPwChange] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<string>("내 정보 수정");
  const menuItems: string[] = ["내 정보 수정", "내가 작성한 댓글"];

  const [editInfo, setEditInfo] = useState<any[]>([]);

  const EditInfo = () => {
    const [infoItems, setInfoItems] = useState<InfoItem[]>([
      { label: "이름", value: "박지숙", editable: isEditable },
      { label: "닉네임", value: "그럴쑥도있지", editable: isEditable },
      { label: "아이디", value: "jisuk0415", editable: isEditable },
      { label: "이메일", value: "jisuk0415@naver.com", editable: false },
    ]);

    const [editName, setEditName] = useState<string>("박지숙");
    const [editNickname, setEditNickname] = useState<string>("그럴쑥도있지");
    const [editId, setEditId] = useState<string>("jisuk0415");

    const handleEditClick = () => {
      setIsEditable((prev) => !prev); // 이전 상태에서 반전시켜서 업데이트
      const updatedInfoItems = infoItems.map((item) => ({
        ...item,
        editable: item.label !== "이메일" && !item.editable, // 이메일은 항상 false로 유지
      }));

      setInfoItems(updatedInfoItems);
    };

    return (
      <>
        <div className="info-title">
          계정 정보
          <Button $margin="0 20px" onClick={handleEditClick}>
            {isEditable ? "수정 완료" : "수정하기"}
          </Button>
        </div>
        <div className="info-container">
          {infoItems.map((item, index) => (
            <div key={item.label}>
              <div className="info-item">
                <span className="title content-font1">{item.label}</span>
                <InputBox
                  className={`content content-font2 ${
                    item.editable ? "editable" : ""
                  }`}
                  value={item.value}
                  readOnly={!item.editable}
                  onChange={
                    item.editable
                      ? (e) => handleInputChange(index, e.target.value)
                      : undefined
                  }
                />
              </div>
              {index < infoItems.length - 1 && <hr />}
            </div>
          ))}
        </div>
        <div className="info-title">
          비밀 번호
          <Button
            $margin="0 10px 0 20px"
            onClick={() => setIsPwChange(!isPwChange)}
          >
            {isPwChange ? "변경완료" : "변경하기"}
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
        {isPwChange && (
          <>
            <div className="info-item">
              <span className="title content-font1 pw">신규 비밀번호</span>
              <InputBox className={`content content-font2 editable`} />
            </div>
            <div className="info-item">
              <span className="title content-font1 pw">비밀번호 확인</span>
              <InputBox
                className={`content content-font2 editable`}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleConfirmPwChange();
                  }
                }}
              />
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

  const handleConfirmPw = () => {
    setConfirmPw(true);
  };

  const handleConfirmPwChange = () => {
    setIsPwChange(!isPwChange);
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
