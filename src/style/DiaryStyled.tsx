import styled from "styled-components";

export const DiaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 40vw;
`;

export const DiaryHeader = styled.div`
  display: flex;
  width: 100%;
  background-color: aquamarine;
  padding-left: 4vw;
  box-sizing: border-box;

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
      }
      .create-time {
        font-size: 14px;
      }
    }
  }
`;

export const DiaryBody = styled.div`
  display: flex;
  width: 100%;
  /* background-color: #e9fa9f; */
  padding: 0 2vw;
  box-sizing: border-box;
`;
