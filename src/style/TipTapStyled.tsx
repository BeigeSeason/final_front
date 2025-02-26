import styled from "styled-components";
import { ScrollBar } from "../component/ButtonComponent";

export const TipTapContainer = styled.div`
  /* position: relative; */
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 7px;
  min-height: 400px;
  z-index: 0;

  .tiptap {
    margin: 10px;
    min-height: 330px;
    line-height: 25px;
    z-index: 1;
    &:focus {
      outline: none;
    }
    p {
      margin: 0;
    }

    hr {
      width: 90%;
    }

    table {
      border-collapse: collapse;
      table-layout: fixed;
      width: 100%;
      margin: 0 auto;
    }
    th,
    td {
      border: 1px solid black;
      padding: 8px;
      text-align: left;
      max-width: 33%;
    }
    th {
      background-color: #e6f0f7;
      font-weight: normal;
    }
    .resize-handle {
      cursor: pointer;
      width: 5px; /* 핸들러 크기 */
      height: 100%;
      background-color: #ddd; /* 시각적으로 구분 가능하도록 */
    }
    &.resize-cursor {
      cursor: col-resize;
    }
  }
`;

export const ToolContainer = styled.div`
  display: flex;
  /* position: relative; */
  align-items: center;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  overflow-x: auto;
  z-index: 1;
  ${ScrollBar}
  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #bbb;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #999;
  }
  .tool-button,
  .upload-button {
    display: inline-flex;
    position: relative;
    background-color: transparent;
    border: none;
    font-size: 16px;
    color: #333;
    cursor: pointer;
  }
  .upload-button {
    padding: 1px 6px;
  }
  .toggle-button-container {
    display: flex;
    position: relative;
    align-items: center;
    .tool-toggle {
      display: flex;
      position: absolute;
      z-index: 99;
      left: 26px;
      top: -1px;
      margin-left: 4px; /* 버튼과 살짝 띄우기 */
      background-color: #fff;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
      opacity: 0; /* 처음엔 숨김 */
      transform: translateX(-10px); /* 살짝 왼쪽에서 시작 */
      transition: opacity 0.5s ease, transform 0.5s ease; /* 부드러운 전환 */

      &.visible {
        opacity: 1;
        transform: translateX(0);
      }
      .toggle-element {
        margin: 1px 0;
      }
    }
  }
  .select-font-size {
    border: none;
    border-bottom: 1px solid #ccc;
    width: 80px;
    margin: 0 7px;
    &:focus {
      outline: none;
    }
  }
  .separate-line {
    color: #ccc;
    font-size: 18px;
    margin: auto 13px;
    padding-bottom: 1px;
  }
`;
