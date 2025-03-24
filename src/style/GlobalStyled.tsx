import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

// 글로벌 폰트 -------------------------------------------------------------------------------------
export const GlobalFont = createGlobalStyle`
  
.title-font {
  font-family: "Jua", serif;
  font-weight: 400;
  font-style: normal;
}
.content-font1{
  font-family: "Nanum Gothic", sans-serif;
  font-weight: 400;
  font-style: normal;
}
.content-font2{
  font-family: "Poor Story", system-ui;
  font-weight: 400; 
  font-style: normal;
}
`;
// 글로벌 색상 -------------------------------------------------------------------------------------
export const colors = {
  colorA: "rgb(70, 34, 17)",
  colorB: "rgb(126, 73, 24)",
  colorC: "rgb(179, 145, 95)",
  colorD: "rgb(229, 214, 182)",
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
    height: 100px;
    width: 200px;
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
    /* border: 1px solid black; */
    /* border: none; */
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    visibility: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .show {
    visibility: visible;
  }
  @media (max-width: 860px) {
    padding-top: 10px;
    height: 80px;
    gap: 20px;
    .logo {
      width: 150px;
      min-width: 150px;
    }
    .inputSearch {
    }
    .usericon {
      width: 60px;
      height: 60px;
      flex-shrink: 0;
    }
    /* .inputSearch {
      display: none;
    } */
  }
`;

// 네비 스타일 -------------------------------------------------------------------------------------
export const NavSt = styled.div`
  height: 50px;
  /* background-color: ${colors.colorD}; */
  /* border-bottom: 1px solid #ccc; */
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  padding: 0 10%;
  .leftMenu,
  .rightMenu {
    display: flex;
    /* gap: 50px; */
    align-items: center;
  }
  .leftMenu {
    gap: 4vw;
  }
  .rightMenu {
    display: flex;
    position: absolute;
    right: 9%;
    gap: 2vw;
  }
  .tag {
    text-decoration: none;
    border-bottom: 2px solid transparent;
    color: ${colors.colorA};
    padding: 0 8px 5px;
    box-sizing: border-box;
    transition: all 0.3s ease;
    font-weight: bold;
    cursor: pointer;
    white-space: nowrap;
    &:hover {
      opacity: 0.7;
    }
    &.active {
      opacity: 0.7;
      border-bottom: 2px solid #7d6458;
    }
  }
  /* .menu-icon {
    display: none;
    font-size: 28px;
    margin-left: 2%;
    color: #333;
  }
  .inputSearch {
    display: flex;
    position: absolute;
    right: 10%;
    width: 68%;
    display: none;
  }
  @media (max-width: 860px) {
    .leftMenu,
    .rightMenu {
      display: none;
    }
    .inputSearch,
    .menu-icon {
      display: block;
    }
  } */

  @media (max-width: 860px) {
    .leftMenu {
      gap: 2px;
    }
    .rightMenu {
      gap: 1vw;
    }
    .desktop {
      display: none;
    }
  }

  @media (max-width: 600px) {
    padding: 0 4%;
    .rightMenu {
      right: 4%;
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
  padding: 5px;
  box-sizing: border-box;
  h4,
  p {
    margin: 5px 0 0 5px;
    opacity: 0.7;
  }
  h4 {
    font-size: 19px;
  }
  p {
    font-size: 13px;
  }
  @media (max-width: 768px) {
    h4 {
      font-size: 17px;
    }
    p {
      font-size: 11.5px;
    }
  }
`;

// 전체 적용하려면 여기서 -------------------------------------------------------------------------------------
export const Body = styled.div`
  min-height: 800px;
`;
