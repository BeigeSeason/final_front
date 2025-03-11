import styled from "styled-components";
import { colors } from "./GlobalStyled";

export const SignoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .sub-title {
    font-size: 17px;
    font-weight: bold;
  }

  .content {
    padding-left: 20px;
    p {
      margin: 8px 0;
      span {
        font-weight: bold;
        color: #e77e06;
      }
    }
  }
  label {
    display: flex;
    align-items: center;
    gap: 7px;
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

  .button-container {
    display: flex;
    margin-top: 30px;
    gap: 15px;

    button {
      width: 140px;
    }
  }

  .modal {
    font-size: 17px;
  }
`;
