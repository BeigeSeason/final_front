import { Outlet, useLocation } from "react-router-dom";
import {
  HeaderSt,
  NavSt,
  FooterSt,
  Body,
  GlobalFont,
} from "../style/GlobalStyled";
import { AdminHeaderSt } from "../page/admin/AdminComponent";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logoImg from "../img/sample.png";
import { SearchBox } from "./InputComponent";
import { Modal, LoginModal } from "./ModalComponent";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/axtions";
import { RootState } from "../redux/store";

// 헤더---------------------------------------------------------------------------------
export const Header = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      const params = new URLSearchParams();
      params.set("searchQuery", searchTerm.trim());
      navigate(`/searchpage?${params.toString()}`);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      const params = new URLSearchParams();
      params.set("searchQuery", searchTerm.trim());
      navigate(`/searchpage?${params.toString()}`);
    }
  };

  return (
    <>
      <GlobalFont />
      <HeaderSt>
        <Link to="/" className="logo">
          <img src={logoImg} alt="로고" />
        </Link>

        <div className="inputSearch">
          <SearchBox
            searchTerm={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onSearch={handleSearch}
          />
        </div>

        <Link to="/mypage" className="usericon">
          <img alt="사용자 아이콘" />
        </Link>
      </HeaderSt>
    </>
  );
};

// 관리자 헤더 -----------------------------------------------------------------------------
export const AdminHeader = () => {
  const navigate = useNavigate();
  const [isBanShow, setIsBanShow] = useState(false);
  const [isStatsShow, setIsStatsShow] = useState(false);

  const handleBan = () => {
    setIsStatsShow(false);
    setIsBanShow((prev) => !prev);
  };

  const handleStats = () => {
    setIsBanShow(false);
    setIsStatsShow((prev) => !prev);
  };

  // 신고 - 유저
  const handleReport1 = () => {
    setIsBanShow(false);
    navigate("/admin/report/user");
  };

  // 신고 - 여행 일기
  const handleReport2 = () => {
    setIsBanShow(false);
    navigate("/admin/report/diary");
  };

  // 신고 - 관광지 댓글
  const handleReport3 = () => {
    setIsBanShow(false);
    navigate("/admin/report/review");
  };

  const handleLogout = () => {};

  return (
    <AdminHeaderSt>
      <GlobalFont />
      <HeaderSt>
        <div className="leftMenu">
          <Link to="/" className="logo">
            <img src={logoImg} alt="로고" />
          </Link>
          <p
            className="tag content-font1 click"
            onClick={() => navigate("/admin")}
          >
            유저
          </p>
          <p className="tag content-font1 click headerBan" onClick={handleBan}>
            신고
          </p>
          {isBanShow && (
            <div className="admin-selectBox-ban">
              <div className="admin-selected" onClick={handleReport1}>
                유저
              </div>
              <div className="admin-selected" onClick={handleReport2}>
                여행 일기
              </div>
              <div className="admin-selected" onClick={handleReport3}>
                관광지 댓글
              </div>
            </div>
          )}
          <p className="tag content-font1 click" onClick={handleStats}>
            통계
          </p>
          {isStatsShow && (
            <div className="admin-selectBox-stats">
              <div className="admin-selected" onClick={() => navigate("")}>
                통계1
              </div>
              <div className="admin-selected" onClick={() => navigate("")}>
                통계2
              </div>
              <div className="admin-selected" onClick={() => navigate("")}>
                통계3
              </div>
            </div>
          )}
        </div>
        <div className="rightMenu">
          <p className="tag content-font1 click" onClick={handleLogout}>
            로그아웃
          </p>
        </div>
      </HeaderSt>
    </AdminHeaderSt>
  );
};

// 네비-------------------------------------------------------------------------------------
export const Nav = () => {
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const dispatch = useDispatch();

  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };
  const handleLogoutClick = () => {
    setLogoutModalOpen(true);
  };
  // 로그아웃 모달 여닫기
  const handleCloseModal = () => {
    setLogoutModalOpen(false);
  };

  const handleConfirmLogout = () => {
    dispatch(logout());
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    handleCloseModal();
    navigate("/");
  };
  // 로그인 모달 여닫기
  const handleLoginModalOpen = () => {
    setLoginModalOpen(true);
  };

  const handleLoginModalClose = () => {
    setLoginModalOpen(false);
  };

  return (
    <NavSt>
      <div className="leftMenu">
        <Link
          className={`tag content-font1 ${
            isActive("/tourlist") ? "active" : ""
          }`}
          to="/tourlist"
        >
          관광지
        </Link>
        <Link
          className={`tag content-font1 ${
            isActive("/diarylist") ? "active" : ""
          }`}
          to="/diarylist"
        >
          여행일지
        </Link>
        <Link
          className={`tag content-font1 ${
            isActive("/recommTour") ? "active" : ""
          }`}
          to="/recommTour"
        >
          여행지 추천
        </Link>
      </div>
      <div className="rightMenu">
        <Link
          className={`tag content-font1 ${
            isActive("/creatediary") ? "active" : ""
          }`}
          to="/creatediary"
        >
          여행일지 만들기
        </Link>
        <Link
          className={`tag content-font1 ${isActive("/mypage") ? "active" : ""}`}
          to="mypage"
        >
          마이페이지
        </Link>
        <div>
          {accessToken ? (
            <p className="tag content-font1" onClick={handleLogoutClick}>
              로그아웃
            </p>
          ) : (
            <p className="tag content-font1" onClick={handleLoginModalOpen}>
              로그인
            </p>
          )}
        </div>
      </div>
      <Modal
        isOpen={isLogoutModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmLogout}
      >
        로그아웃 하시겠습니까?
      </Modal>
      <LoginModal isOpen={isLoginModalOpen} onClose={handleLoginModalClose} />
    </NavSt>
  );
};

// 푸터---------------------------------------------------------------------------
export const Footer = () => {
  return <FooterSt>푸터</FooterSt>;
};

// 전체 레이아웃 씌우기---------------------------------------------------------------
export const Layout = () => {
  return (
    <div>
      <Header />
      <Nav />
      <Body>
        <Outlet />
      </Body>
      <Footer />
    </div>
  );
};

// 관리자 레이아웃 씌우기-------------------------------------------------------------
export const AdminLayout = () => {
  return (
    <div>
      <AdminHeader />
      <Body>
        <Outlet />
      </Body>
      <Footer />
    </div>
  );
};
