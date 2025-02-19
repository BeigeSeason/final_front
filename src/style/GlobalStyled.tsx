import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

export const GlobalFont = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Nanum+Brush+Script&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Jua&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Gothic+A1&display=swap');
  
.title-font {
  font-family: "Jua", serif;
  font-weight: 400;
  font-style: normal;
}
.content-font1{
  font-family: "Gothic A1", serif;
  font-weight: 400;
  font-style: normal;
}
.content-font2{
  font-family: "Nanum Brush Script", serif;
  font-weight: 400; 
  font-style: normal;
}
`;

export const colors = {
  colorA: "rgb(31, 62, 87)",
  colorB: "rgb(24, 97, 126)",
  colorC: "rgb(96, 179, 214)",
  colorD: "rgb(211, 237, 242)",
};

export const HeaderSt = styled.div`
  position: relative;
  height: 100px;
  background-color: aliceblue;
  display: flex;
  align-items: center;
  padding: 0 10%;
  justify-content: space-between;
  gap: 50px;
  .logo {
    border: 1px solid black;
    height: 80px;
    width: 120px;
    overflow: hidden;
    img {
      height: 100%;
      width: 100%;
      object-fit: contain;
    }
  }

  .search {
    display: flex;
    align-items: center;
    position: relative;
    flex-grow: 0.8;
    input {
      width: 100%;
      padding: 8px 35px 8px 10px;
      border: 1px solid #ccc;
      border-radius: 50px;
      font-size: 14px;
      outline: none;
    }

    .search-icon {
      position: absolute;
      right: 10px;
      font-size: 16px;
      color: #888;
      cursor: pointer;
    }
  }

  .usericon {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    border: 1px solid black;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

export const NavSt = styled.div`
  height: 50px;
  background-color: antiquewhite;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
  .menu {
    display: flex;
    gap: 20px;
  }
  .tag {
    text-decoration: none;
    color: black;
    transition: all 0.3s ease;
    &:hover {
      opacity: 0.7;
    }
    &.active {
      text-decoration: underline;
      color: #585891;
    }
  }
`;

export const FooterSt = styled.div`
  height: 150px;
  width: 100%;
  background-color: lightgray;
  position: static;
  bottom: 0;
`;

export const Body = styled.div`
  min-height: 800px;
`;
