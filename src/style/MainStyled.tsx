import styled from "styled-components";
import { colors } from "./GlobalStyled";

export const MainBox = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  /* grid-template-columns: minmax(0, 3fr) minmax(0, 2fr) minmax(0, 3fr); */
  margin: 0 auto;
  /* flex-direction: column; */
  gap: 20px;
`;

export const GridItem = styled.div`
  /* min-height: 500px; */
`;
// 배너 ----------------------------------------------------------------------
export const Banner = styled(GridItem)`
  grid-column: span 5;
  /* border: 1px solid black; */
  width: 100%;
  height: 32vw;
  min-height: 400px;
  position: relative;
  display: flex;
  padding: 0.5% 0 4%;
  margin-bottom: clamp(20px, 2.7vw, 80px);

  .swiper-slide-custom {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    /* overflow: hidden; */
  }

  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 80%;
    filter: brightness(70%) blur(10px);
    z-index: -1;
  }

  .slide-content {
    display: flex;
    /* align-items: center; */
    /* justify-content: space-between; */
    width: 90%;
    max-width: 1200px;
  }

  .slide-image {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    max-width: 1100px;
    border-radius: 10px;
    object-fit: cover;
  }

  .slide-text-container {
    flex: 1;
    max-width: 30%;
    margin-top: -5vw;
    padding-left: 1vw;
    color: white;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.6);
    text-align: left;
    white-space: nowrap; // 줄바꿈 방지
    z-index: 10;

    /* 📌 CSS 애니메이션 추가 */
    animation: fadeInLeft 0.8s ease-out;

    .title {
      font-size: clamp(30px, 3vw, 50px);
    }
    .sub-title {
      font-size: clamp(15px, 1.7vw, 25px);
    }
  }
  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: white !important;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  }

  .swiper-button-next:after,
  .swiper-button-prev:after {
    font-size: 24px;
    font-weight: bold;
  }

  .swiper-pagination {
    position: relative;
    bottom: 20px;
  }
  .swiper-pagination-bullet-active {
    background-color: ${colors.colorB};
  }
`;

// 인기 관광지 -------------------------------------------------------------------------
export const BestSpot = styled(GridItem)`
  grid-column: span 5;
  width: 100%;

  .section-title {
    text-align: center;
    margin-bottom: clamp(20px, 3vw, 100px);
    font-size: clamp(20px, 3vw, 38px);
  }

  .bestspots-container {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 24vw;
    gap: 1.5%;

    .spot-container {
      width: 16vw;
      cursor: pointer;
      img {
        width: 16vw;
        height: 13vw;
        border-radius: 7px;
        object-fit: cover;
      }
      .title {
        width: 92%;
        margin: 5px auto;
        margin-bottom: clamp(10px, 2vw, 30px);
        font-weight: bold;
        font-size: clamp(14px, 1.2vw, 22px);
        white-space: nowrap; // 줄바꿈 방지
        overflow: hidden; // 넘치는 글자를 잘라냄
        text-overflow: ellipsis; // 넘치는 글자는 '...' 처리
      }
      .address,
      .categories {
        width: 92%;
        margin: 5px auto;
        font-size: clamp(8.5px, 1vw, 14px);
        white-space: nowrap; // 줄바꿈 방지
        overflow: hidden; // 넘치는 글자를 잘라냄
        text-overflow: ellipsis; // 넘치는 글자는 '...' 처리
        color: #333;
      }
      .address {
        margin-bottom: 10px;
      }
      .rating {
        display: flex;
        align-items: center;
        width: 92%;
        margin: 3px auto;
        font-size: clamp(9px, 1vw, 14px);
      }
    }
  }
`;

// 인기 여행일지 -------------------------------------------------------------------------
export const BestDiary = styled(GridItem)`
  grid-column: span 5;
  width: 100%;
  /* background-color: #fff5e6; */
  margin: 2vw 0 5vw;
  padding: 2% 0 4%;

  .section-title {
    text-align: center;
    margin-bottom: clamp(30px, 5vw, 100px);
    margin-top: clamp(15px, 2vw, 50px);
    font-size: clamp(20px, 3vw, 38px);
  }

  .bestdiaries-container {
    display: flex;
    justify-content: center;
    width: 100%;
    gap: 1.5%;

    .diary-container {
      width: 18vw;
      padding-bottom: 13px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      border-radius: 7px;
      background-color: #fff;
      cursor: pointer;
      img {
        width: 18vw;
        height: 13vw;
        border-radius: 7px 7px 0 0;
        object-fit: cover;
      }
      .title {
        width: 92%;
        margin: 5px auto;
        margin-bottom: clamp(10px, 1.5vw, 25px);
        font-weight: bold;
        font-size: clamp(15px, 2.8vw, 23px);
        white-space: nowrap; // 줄바꿈 방지
        overflow: hidden; // 넘치는 글자를 잘라냄
        text-overflow: ellipsis; // 넘치는 글자는 '...' 처리
      }
      .content {
        width: 92%;
        height: 2.8em;
        margin: 5px auto;
        margin-bottom: clamp(10px, 1.4vw, 25px);
        font-size: 0.9em;
        box-sizing: border-box;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .travel-info {
        width: 92%;
        margin: 3px auto;
        margin-bottom: clamp(5px, 0.8vw, 10px);
        color: #333;
        font-size: 0.8em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
`;

// 폴리곤 -------------------------------------------------------------------------------
export const PolygonMap = styled(GridItem)`
  grid-column: span 2;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 90%;
  min-height: 5vw;
  margin-left: 20%;
  .section-title {
    font-size: clamp(15px, 3vw, 27px);
    margin-bottom: clamp(17px, 3vw, 50px);
    white-space: nowrap;
  }
  .map {
    width: 100%;
    height: 90%;
    margin-bottom: 10%;
  }
`;

// 빠른 이동 ------------------------------------------------------------------------
export const QuickSearch = styled(GridItem)`
  grid-column: span 3;
  width: 70%;
  margin: 0 0 20% 10%;
  /* border: 1px solid black; */
  .section-title {
    font-size: clamp(15px, 3vw, 27px);
    margin-bottom: clamp(17px, 3vw, 50px);
  }
  .SelectCategory {
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 100%;
    margin-bottom: clamp(11px, 2vw, 40px);
    .catebuttons {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      width: 100%;
      height: 100%;
      @media (max-width: 768px) {
        height: 80%;
      }
    }
  }
  .recommend-banner {
    display: flex;
    flex-direction: column;
    align-items: center;
    .banner {
      width: 100%;
      aspect-ratio: 4 / 1;
      margin-top: 2vw;
      /* background-color: #c9a5fc; */
      /* border: 2px solid #90bdfc; */
      border-radius: 20px;
      overflow: hidden;
      cursor: pointer;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        /* position: absolute; */
        /* right: -35%; */
        /* top: 5%; */
        object-position: 50% 27%;
        /* filter: brightness(70%); */
      }
    }
  }
`;

interface CateButtonProps {
  typeName: string; // typeName을 필수 props로 정의
}

export const CateButton = styled.button<CateButtonProps>`
  width: 90%;
  height: 15vw;
  margin: 0 auto;
  position: relative;
  background-size: cover;
  background-position: center;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  overflow: hidden;

  color: transparent; /* 필요 시 제거 */

  /* ::before로 배경 어두움 효과 */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
    transition: background-color 0.3s ease;
    z-index: 1;
  }

  /* 호버 시 배경 더 어둡게 */
  &:hover::before {
    background-color: rgba(0, 0, 0, 0.5); /* 요청하신 0.5 */
  }

  /* ::after로 텍스트 설정 */
  &::after {
    content: ${({ typeName }) => `"${typeName}"`};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #ffffff; /* 최대한 밝은 흰색 */
    font-size: clamp(14px, 2vw, 25px); /* 반응형 크기 */
    font-weight: 700; /* 두꺼운 폰트 */
    opacity: 0; /* 기본값 숨김 */
    z-index: 2; /* ::before 위 */
    transition: opacity 0.3s ease;
    white-space: nowrap;
    padding: 6px 12px; /* 텍스트 주변 여백 */
    border-radius: 8px; /* 둥근 모서리 */
  }

  /* 호버 시 텍스트 보이기 */
  &:hover::after {
    opacity: 1;
  }
`;
