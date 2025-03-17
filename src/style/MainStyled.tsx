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
  height: 30vw;
  position: relative;
  display: flex;
  padding: 0.5% 0 4%;

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
    color: white;
    text-align: left;
    white-space: nowrap; // 줄바꿈 방지
    z-index: 10;

    /* 📌 CSS 애니메이션 추가 */
    animation: fadeInLeft 0.8s ease-out;
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
    margin-bottom: 40px;
  }

  .bestspots-container {
    display: flex;
    justify-content: center;
    width: 100%;
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
        font-weight: bold;
        font-size: 1.2em;
        white-space: nowrap; // 줄바꿈 방지
        overflow: hidden; // 넘치는 글자를 잘라냄
        text-overflow: ellipsis; // 넘치는 글자는 '...' 처리
      }
      .categories {
        width: 92%;
        margin: 5px auto;
        font-size: 0.75em;
        color: #333;
      }
      .rating {
        display: flex;
        align-items: center;
        width: 92%;
        margin: 3px auto;
        font-size: 0.85em;
      }
    }
  }
`;

// 인기 여행일지 -------------------------------------------------------------------------
export const BestDiary = styled(GridItem)`
  grid-column: span 5;
  width: 100%;
  background-color: #fff5e6;
  margin: 4% 0 2%;
  padding: 2% 0 4%;

  .section-title {
    text-align: center;
    margin-bottom: 50px;
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
        height: 10vw;
        border-radius: 7px 7px 0 0;
        object-fit: cover;
      }
      .title {
        width: 92%;
        margin: 5px auto;
        font-weight: bold;
        font-size: 1.2em;
        white-space: nowrap; // 줄바꿈 방지
        overflow: hidden; // 넘치는 글자를 잘라냄
        text-overflow: ellipsis; // 넘치는 글자는 '...' 처리
      }
      .content {
        width: 92%;
        height: 2.8em;
        margin: 5px auto 10px;
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
  height: 100%;
  min-height: 5vw;
  margin-left: 20%;
  .section-title {
    font-size: clamp(14px, 2vw, 22px);
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
  margin: 0 0 10% 10%;
  /* border: 1px solid black; */
  .section-title {
    font-size: clamp(14px, 2vw, 22px);
  }
  .SelectCategory {
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 100%;
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
    position: relative;
    flex-direction: column;
    align-items: center;
    .banner {
      width: 95%;
      height: 10vw;
      margin-top: 2vw;
      background-color: ${colors.colorD};
      cursor: pointer;

      img {
        width: 100%;
        height: 90%;
        object-fit: contain;
        position: absolute;
        right: -30%;
        /* object-position: 50% 27%; */
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
