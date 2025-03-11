import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { GlobalFont } from "../../style/GlobalStyled";
import { Button } from "../../component/ButtonComponent";
import { InputBox } from "../../component/InputComponent";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AxiosApi from "../../api/AxiosApi";
import { MyProfileContainer } from "../../style/MypageComponentStyled";
import { EditInfo } from "./EditInfo";
import { setUserInfo } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";

interface InfoItem {
  label: string;
  value: string;
  editable: boolean;
}

const MyProfile = React.memo(() => {
  const dispatch = useDispatch();
  const { userId, nickname, name, email, profile } = useSelector(
    (state: RootState) => state.auth
  );
  const [confirmPw, setConfirmPw] = useState<boolean | null>(null);
  const [inputPw, setInputPw] = useState<string>("");
  const [showInputPw, setShowInputPw] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [isPwEditable, setIsPwEditable] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<string>("내 정보 수정");
  const menuItems: string[] = ["내 정보 수정", "내가 작성한 댓글"];

  // 초기 infoItems는 Redux 상태로 설정
  const initialInfoItems: InfoItem[] = [
    { label: "이름", value: name ?? "", editable: true },
    { label: "닉네임", value: nickname ?? "", editable: true },
    { label: "아이디", value: userId ?? "", editable: true },
    { label: "이메일", value: email ?? "", editable: false },
  ];

  const MyComments = () => {
    return (
      <>
        <div className="info-item">내가 작성한 댓글</div>
      </>
    );
  };

  const handleConfirmPw = async () => {
    if (userId) {
      const response = await AxiosApi.checkMemberPw(userId, inputPw);
      if (response.data) {
        setConfirmPw(true);
      } else {
        setConfirmPw(false);
      }
    }
  };

  return (
    <MyProfileContainer>
      <GlobalFont />
      {!confirmPw ? (
        <>
          <div className="check-pw">
            <p className="content-font1">개인정보 보호를 위해</p>
            <p className="content-font1">비밀번호를 다시 입력해주세요.</p>
          </div>
          <div className="input-container check-pw-container">
            <InputBox
              type={showInputPw ? "text" : "password"}
              placeholder="비밀번호 입력"
              value={inputPw}
              onChange={(e) => setInputPw(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleConfirmPw();
                }
              }}
            />
            <span
              className="check-pw-eye"
              onClick={() => setShowInputPw(!showInputPw)}
            >
              {showInputPw ? <FaEye /> : <FaEyeSlash />}
            </span>
            <p
              className={`validate ${
                confirmPw === null || confirmPw ? "" : "visible"
              }`}
            >
              {confirmPw ? "" : "비밀번호가 일치하지 않습니다."}
            </p>
            <Button onClick={handleConfirmPw}>확인</Button>
          </div>
        </>
      ) : (
        <>
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
                {index < menuItems.length - 1 && <span> | </span>}
              </div>
            ))}
          </div>
          {selectedMenu === "내 정보 수정" && (
            <EditInfo
              isEditable={isEditable}
              setIsEditable={setIsEditable}
              isPwEditable={isPwEditable}
              setIsPwEditable={setIsPwEditable}
            />
          )}
          {selectedMenu === "내가 작성한 댓글" && <MyComments />}
        </>
      )}
    </MyProfileContainer>
  );
});

export default MyProfile;
