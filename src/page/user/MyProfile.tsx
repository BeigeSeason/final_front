import React, { useState } from "react";
import { GlobalFont } from "../../style/GlobalStyled";
import { Button } from "../../component/ButtonComponent";
import { MyProfileContainer } from "../../style/MypageComponentStyled";

const MyProfile = React.memo(() => {
  const [confirmPw, setConfirmPw] = useState(false);
  console.log("내 정보 렌더링됨");

  const handleConfirmPw = () => {
    setConfirmPw(true);
  };
  return (
    <MyProfileContainer>
      <GlobalFont />
      {!confirmPw && (
        <>
          <p className="check-pw content-font1">개인정보 보호를 위해</p>
          <p className="check-pw content-font1">
            비밀번호를 다시 입력해주세요.
          </p>
          <div className="input-container check-pw">
            <input
              type="text"
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
      )}
    </MyProfileContainer>
  );
});

export default MyProfile;
