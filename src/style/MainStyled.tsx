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
  margin: 4% 0;
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
      padding-bottom: 20px;
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
    display: flex;
    position: absolute;
    left: 6vw;
    top: -2vw;
    width: 20%;
    height: 10%;
    max-width: 100px;
    justify-content: center;
    align-items: center;
    background: ${colors.colorA};
    color: white;
    /* padding: 5px 10px; */
    border-radius: 3px;
    font-size: clamp(14px, 2vw, 20px); /* 최소 14px, 최대 20px로 제한 */
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
// export const VisitGraph = styled(GridItem)`
//   grid-column: span 3;
//   border: 1px solid black;
// `;

// 빠른 이동 ------------------------------------------------------------------------
export const QuickSearch = styled(GridItem)`
  grid-column: span 3;
  /* border: 1px solid black; */
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
    flex-direction: column;
    align-items: center;
    .banner {
      width: 100%;
      height: 10vw;
      /* margin: 0 auto; */
      background-color: ${colors.colorD};
      cursor: pointer;
    }
  }
`;

export const CateButton = styled.button`
  width: 90%;
  /* height: 100%; */
  height: 15vw;
  margin: 0 auto;
  position: relative;
  background-size: cover;
  background-position: center;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  overflow: hidden;

  /* hover 시 배경 어두워지기 */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0); /* 기본값은 투명 */
    transition: background-color 0.5s ease; /* 어두워지는 효과 */
    z-index: 1; /* 텍스트보다 아래 */
  }

  /* hover 시 배경 어두워지기 */
  &:hover::before {
    background-color: rgba(0, 0, 0, 0.3); /* 어두운 레이어 */
  }
`;
