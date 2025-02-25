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
    table {
      border-collapse: collapse;
      width: 100%;
    }

    th,
    td {
      border: 1px solid black;
      padding: 8px;
      text-align: left;
    }

    th {
      background-color: #f4f4f4;
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
  .tool-button {
    display: inline-flex;
    position: relative;
    background-color: transparent;
    border: none;
    font-size: 16px;
    color: #333;
    cursor: pointer;
  }
  .toggle-button-container {
    display: flex;
    position: relative;
    .tool-toggle {
      display: flex;
      position: absolute;
      left: 26px;
      top: -1px;
      background-color: #e29696;
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
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  position: relative;
  z-index: 1;
  padding: 10px;
  .tiptap {
    min-height: 330px;
    line-height: 25px;
    &:focus {
      outline: none;
    }
    p {
      margin: 0;
    }
  }
`;
