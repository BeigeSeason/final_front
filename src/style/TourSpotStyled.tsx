import styled from "styled-components";
import { colors } from "./GlobalStyled";
import { ScrollBar } from "../component/ButtonComponent";

export const TourItemInfoBox = styled.div`
  width: 80%;
  margin: auto;
  padding: 20px;
  .tour-title {
    width: 100%;
    border-bottom: 2px solid #ddd;
    margin-bottom: 2px;
    display: table;
  }
`;

export const SpotTitle = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  .icon-container {
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    right: 0;
    bottom: 7px;
    font-size: 27px;
    color: #666;
    cursor: pointer;
    .bookmarked-count {
      font-size: 18px;
      margin-left: 3px;
    }
  }
`;

export const SpotBasic = styled.div`
  display: flex;
  margin: 50px auto;
  gap: 20px;
  .tourThumb {
    width: 60%;
    aspect-ratio: 3 / 2;
    text-align: center;
    display: flex;
    .tour-image {
      margin: auto;
      width: 100%;
      height: 100%;
      border-radius: 10px;
      object-fit: cover;
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
  }
  .spotInfo {
    .itemInfo {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ddd;
      padding: 5px 0;
      p {
        color: ${colors.colorA};
        font-weight: bold;
        min-width: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
`;

// export const SpotDetail = styled.div`
//   border-top: 5px solid #ddd;
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   .spotDetail {
//     grid-column: span 2;
//     margin: 30px 5% 50px;
//     line-height: 2;
//   }
//   .MapSpot {
//     display: flex;
//     margin: 20px auto;
//     width: 80%;
//     height: 80%;
//     /* height: 200px; */
//     aspect-ratio: 10 / 8;
//     gap: 10px;
//     background-color: #aaa;
//   }
// `;
// export const NearTravelList = styled.div`
//   width: 70%;
//   margin-left: 10%;
//   h3 {
//     margin: 3px 0 8px 0;
//   }
//   .nearby-travelspot {
//     width: 95%;
//     height: 90%;
//     padding: 5px 15px 5px 15px;
//     overflow-y: scroll;
//     box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
//     ${ScrollBar}
//     .nearbyspot {
//       text-decoration: none;
//       color: black;
//       h4 {
//         color: ${colors.colorA};
//       }
//     }
//     .nearbyspot:visited,
//     .nearbyspot:hover,
//     .nearbyspot:active {
//       color: inherit;
//     }
//   }
//   .nearbybox {
//     border-bottom: 1px solid #ddd;
//     h4,
//     p {
//       margin: 10px 0;
//       display: -webkit-box;
//       -webkit-line-clamp: 1;
//       -webkit-box-orient: vertical;
//       overflow: hidden;
//     }
//     p {
//       margin-bottom: 10px;
//     }
//   }
//   @media (max-width: 1024px) {
//     height: 50%;
//     width: 100%;
//   }
// `;

export const SpotDetail = styled.div`
  border-top: 5px solid #ddd;
  display: flex;
  flex-direction: column;
  .spotDetail {
    margin: 30px 5% 50px;
    line-height: 2;
  }
  .map-near-container {
    display: flex;
    width: 100%;
    justify-content: center;
  }
  .MapSpot {
    display: flex;
    /* margin: 20px auto; */
    min-width: 300px;
    max-width: 700px;
    width: 60%;
    gap: 10px;
    background-color: #aaa;
    justify-content: center; /* 가운데 정렬 */
    flex-grow: 1; /* MapSpot이 여유 공간을 차지하도록 */
    flex-shrink: 0; /* MapSpot은 크기가 줄어들지 않도록 설정 */
  }
`;
export const NearTravelList = styled.div`
  width: 40%;
  max-width: 400px;
  margin-left: 20px;
  flex-shrink: 1; /* NearTravelList가 먼저 줄어듬 */
  h3 {
    margin: 3px 0 8px 0;
  }
  .nearby-travelspot {
    display: flex;
    flex-direction: column; /* 세로로 나열 */
    width: 100%;
    height: 450px;
    padding: 5px 15px 5px 15px;
    overflow-y: scroll;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
    ${ScrollBar}
    .nearbyspot {
      text-decoration: none;
      color: black;
      h4 {
        color: ${colors.colorA};
      }
    }
    .nearbyspot:visited,
    .nearbyspot:hover,
    .nearbyspot:active {
      color: inherit;
    }
  }
  .nearbybox {
    display: flex;
    flex-direction: column; /* 세로로 나열 */
    border-bottom: 1px solid #ddd;
    h4,
    p {
      margin: 10px 0;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    p {
      display: flex;
      align-items: center;
      gap: 5px;
      margin-bottom: 10px;
      span {
        color: #333;
      }
    }
  }
  @media (max-width: 1024px) {
    height: 50%;
    width: 100%;
  }
`;

export const StyledWrapper = styled.div`
  .rating {
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
  }

  .rating input {
    display: none;
  }

  .rating label {
    cursor: pointer;
    color: #ccc;
    font-size: 30px;
    transition: color 0.3s;
  }

  .rating label:before {
    content: "★";
  }

  /* ⭐ 별점 채우기 (선택한 별 이하의 별까지 전부 채움) */
  .rating input:checked ~ label,
  .rating label:hover,
  .rating label:hover ~ label {
    color: ${colors.colorC};
  }
  .reviewRating {
    display: flex;
    gap: 5px;
    cursor: pointer;
    width: 140px;
    height: 100%;
    align-items: center;
  }
`;

export const CommentBox = styled.div`
  .commentInput {
    display: flex;
    gap: 10px;
  }
  textarea {
    width: 100%;
    resize: none;
    padding: 5px;
    outline: none;
    border-radius: 10px;
  }
  .commentCount {
    color: #8d8d8d;
    margin: 10px 0;
  }
  .commentList {
    border-bottom: 1px solid #ddd;
    display: flex;
    flex-direction: column;
    padding: 10px;
    gap: 5px;
    .date {
      color: #8d8d8d;
    }
  }
  .comment-header {
    display: flex;
    justify-content: space-between;
    .header-left {
      display: flex;
      gap: 10px;
    }
    .header-right {
      display: flex;
      justify-content: center;
      gap: 5px;
      font-size: 14px;
      .button {
        cursor: pointer;
      }
    }
  }
  .commentInfo {
    .date {
      font-size: 12px;
    }
  }
  .center {
    display: flex;
    align-items: center;
  }
`;

export const RecommendBox = styled.div`
  display: flex;
  margin: 50px auto;
  gap: 50px;
  flex-direction: column;
  .recommend-box {
    display: flex;
    .genderBox {
      border: 1px solid #ddd;
      border-radius: 15px;
      padding: 15px;
      cursor: pointer;
      &:hover {
        background-color: #ddd;
      }
    }
    select {
      padding: 10px;
      border-radius: 10px;
    }
    .selected {
      background-color: #ddd;
    }
  }
  .radio-gap {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  .radio-container {
    display: flex;
    gap: 10px;
    .radio-box {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
    }
    .radio-lineBox {
      position: relative;
      display: flex;
      align-items: center;
    }
    .radio-line {
      position: absolute;
      width: 60px;
      height: 6px;
      background-color: #ccc;
      left: 12px;
      top: 55%;
      transform: translateY(-50%);
      z-index: -1;
    }
    .radio-button {
      appearance: none;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 3px solid #888;
      transition: background-color 0.3s, border-color 0.3s;
      cursor: pointer;
      position: relative;
    }
    .radio-item {
      width: 50px;
    }
  }
  .result-item-head {
    display: flex;
    gap: 20px;
    margin-bottom: 5px;
    .name {
      font-size: 18px;
      font-weight: 700;
    }
    .link {
      font-size: 12px;
      cursor: pointer;
    }
  }
  .underLine {
    &:hover {
      text-decoration: underline;
      opacity: 0.7;
    }
  }
  .flex-row {
    display: flex;
    flex-direction: row;
  }
  .gap30 {
    gap: 30px;
  }
  .gap50 {
    gap: 50px;
  }
  .title {
    width: 70px;
    font-weight: 600;
  }
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .justify-center {
    display: flex;
    justify-content: center;
  }
`;
