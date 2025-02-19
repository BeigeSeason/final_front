import styled from "styled-components";

export const MypageMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 800px;
  margin: 5vh auto 0;
`;

export const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 150px;

  .profile-img {
    width: 110px;
    height: 110px;
    border-radius: 50%;
    margin-right: 20px;
    overflow: hidden;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .user-info {
  }
`;

export const MypageMenuContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 50px;
  margin: 10px 0;
  background-color: #d8e1f3;

  button {
    width: 22%;
    height: 80%;
    border: none;
    background-color: transparent;
    font-size: 16px;
    cursor: pointer;

    &.selected {
      font-weight: bold;
    }
  }
`;

export const MyContentContainer = styled.div`
  width: 90%;
  height: 100%;
  margin: 0 auto 7vh;
  background-color: #7c46ad;
`;
