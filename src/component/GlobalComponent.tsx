import { Outlet } from "react-router-dom";
import { HeaderSt, NavSt, FooterSt, Body } from "../style/GlobalStyled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    <HeaderSt>
      <div className="logo">로고이미지</div>
      <div className="search">
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <FontAwesomeIcon
          icon={faSearch}
          className="search-icon"
          onClick={handleSearch}
        />{" "}
      </div>
    </HeaderSt>
  );
};

export const Nav = () => {
  return <NavSt>네비</NavSt>;
};

export const Footer = () => {
  return <FooterSt>푸터</FooterSt>;
};

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
