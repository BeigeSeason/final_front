import styled from "styled-components";

export const HeaderSt = styled.div`
  position: relative;
  height: 100px;
  background-color: aliceblue;
  display: flex;
  align-items: center;

  .logo {
    border: 1px solid black;
  }
  .search {
    display: flex;
    align-items: center;
    position: relative;

    input {
      width: 500px;
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
`;

export const NavSt = styled.div`
  height: 50px;
  background-color: antiquewhite;
`;

export const FooterSt = styled.div`
  height: 150px;
  width: 100%;
  background-color: lightgray;
  position: static;
  bottom: 0;
`;

export const Body = styled.div`
  height: 800px;
`;
