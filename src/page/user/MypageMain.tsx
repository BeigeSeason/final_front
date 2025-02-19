import { useState } from "react";
import { GlobalFont } from "../../style/GlobalStyled";
import Sample from "../../img/sample.png";
import {
  MypageMainContainer,
  ProfileInfo,
  MypageMenuContainer,
  MyContentContainer,
} from "../../style/MypageMainStyled";

const MypageMain = () => {
  const [selectedMenu, setSelectedMenu] = useState("내 여행일지");
  const menuItems = [
    "내 여행일지",
    "북마크 여행일지",
    "북마크 관광지",
    "내 정보",
  ];

  return (
    <MypageMainContainer>
      <GlobalFont />
      <ProfileInfo>
        <div className="profile-img">
          <img src={Sample} alt="프로필" />
        </div>
        <div className="user-info">
          <p className="content-font1">사용자 닉네임</p>
        </div>
      </ProfileInfo>
      <MypageMenuContainer>
        {menuItems.map((menu) => (
          <button
            key={menu}
            className={`content-font1 ${
              selectedMenu === menu ? "selected" : ""
            }`}
            onClick={() => setSelectedMenu(menu)}
          >
            {menu}
          </button>
        ))}
      </MypageMenuContainer>
      <MyContentContainer></MyContentContainer>
    </MypageMainContainer>
  );
};

export default MypageMain;
