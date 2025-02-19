import styled from "styled-components";

export const MyProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .check-pw {
    width: 400px;
    margin: 1vh auto 0;
    text-align: center;
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

    button {
      margin-top: 10px;
      height: 40px;
      border-radius: 10px;
    }
  }
`;
