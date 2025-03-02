import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { setUserInfo } from "../../redux/authSlice";
import { GlobalFont } from "../../style/GlobalStyled";
import { ExitModal } from "../../component/ModalComponent";
import { Button } from "../../component/ButtonComponent";
import MyDiary from "./MyDiary";
import MyBMDiary from "./MyBMDiary";
import MyBMTourList from "./MyBMTourList";
import MyProfile from "./MyProfile";
import { getProfileImageSrc } from "../../component/ProfileComponent";
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
import AxiosApi from "../../api/AxiosApi";

const MypageMain = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { userId, nickname, profile } = useSelector(
    (state: RootState) => state.auth
  );
  const queryParams = new URLSearchParams(location.search);
  const menuFromUrl = queryParams.get("menu") || "내 여행일지";
  const [selectedMenu, setSelectedMenu] = useState<string>(menuFromUrl);
  const [openEditProfileImgModal, setOpenEditProfileImgModal] =
    useState<boolean>(false);
  const fileInputRef = useRef(null);
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  const menuItems: string[] = [
    "내 여행일지",
    "북마크 여행일지",
    "북마크 관광지",
    "내 정보",
  ];
  const profileImgs: { name: string; alt: string; keyName: string }[] = [
    { name: Profile1, alt: "기본1", keyName: "profile1" },
    { name: Profile2, alt: "기본2", keyName: "profile2" },
    { name: Profile3, alt: "기본3", keyName: "profile3" },
    { name: Profile4, alt: "기본4", keyName: "profile4" },
    { name: Profile5, alt: "기본5", keyName: "profile5" },
  ];

  const handleProfileSelect = async (profileName: string) => {
    if (profileImgs.some((profile) => profile.keyName === profileName)) {
      if (userId) {
        await AxiosApi.changeMemberProfile(userId, profileName);
        dispatch(setUserInfo({ profile: profileName }));
      }
    } else {
      console.log(profileName);
      console.log(selectedProfile);
      console.log("firebase에 선택한 이미지 업로드 해야됨");
    }
    // 그리고 DB에 프로필 이미지 경로 수정해서 넣어줘야되고, 토큰이든 localstorage든 imgPath 변경해줘야됨.
    setOpenEditProfileImgModal(false);
    setSelectedProfile(null);
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
            src={getProfileImageSrc(profile)}
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
          <p className="content-font1">{nickname}</p>
        </div>
      </ProfileInfo>
      <MypageMenuContainer>
        {/* <Button
          className="write-diary-button"
          onClick={() => navigate("/creatediary")}
        >
          여행일지 작성
        </Button> */}
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
                onClick={() => {
                  // setSelectedProfile(profileImg.keyName);
                  handleProfileSelect(profileImg.keyName);
                }}
              />
            ))}
            <label htmlFor="file-upload">
              {selectedProfile === null ? (
                <img className="profile-img-basic" src={Add} alt="추가" />
              ) : (
                <img
                  className="profile-img-basic"
                  src={selectedProfile}
                  alt="선택된 이미지"
                  onClick={() => handleProfileSelect(selectedProfile)}
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
    </MypageMainContainer>
  );
};

export default MypageMain;
