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
  button {
    margin-top: 50px;
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
