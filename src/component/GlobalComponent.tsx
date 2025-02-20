import { Outlet, useLocation } from "react-router-dom";
import {
  HeaderSt,
  NavSt,
  FooterSt,
  Body,
  GlobalFont,
} from "../style/GlobalStyled";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logoImg from "../img/sample.png";
import { SearchBox } from "./InputComponent";

// 헤더---------------------------------------------------------------------------------
export const Header = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      navigate(`/searchpage?query=${searchTerm}`);
    }
  };
  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/searchpage?query=${searchTerm}`);
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

// 네비-------------------------------------------------------------------------------------
export const Nav = () => {
  const location = useLocation();

  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  return (
    <NavSt>
      <div className="menu">
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
      <Link
        className={`tag content-font1 ${isActive("/mypage") ? "active" : ""}`}
        to="/mypage"
      >
        여행일지 만들기
      </Link>
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
