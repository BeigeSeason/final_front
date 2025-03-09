import styled from "styled-components";
import { colors } from "./GlobalStyled";

export const AuthBox = styled.div`
  width: 50vw;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  form {
    display: flex;
    flex-direction: column;
  }
  .profile-img {
    display: flex;
    position: relative;
    margin: auto;
    width: 110px;
    height: 110px;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;

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
  .signupBox {
    width: 500px;
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    .errmsg {
      margin: 0 0 5px 5px;
      font-size: 13px;
    }
    .validBox {
      display: flex;
      gap: 10px;
      align-items: center;
      button {
        height: 35px;
        width: 70px;
        font-size: 13px;
      }
    }
  }
  .inputbox {
    height: 50px;
    border-radius: 15px;
  }
  .submitButton {
    margin-top: 50px;
  }
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
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      cursor: pointer;
    }
  }
`;

export const TermBox = styled.div`
  margin-bottom: 50px;
  label {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 16px;
    color: #333;
    cursor: pointer;
  }
  input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid #ccc;
    border-radius: 4px;
    position: relative;
    outline: none;
    cursor: pointer;

    &:checked {
      background-color: ${colors.colorB};
      border-color: none;
    }

    &:checked::after {
      content: "✔";
      color: white;
      font-size: 14px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    &:hover {
      border-color: #999;
    }
  }
  button {
    margin: auto;
  }
`;
export const FindBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50vw;
  gap: 20px;
  margin-bottom: 30px;
`;

export const ResultBox = styled.div`
  padding: 20px;
  border-radius: 8px;
  color: #333;
  text-align: center;

  h4 {
    margin: 0;
    font-size: 20px;
    font-weight: bold;
  }
  .findId {
    margin: 20px 20px 10px 20px;
    padding: 20px 100px;
    border-radius: 10px;
    background-color: #e9e9e9;
    font-size: 18px;
    p {
      margin: 0;
      font-weight: bold;
      color: ${colors.colorA};
    }
  }
`;
