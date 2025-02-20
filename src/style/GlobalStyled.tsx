import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

// 글로벌 폰트 -------------------------------------------------------------------------------------
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
// 글로벌 색상 -------------------------------------------------------------------------------------
export const colors = {
  colorA: "rgb(31, 62, 87)",
  colorB: "rgb(24, 97, 126)",
  colorC: "rgb(96, 179, 214)",
  colorD: "rgb(211, 237, 242)",
};

// 헤더 스타일 -------------------------------------------------------------------------------------
export const HeaderSt = styled.div`
  position: relative;
  height: 100px;
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
  .inputSearch {
    flex-grow: 0.8;
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

// 네비 스타일 -------------------------------------------------------------------------------------
export const NavSt = styled.div`
  height: 50px;
  background-color: ${colors.colorD};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
  .leftMenu,
  .rightMenu {
    display: flex;
    gap: 50px;
    align-items: center;
  }
  .tag {
    text-decoration: none;
    color: black;
    transition: all 0.3s ease;
    cursor: pointer;
    white-space: nowrap;
    &:hover {
      opacity: 0.7;
    }
    &.active {
      text-decoration: underline;
      color: #585891;
    }
  }
`;

// 푸터 스타일 -------------------------------------------------------------------------------------
export const FooterSt = styled.div`
  height: 150px;
  width: 100%;
  background-color: lightgray;
  position: static;
  bottom: 0;
`;

// 전체 적용하려면 여기서 -------------------------------------------------------------------------------------
export const Body = styled.div`
  min-height: 800px;
`;
