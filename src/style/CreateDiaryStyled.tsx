import styled from "styled-components";
import { colors } from "./GlobalStyled";
import { ScrollBar } from "../component/ButtonComponent";

export const CreateDiaryContainer = styled.div`
  width: 60vw;
  margin: 0 auto;
  margin-bottom: 20px;
  height: 100%;
`;

export const TourInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  padding: 20px 0;

  .submit-button {
    display: flex;
    position: absolute;
    right: 0;
  }

  .select-container {
    display: flex;
    align-items: center;
    width: 100%;
    margin: 10px 0;
  }
  select {
    margin-right: 20px;
  }
  .selectOption,
  .datepicker {
    width: 250px;
    padding: 8px;
    font-size: 15px;
    border: none;
    border-bottom: 2px solid #ccc;
    border-radius: 0px;
    box-sizing: border-box;
    background-color: transparent;
    cursor: pointer;
  }
  .selectOption option {
    padding: 10px;
    font-size: 13px;
    background-color: #f4f6f8;
  }
  .datepicker {
    text-align: center;
  }
  .tags-container {
    background-color: #f5f5f5;
    padding: 5px;
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    .tag-box {
      display: flex;
      align-items: center;
      padding: 2px 2px 2px 10px;
      margin-left: 5px;
      border: none;
      border-radius: 20px;
      font-size: 15px;
      color: white;
      background-color: ${colors.colorC};
      white-space: nowrap;
    }
    .tag-delete {
      font-size: 10px;
      padding: 0 8px;
      color: white;
      background-color: transparent;
      border: none;
      cursor: pointer;
    }
    p {
      margin: 0;
      font-size: 15px;
      color: gray;
    }
  }
  .title-container {
    display: flex;
    position: relative;
    width: 50vw;
    border-bottom: 1px solid #ccc;
    .title {
      border: none;
      border-radius: 0;
      padding: 8px 12px;
      margin-top: 20px;
      font-size: 16px;
      width: 45vw;
      font-size: 30px;
    }
    .word-count {
      display: flex;
      position: absolute;
      right: 12px;
      bottom: 8px;
    }
  }
`;

export const StyledWrapper = styled.div`
  .toggle {
    display: flex;
    position: absolute;
    right: -90px;
    bottom: 3px;
    scale: 1.3;
  }
  .switch {
    height: 24px;
    display: block;
    position: relative;
    cursor: pointer;
  }
  .switch input {
    display: none;
  }
  .switch input + span {
    padding-left: 50px;
    min-height: 24px;
    line-height: 24px;
    display: block;
    color: #99a3ba;
    position: relative;
    vertical-align: middle;
    white-space: nowrap;
    transition: color 0.3s ease;
  }
  .switch input + span:before,
  .switch input + span:after {
    content: "";
    display: block;
    position: absolute;
    border-radius: 12px;
  }
  .switch input + span:before {
    top: 0;
    left: 0;
    width: 42px;
    height: 24px;
    background: ${colors.colorD};
    transition: all 0.3s ease;
  }
  .switch input + span:after {
    width: 18px;
    height: 18px;
    background: #fff;
    top: 3px;
    left: 3px;
    box-shadow: 0 1px 3px rgba(18, 22, 33, 0.1);
    transition: all 0.45s ease;
  }
  .switch input + span em {
    width: 8px;
    height: 7px;
    background: ${colors.colorB};
    position: absolute;
    left: 8px;
    bottom: 7px;
    border-radius: 2px;
    display: block;
    z-index: 1;
    transition: all 0.45s ease;
  }
  .switch input + span em:before {
    content: "";
    width: 2px;
    height: 2px;
    border-radius: 1px;
    background: #fff;
    position: absolute;
    display: block;
    left: 50%;
    top: 50%;
    margin: -1px 0 0 -1px;
  }
  .switch input + span em:after {
    content: "";
    display: block;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border: 1px solid #99a3ba;
    border-bottom: 0;
    width: 6px;
    height: 4px;
    left: 1px;
    bottom: 6px;
    position: absolute;
    z-index: 1;
    transform-origin: 0 100%;
    transition: all 0.45s ease;
    transform: rotate(-35deg) translate(0, 1px);
  }
  .switch input + span strong {
    font-weight: normal;
    position: relative;
    display: block;
    top: 1px;
  }
  .switch input + span strong:before,
  .switch input + span strong:after {
    font-size: 14px;
    font-weight: 500;
    display: block;
    font-family: "Mukta Malar", Arial;
    -webkit-backface-visibility: hidden;
  }
  .switch input + span strong:before {
    /* content: "Unlocked"; */
    transition: all 0.3s ease 0.2s;
  }
  .switch input + span strong:after {
    /* content: "Locked"; */
    opacity: 0;
    visibility: hidden;
    position: absolute;
    left: 0;
    top: 0;
    color: #383838;
    transition: all 0.3s ease;
    transform: translate(2px, 0);
  }
  .switch input:checked + span:before {
    background: #eae7e7;
  }
  .switch input:checked + span:after {
    background: #fff;
    transform: translate(18px, 0);
  }
  .switch input:checked + span em {
    transform: translate(18px, 0);
    background: #666;
  }
  .switch input:checked + span em:after {
    border-color: #666;
    transform: rotate(0deg) translate(0, 0);
  }
  .switch input:checked + span strong:before {
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    transform: translate(-2px, 0);
  }
  .switch input:checked + span strong:after {
    opacity: 1;
    visibility: visible;
    transform: translate(0, 0);
    transition: all 0.3s ease 0.2s;
  }

  .switch :before,
  :after {
    box-sizing: border-box;
  }
`;

export const TourContentContainer = styled.div`
  width: 100%;
  .diaryLast {
    margin-top: 10px;
    p {
      margin: 0;
      color: gray;
      font-size: 13px;
    }
    display: flex;
    justify-content: space-between;
    button {
      font-size: 13px;
    }
  }
  .ql-editor {
    min-height: 400px;
  }
`;
