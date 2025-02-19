import { Outlet } from "react-router-dom";
import { HeaderSt, NavSt, FooterSt, Body } from "../style/GlobalStyled";

export const Header = () => {
  return <HeaderSt>헤더</HeaderSt>;
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
