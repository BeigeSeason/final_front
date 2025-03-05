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
