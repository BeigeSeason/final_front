import styled from "styled-components";
import { colors } from "./GlobalStyled";

export const MainBox = styled.div`
  height: 100%;
  width: 90vw;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  /* grid-template-columns: minmax(0, 3fr) minmax(0, 2fr) minmax(0, 3fr); */
  margin: 20px auto;
  flex-direction: column;
  gap: 20px;
`;
export const GridItem = styled.div`
  /* min-height: 500px; */
`;
// 인기 관광지 ----------------------------------------------------------------------
export const BestSpot = styled(GridItem)`
  grid-column: span 5;
  /* border: 1px solid black; */
  width: 100%;
  height: 500px;
  position: relative;
  display: flex;
  padding: 2% 0 4%;

  .swiper-slide-custom {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-slide-custom img {
    /* width: 600px; // 슬라이드에 꽉 차도록 조정 */
    max-width: 90%;
    height: 450px; // 고정 높이 설정
    object-fit: cover; // 비율을 유지하면서 꽉 차게 조정
    border-radius: 10px;
    cursor: pointer;
  }

  .slide-text {
    position: absolute;
    bottom: 10px;
    left: 5%;
    /* transform: translateX(-50%); */
    color: white;
    /* background: rgba(0, 0, 0, 0.6); // 반투명 배경 추가 */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 30px;
    font-weight: bold;
    white-space: nowrap; // 줄바꿈 방지
    overflow: hidden; // 넘치는 글자를 잘라냄
    text-overflow: ellipsis; // 넘치는 글자는 '...' 처리
    max-width: 90%;
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

// 인기 플래너 -------------------------------------------------------------------------
export const BestDiary = styled(GridItem)`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2열 */
  grid-template-rows: repeat(2, auto); /* 🔹 2행 */
  grid-column: span 3;
  width: 100%;
  height: 500px;
  position: relative;
  /* display: flex; */
  align-items: center;
  gap: 30px; /* 🔹 카드 간 간격 */

  .diary-card {
    display: flex;
    /* flex-direction: column;
    align-items: center;
    text-align: center; */
    height: 200px;
  }
  .diary-card img {
    width: 50%;
    aspect-ratio: 9/16;
    object-fit: cover;
    border-radius: 10px;
  }

  /* .swiper {
    width: 100%;
  }
  .swiper-slide {
    height: 480px;
    border: 1px solid black;
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

  .swiper-pagination-bullet-active {
    background-color: ${colors.colorB};
  } */
`;

// 폴리곤 넣고싶다----------------------------------------------------------------------
export const PolygonMap = styled(GridItem)`
  grid-column: span 2;
  /* border: 1px solid black; */
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  aspect-ratio: 5 / 7.3;
  /* @media (max-width: 980px) {
    max-width: 400px;
    max-height: 400px;
  } */

  /* 큰 화면 */
  @media (min-width: 1200px) {
    max-width: 700px;
    max-height: 600px;
  }

  & svg {
    width: 100%;
    height: 100%;
  }

  & path {
    fill: ${colors.colorB}; /* 기본 색상 */
    stroke: #ffffff; /* 경계선 색상 */
    stroke-width: 0.5px; /* 경계선 두께 */
    outline: none; /* 기본 상태 outline 제거 */
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      fill: ${colors.colorC}; /* 호버 시 색상 */
    }

    &:active {
      outline: none; /* 클릭 시 outline 제거 */
    }
  }
  .tooltip {
    /* display: flex;
    position: absolute;
    right: 10px;
    bottom: 10px;
    width: 20%;
    height: 10%;
    max-width: 100px;
    justify-content: center;
    align-items: center; */
    background: rgba(0, 0, 0, 0.8);
    color: white;
    /* padding: 5px 10px; */
    border-radius: 3px;
    /* font-size: 20px; */
    pointer-events: none; /* 툴팁 클릭 방지 */
    z-index: 10;
    transition: opacity 0.2s ease;
    opacity: 0; /* 기본적으로 숨김 */
  }
  &:hover .tooltip {
    opacity: 1; /* 호버 시 툴팁 보이게 */
  }
`;

// 지역별 시각화 --------------------------------------------------------------------
export const VisitGraph = styled(GridItem)`
  grid-column: span 3;
  border: 1px solid black;
`;
