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
`;

// 지역별 시각화 --------------------------------------------------------------------
export const VisitGraph = styled(GridItem)`
  grid-column: span 3;
  border: 1px solid black;
`;
