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
      }
      .title {
        width: 92%;
        margin: 5px auto;
        font-weight: bold;
        font-size: 18px;
        white-space: nowrap; // 줄바꿈 방지
        overflow: hidden; // 넘치는 글자를 잘라냄
        text-overflow: ellipsis; // 넘치는 글자는 '...' 처리
      }
      .categories {
        width: 92%;
        margin: 5px auto;
        font-size: 12px;
        color: #333;
      }
      .rating {
        display: flex;
        align-items: center;
        width: 92%;
        margin: 3px auto;
        font-size: 14px;
      }
    }
  }
`;

// 인기 여행일지 -------------------------------------------------------------------------
export const BestDiary = styled(GridItem)`
  grid-column: span 5;
  width: 90%;
  height: 500px;
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: center;
  .swiper {
    width: 90%;
  }
  .swiper-slide {
    height: 400px;
    /* border: 1px solid black; */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    overflow: hidden;
    .diary-thumbnail {
      height: 60%;
      width: 100%;
      object-fit: contain;
    }
    .diary-info {
      height: 40%;
      width: 90%;
      .diary-title {
        font-size: 20px;
        font-weight: bold;
        white-space: nowrap; // 줄바꿈 방지
        overflow: hidden; // 넘치는 글자를 잘라냄
        text-overflow: ellipsis; // 넘치는 글자는 '...' 처리
      }
      .diary-content {
        display: -webkit-box; /* 줄 수 제한을 위한 설정 */
        -webkit-line-clamp: 3; /* 최대 3줄까지만 표시 */
        -webkit-box-orient: vertical; /* 세로 방향 설정 */
        overflow: hidden; /* 넘치는 텍스트 숨김 */
        text-overflow: ellipsis; /* '...' 처리 */
        word-break: break-word; /* 단어가 길어도 줄바꿈 */
        line-height: 1.5; /* 줄 간격 조정 */
        max-height: calc(1.5em * 3); /* 3줄 기준으로 높이 설정 */

        color: #333;
      }
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

  .swiper-pagination-bullet-active {
    background-color: ${colors.colorB};
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
