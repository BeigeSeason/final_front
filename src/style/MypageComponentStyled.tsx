import styled from "styled-components";

export const MyProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin: 0 auto;

  .check-pw {
    width: 400px;
    margin: 6vh auto 0;
    text-align: center;
    p {
      margin: 6px;
      font-size: 17px;
      /* font-weight: bold; */
    }
  }

  .check-pw-container {
    display: flex;
    position: relative;
    width: 400px;
    margin: 1vh auto 0;
    text-align: center;
    .check-pw-eye {
      display: flex;
      position: absolute;
      right: 10px;
      top: 32%;
      cursor: pointer;
    }
  }

  .input-container {
    display: flex;
    flex-direction: column;
    position: relative;
    padding-top: 25px;
    input {
      height: 40px;
      padding: 2px 2px 2px 6px;
      font-size: 15px;
      text-align: left;
      border-radius: 10px;
    }
    .validate {
      margin: 0;
      display: flex;
      position: absolute;
      right: 4px;
      top: 6px;
      font-size: 12px;
      color: red;
      display: none;
    }
    .validate.visible {
      display: block;
    }

    button {
      margin-top: 10px;
      height: 40px;
      border-radius: 10px;
    }
  }

  .sub-menu {
    margin: 10px 20px 20px;
    button {
      font-size: 14px;
      background-color: transparent;
      border: none;
      cursor: pointer;

      &.selected {
        font-weight: bold;
      }
    }
  }
  .info-container {
    border: 1px solid #ccc;
    border-radius: 10px;
    width: 90%;
    margin: 2px auto 20px;
  }
  .info-title {
    width: 90%;
    margin: 3px auto 7px;
    font-size: 18px;
    font-weight: bold;
  }
  .info-item {
    display: flex;
    position: relative;
    align-items: center;
    width: 90%;
    height: 45px;
    margin: 2px auto;

    .title {
      width: 100px;
      font-size: 16px;
      font-weight: bold;
      flex-shrink: 0;
    }
    .new-pw-container {
      display: flex;
      position: relative;
      width: 80%;
      box-sizing: border-box;
      .content-pw {
        border: 1px solid transparent;
        outline: none;
        height: 30px;
        width: 80%;
        margin-right: 7px;
        padding: 2px 2px 2px 10px;
        font-size: 16px;
      }
      .content-pw.editable {
        border: 1px solid black;
      }
    }
    .pw {
      width: 120px;
    }
    .content {
      border: 1px solid transparent;
      outline: none;
      height: 30px;
      width: 70%;
      margin-right: 7px;
      padding: 2px 2px 2px 10px;
      font-size: 16px;
    }
    .content.editable {
      border: 1px solid black;
    }
    .error-message {
      display: flex;
      position: absolute;
      left: 105px;
      bottom: -8px;
      font-size: 10px;
      color: red;
    }
    .error-message-pw {
      display: flex;
      position: absolute;
      left: 8px;
      bottom: -15px;
      font-size: 10px;
      color: red;
    }
  }
  hr {
    width: 92%;
    border-top: 1px solid #fff;
    margin: 1px auto;
  }
  .pw-button {
    width: 76%;
  }
`;

export const MyReviewContainer = styled.div`
  width: 100%;
  height: 100%;

  .review-item {
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: 10px auto;
    .review-info {
      display: flex;
      position: relative;
      align-items: flex-end;

      button {
        display: flex;
        position: absolute;
        right: 0;
        top: 5px;
        background-color: transparent;
        border: none;
        cursor: pointer;
      }

      .spot-title {
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
      }
      .review-rating {
        display: flex;
        align-items: center; /* 아이콘과 텍스트 수직 정렬 */
        font-size: 14px;
        color: #333;

        svg {
          vertical-align: middle; /* 아이콘 수직 정렬 */
          margin-bottom: -2px; /* 미세 조정 */
        }
      }
    }

    .review-content {
      margin: 10px 0 5px;
      cursor: pointer;
    }
    .review-date {
      margin: 0;
      font-size: 13px;
      color: #333;
      cursor: pointer;
    }
  }
  hr {
    width: 100%;
  }
`;
