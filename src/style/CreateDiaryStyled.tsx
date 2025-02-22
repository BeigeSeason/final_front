import styled from "styled-components";
import { colors } from "./GlobalStyled";

export const CreateDiaryContainer = styled.div`
  width: 60vw;
  margin: 0 auto;
  height: 1000px;
  /* background-color: ${colors.colorC}; */
`;

export const TourInfoContainer = styled.div`
  width: 100%;
  padding: 20px 0;

  .select-container {
    display: flex;
    align-items: center;
    width: 100%;
    margin: 10px 0;
  }
  .datepicker {
    width: 250px;
    padding: 8px;
    font-size: 15px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 30px;
    box-sizing: border-box;
  }
  .tags-container {
    display: flex;
    .tag-box {
      display: flex;
      align-items: center;
      padding: 2px 2px 2px 10px;
      margin-left: 5px;
      border: none;
      border-radius: 20px;
      font-size: 15px;
      color: white;
      background-color: ${colors.colorB};
    }
    .tag-delete {
      font-size: 10px;
      padding: 0 8px;
      color: white;
      background-color: transparent;
      border: none;
      cursor: pointer;
    }
  }
  .title-container {
    display: flex;
    position: relative;
    width: 50vw;
    border-bottom: 1px solid #ccc;
    .title {
      border: none;
      /* border-bottom: 1px solid #ccc; */
      border-radius: 0;
      padding: 8px 12px;
      margin-top: 20px;
      font-size: 16px;
      width: 45vw;
    }
    .word-count {
      display: flex;
      position: absolute;
      right: 12px;
      bottom: 8px;
    }
  }
`;

export const TourContentContainer = styled.div`
  width: 100%;
  .ql-editor {
    min-height: 400px;
  }
`;
