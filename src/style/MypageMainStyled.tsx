import styled from "styled-components";
import { colors } from "./GlobalStyled";

export const MypageMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 800px;
  margin: 5vh auto 0;

  .modal-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    .profile-img-basic {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin: 10px;
    }
  }
`;

export const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 150px;

  .profile-img {
    display: flex;
    position: relative;
    width: 110px;
    height: 110px;
    border-radius: 50%;
    margin-right: 20px;
    /* overflow: hidden; */
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      clip-path: circle(
        50% at center
      ); // 이미지를 원형으로 자르지만 overflow: hidden;을 사용하지 않음.
      cursor: pointer;
    }

    .upload-label {
      display: flex;
      position: absolute;
      right: 8px;
      bottom: 3px;
      font-size: 20px;
      background-color: white;
      border-radius: 50%;
      padding: 2px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      cursor: pointer;
    }
  }

  .user-info {
  }
`;

export const MypageMenuContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 50px;
  margin: 5vh 0 2vh;
  /* background-color: ${colors.colorD}; */
  white-space: nowrap;
  button {
    width: 25%;
    border: none;
    border-bottom: 10px solid transparent;
    background-color: transparent;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      opacity: 0.7;
    }
    &.selected {
      border-bottom: 10px solid ${colors.colorD};
    }
  }
  .write-diary-button {
    display: flex;
    position: absolute;
    right: 0;
    top: -37px;
    background-color: ${colors.colorA};
    width: 150px;
    height: 32px;
  }
`;

export const MyContentContainer = styled.div`
  width: 90%;
  height: 100%;
  margin: 0 auto 7vh;
  border: 1px solid black;
`;
