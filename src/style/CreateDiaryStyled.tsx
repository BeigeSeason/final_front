import styled from "styled-components";
import { colors } from "./GlobalStyled";

export const CreateDiaryContainer = styled.div`
  width: 60vw;
  margin: 0 auto;
  height: 1000px;
  /* background-color: ${colors.colorC}; */
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
  .datepicker {
    width: 250px;
    padding: 8px;
    font-size: 15px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 30px;
    box-sizing: border-box;
    cursor: pointer;
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

export const StyledWrapper = styled.div`
  display: flex;
  position: absolute;
  right: -85px;
  bottom: 0;
  .checkbox-wrapper-10 .tgl {
    display: none;
  }

  .checkbox-wrapper-10 .tgl,
  .checkbox-wrapper-10 .tgl:after,
  .checkbox-wrapper-10 .tgl:before,
  .checkbox-wrapper-10 .tgl *,
  .checkbox-wrapper-10 .tgl *:after,
  .checkbox-wrapper-10 .tgl *:before,
  .checkbox-wrapper-10 .tgl + .tgl-btn {
    box-sizing: border-box;
  }

  .checkbox-wrapper-10 .tgl::-moz-selection,
  .checkbox-wrapper-10 .tgl:after::-moz-selection,
  .checkbox-wrapper-10 .tgl:before::-moz-selection,
  .checkbox-wrapper-10 .tgl *::-moz-selection,
  .checkbox-wrapper-10 .tgl *:after::-moz-selection,
  .checkbox-wrapper-10 .tgl *:before::-moz-selection,
  .checkbox-wrapper-10 .tgl + .tgl-btn::-moz-selection,
  .checkbox-wrapper-10 .tgl::selection,
  .checkbox-wrapper-10 .tgl:after::selection,
  .checkbox-wrapper-10 .tgl:before::selection,
  .checkbox-wrapper-10 .tgl *::selection,
  .checkbox-wrapper-10 .tgl *:after::selection,
  .checkbox-wrapper-10 .tgl *:before::selection,
  .checkbox-wrapper-10 .tgl + .tgl-btn::selection {
    background: none;
  }

  .checkbox-wrapper-10 .tgl + .tgl-btn {
    outline: 0;
    display: block;
    width: 4em;
    height: 2em;
    position: relative;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .checkbox-wrapper-10 .tgl + .tgl-btn:after,
  .checkbox-wrapper-10 .tgl + .tgl-btn:before {
    position: relative;
    display: block;
    content: "";
    width: 50%;
    height: 100%;
  }

  .checkbox-wrapper-10 .tgl + .tgl-btn:after {
    left: 0;
  }

  .checkbox-wrapper-10 .tgl + .tgl-btn:before {
    display: none;
  }

  .checkbox-wrapper-10 .tgl:checked + .tgl-btn:after {
    left: 50%;
  }

  .checkbox-wrapper-10 .tgl-flip + .tgl-btn {
    padding: 2px;
    transition: all 0.2s ease;
    font-family: sans-serif;
    perspective: 100px;
  }

  .checkbox-wrapper-10 .tgl-flip + .tgl-btn:after,
  .checkbox-wrapper-10 .tgl-flip + .tgl-btn:before {
    display: inline-block;
    transition: all 0.4s ease;
    width: 100%;
    text-align: center;
    position: absolute;
    line-height: 2em;
    font-weight: bold;
    color: #fff;
    top: 0;
    left: 0;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border-radius: 4px;
  }

  .checkbox-wrapper-10 .tgl-flip + .tgl-btn:after {
    content: attr(data-tg-on);
    background: ${colors.colorB};
    transform: rotateY(-180deg);
  }

  .checkbox-wrapper-10 .tgl-flip + .tgl-btn:before {
    background: ${colors.colorA};
    content: attr(data-tg-off);
  }

  .checkbox-wrapper-10 .tgl-flip + .tgl-btn:active:before {
    transform: rotateY(-20deg);
  }

  .checkbox-wrapper-10 .tgl-flip:checked + .tgl-btn:before {
    transform: rotateY(180deg);
  }

  .checkbox-wrapper-10 .tgl-flip:checked + .tgl-btn:after {
    transform: rotateY(0);
    left: 0;
    background: ${colors.colorC};
  }

  .checkbox-wrapper-10 .tgl-flip:checked + .tgl-btn:active:after {
    transform: rotateY(20deg);
  }
`;

export const TourContentContainer = styled.div`
  width: 100%;
  .ql-editor {
    min-height: 400px;
  }
`;
