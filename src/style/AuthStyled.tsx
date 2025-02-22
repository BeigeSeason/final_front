import styled from "styled-components";

export const AuthBox = styled.div`
  width: 50vw;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  form {
    display: flex;
    flex-direction: column;
  }
  .profile-img {
    display: flex;
    position: relative;
    margin: auto;
    width: 110px;
    height: 110px;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      clip-path: circle(
        50% at center
      ); // 이미지를 원형으로 자르지만 overflow: hidden;을 사용하지 않음.
      cursor: pointer;
    }

    .upload-label {
      display: flex;
      position: absolute;
      right: 8px;
      bottom: 3px;
      font-size: 20px;
      background-color: white;
      border-radius: 50%;
      padding: 2px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      cursor: pointer;
    }
  }
  .signupBox {
    width: 500px;
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    .errmsg {
      margin: 0 0 5px 5px;
      font-size: 13px;
    }
  }
  .inputbox {
    height: 50px;
    border-radius: 15px;
  }
  .submitButton {
    margin-top: 50px;
  }
  .modal-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    .profile-img-basic {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin: 10px;
      cursor: pointer;
    }
  }
`;

export const ResultBox = styled.div`
  padding: 20px;
  border-radius: 8px;
  color: #333;
  text-align: center;
  p {
    margin: 0;
    font-size: 20px;
    font-weight: bold;
  }
`;
