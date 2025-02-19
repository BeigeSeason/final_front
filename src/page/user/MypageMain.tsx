import { useEffect, useState } from "react";
import { GlobalFont } from "../../style/GlobalStyled";
import MyDiary from "./MyDiary";
import MyBMDiary from "./MyBMDiary";
import MyBMTourList from "./MyBMTourList";
import MyProfile from "./MyProfile";
import Sample from "../../img/sample.png";
import {
  MypageMainContainer,
  ProfileInfo,
  MypageMenuContainer,
  MyContentContainer,
} from "../../style/MypageMainStyled";
import { useLocation, useNavigate } from "react-router-dom";

const MypageMain = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const menuFromUrl = queryParams.get("menu") || "내 여행일지";
  const [selectedMenu, setSelectedMenu] = useState(menuFromUrl);

  const menuItems = [
    "내 여행일지",
    "북마크 여행일지",
    "북마크 관광지",
    "내 정보",
  ];

  useEffect(() => {
    navigate(`?menu=${selectedMenu}`, { replace: true });
  }, [selectedMenu, navigate]);

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
      <MyContentContainer>
        {selectedMenu === "내 여행일지" && <MyDiary />}
        {selectedMenu === "북마크 여행일지" && <MyBMDiary />}
        {selectedMenu === "북마크 관광지" && <MyBMTourList />}
        {selectedMenu === "내 정보" && <MyProfile />}
      </MyContentContainer>
    </MypageMainContainer>
  );
};

export default MypageMain;
