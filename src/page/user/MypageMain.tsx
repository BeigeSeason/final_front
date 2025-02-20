import { useEffect, useRef, useState } from "react";
import { GlobalFont } from "../../style/GlobalStyled";
import { CloseModal } from "../../component/ModalComponent";
import MyDiary from "./MyDiary";
import MyBMDiary from "./MyBMDiary";
import MyBMTourList from "./MyBMTourList";
import MyProfile from "./MyProfile";
import Sample from "../../img/sample.png";
import Profile1 from "../../img/profile/profile1.png";
import Profile2 from "../../img/profile/profile2.png";
import Profile3 from "../../img/profile/profile3.png";
import Profile4 from "../../img/profile/profile4.png";
import Profile5 from "../../img/profile/profile5.png";
import Add from "../../img/profile/add.png";
import {
  MypageMainContainer,
  ProfileInfo,
  MypageMenuContainer,
  MyContentContainer,
} from "../../style/MypageMainStyled";
import { useLocation, useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";

const MypageMain = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const menuFromUrl = queryParams.get("menu") || "내 여행일지";
  const [selectedMenu, setSelectedMenu] = useState<string>(menuFromUrl);
  const [openEditProfileImgModal, setOpenEditProfileImgModal] =
    useState<boolean>(false);
  const fileInputRef = useRef(null);
  const [selectedProfile, setSelectedProfile] = useState<string>(Profile1);

  const menuItems: string[] = [
    "내 여행일지",
    "북마크 여행일지",
    "북마크 관광지",
    "내 정보",
  ];
  const profileImgs: { name: string; alt: string }[] = [
    { name: Profile1, alt: "기본1" },
    { name: Profile2, alt: "기본2" },
    { name: Profile3, alt: "기본3" },
    { name: Profile4, alt: "기본4" },
    { name: Profile5, alt: "기본5" },
  ];

  const handleProfileSelect = (profileName: string) => {
    setSelectedProfile(profileName);
    setOpenEditProfileImgModal(false);
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const fileURL = URL.createObjectURL(event.target.files[0]);
      setSelectedProfile(fileURL);
    }
  };

  useEffect(() => {
    navigate(`?menu=${selectedMenu}`, { replace: true });
  }, [selectedMenu, navigate]);

  return (
    <MypageMainContainer>
      <GlobalFont />
      <ProfileInfo>
        <div className="profile-img">
          <img
            src={Sample}
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
      {openEditProfileImgModal && (
        <CloseModal
          isOpen={openEditProfileImgModal}
          onClose={() => {
            setOpenEditProfileImgModal(false);
            setSelectedProfile(Profile1);
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
              <img
                className="profile-img-basic"
                src={
                  selectedProfile === Profile1 ? Add : selectedProfile || Add
                }
                alt={"추가"}
                onClick={() => handleProfileSelect(selectedProfile)}
              />
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>
        </CloseModal>
      )}
    </MypageMainContainer>
  );
};

export default MypageMain;
