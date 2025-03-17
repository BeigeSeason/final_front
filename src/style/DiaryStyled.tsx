import styled from "styled-components";
import { colors } from "./GlobalStyled";
import { ScrollBar } from "../component/ButtonComponent";

export const DiaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* 
  hr {
    min-width: 768px;
    width: 60vw;
    height: 2px;
    border: none;
    background-color: #ccc;
  } */
`;

export const DiaryHeader = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 768px;
  margin: auto;
  padding: 20px 4vw;
  box-sizing: border-box;
  border-bottom: 2px solid #ccc;

  .menu-icons {
    display: flex;
    position: absolute;
    align-items: center;
    right: 0;
    color: #666;
    font-size: 25px;
    .bookmarked-count {
      font-size: 16px;
      margin-right: 10px;
    }
    .icon {
      cursor: pointer;
    }
    .menu-icon {
      font-size: 30px;
    }
    .menu-toggle-container {
      display: flex;
      flex-direction: column;
      position: absolute;
      padding: 5px 3px 5px 7px;
      width: 80px;
      right: 10px;
      top: 23px;
      font-size: 18px;
      border: 1px solid rgba(0, 0, 0, 0.12);
      border-radius: 7px;
      background-color: white;
      .menu-item {
        display: flex;
        align-items: center;
        padding: 5px 5px;
        cursor: pointer;
        span {
          /* margin-left: 10px; */
          font-size: 15px;
          flex-grow: 1;
          text-align: center;
        }
      }
      hr {
        // 토글 메뉴 hr
        margin: 2px 0;
        height: 1px;
        border: none;
        background-color: #ccc;
      }
    }
  }

  h1 {
    margin: 40px 0 15px;
  }

  .travel-info-container {
    display: flex;
    flex-direction: column;
    gap: 7px;
    margin-bottom: 25px;
    color: #444;
    .travel-info {
      display: flex;
      align-items: center;
      font-size: 13px;
      span {
        font-size: 15px;
        margin-left: 5px;
      }
    }
  }

  .profile {
    display: flex;
    align-items: center;
    .profile-img {
      display: flex;
      position: relative;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin-right: 15px;
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
    }

    .profile-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
      p {
        margin: 0;
      }
      .nickname {
        font-weight: bold;
        font-size: 17px;
        cursor: pointer;
      }
      .create-time {
        font-size: 14px;
      }
    }
  }
`;

export const DiaryBody = styled.div`
  display: flex;
  width: 700px;
  min-height: 400px;
  padding: 1vh 2vw;
  margin: auto;
  box-sizing: border-box;

  .diary-content {
    width: 100%;
    text-align: left;
    white-space: pre-wrap;
    word-wrap: break-word;
    line-height: 1.8;
    p {
      margin: 3px 0;
    }
    .ql-size-small {
      font-size: 0.75em;
    }
    .ql-size-large {
      font-size: 1.5em;
    }
    .ql-size-huge {
      font-size: 2.5em;
    }
    .ql-align-center {
      text-align: center;
    }
    .ql-align-right {
      text-align: right;
    }
    .ql-align-justify {
      text-align: justify;
    }
    blockquote {
      border-left: 4px solid #ccc;
      margin-bottom: 5px;
      margin-top: 5px;
      padding-left: 16px;
    }
    img {
      max-width: 100%;
    }
  }
`;

export const DiaryFooter = styled.div`
  width: 768px;
  margin: 0 auto 30px;
  height: 100%;
  border-top: 1px solid #ccc;
  .tag-container {
    display: flex;
    flex-wrap: wrap; /* 자동 줄바꿈 */
    width: 90%;
    padding: 7px 20px;
    gap: 10px;

    .tag {
      background-color: #ccc;
      padding: 2px 8px;
      border-radius: 5px;
      white-space: nowrap;
    }
  }
`;

export const ReportContent = styled.div`
  /* height: 500px; */
  width: 300px;
  h3 {
    color: ${colors.colorA};
  }
  textarea {
    width: 100%;
    height: 140px;
    resize: none;
    overflow-y: scroll;
    margin-bottom: 15px;
    padding: 4px 6px;
    box-sizing: border-box;
    border: 1px solid ${colors.colorA};
    border-radius: 5px;
    white-space: "pre-line";
    ${ScrollBar};
  }
`;
