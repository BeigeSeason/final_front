import styled from "styled-components";
import { colors } from "./GlobalStyled";

export const MainBox = styled.div`
  height: 100%;
  width: 90vw;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  margin: 20px auto;
  flex-direction: column;
  gap: 20px;
`;
export const GridItem = styled.div`
  min-height: 500px;
`;
// 인기 관광지 ----------------------------------------------------------------------
export const BestSpot = styled(GridItem)`
  grid-column: span 3;
  border: 1px solid black;
  width: 100%;
  position: relative;
  display: flex;
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
  }
`;

// 인기 플래너 -------------------------------------------------------------------------
export const BestDiary = styled(GridItem)`
  grid-column: span 5;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  .swiper {
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
  }
`;

// 폴리곤 넣고싶다----------------------------------------------------------------------
export const PolygonMap = styled(GridItem)`
  grid-column: span 2;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
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

    &:hover {
      fill: ${colors.colorC}; /* 호버 시 색상 */
    }

    &:active {
      outline: none; /* 클릭 시 outline 제거 */
    }
  }
  .tooltip {
    position: absolute;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 5px 10px;
    border-radius: 3px;
    font-size: 14px;
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
