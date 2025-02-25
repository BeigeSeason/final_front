import styled from "styled-components";

export const TipTapContainer = styled.div`
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 7px;
  min-height: 400px;

  .tiptap-content {
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
  }
`;

export const ToolContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  .tool-button {
    display: inline-flex;
    background-color: transparent;
    border: none;
    /* height: 20px; */
    font-size: 16px;
    color: #333;
    cursor: pointer;
  }
  .separate-line {
    color: #ccc;
    font-size: 18px;
    margin: auto 13px;
  }
`;
