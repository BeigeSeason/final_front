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

export const SpotBasic = styled.div`
  display: flex;
  margin: 50px auto;
  gap: 20px;
  .tourThumb {
    width: 60%;
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

export const SpotDetail = styled.div`
  border-top: 10px solid #ddd;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  .spotDetail {
    grid-column: span 2;
    margin: 30px 10px;
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
`;

export const CommentBox = styled.div`
  .commentInput {
    display: flex;
    gap: 10px;
  }
  .commentCount {
    color: #8d8d8d;
  }
  .commentList {
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    .date {
      color: #8d8d8d;
    }
  }
  .commentInfo {
    .rate,
    .date {
      margin: 0;
    }
  }
`;
