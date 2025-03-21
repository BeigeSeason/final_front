import styled from "styled-components";
import { colors } from "./GlobalStyled";

export const List = styled.div`
  display: flex;
  width: 90%;
  min-height: 1000px;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 50px;
  justify-content: center;
  @media (max-width: 768px) {
    width: 95%;
  }
`;

export const SelectSearchItem = styled.div`
  position: relative;
  margin-right: 4vw;
  margin-top: 70px;
  /* width: 350px; */
  /* width: 20vw; */
  width: 300px;
  height: 100%;
  padding: 40px 20px 20px 20px;
  border-radius: 30px;
  background-color: #f5f5f5;
  input {
    height: 20px;
    padding: 8px 10px;
  }
  .title {
    width: 100%;
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
    h3 {
      font-size: 15px;
      margin-bottom: 5px;
      margin-left: 10px;
    }
  }
  .price-input-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }
  .price-wrapper {
    display: flex;
    align-items: center;
    width: 43%;
    margin-bottom: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
    color: #444;
  }
  .price-input {
    border: none;
    outline: none;
    width: 76%;
    text-align: right;
    padding: 3px 0;
    font-size: 14px;
    line-height: 1;
    background-color: transparent;
  }
  .unit {
    margin-left: 5px;
    font-size: 14px;
    line-height: 1;
  }
  .confirm-button {
    display: flex;
    width: 80px;
    height: 25px;
    margin-left: auto;
    background-color: #ddd;
  }
  .buttons {
    display: flex;
    flex-wrap: wrap;
  }
  button {
    font-size: 11px;
    font-weight: bold;
    background-color: transparent;
    color: ${colors.colorA};
    height: 30px;
    margin: 3px;
    /* border: 1px solid ${colors.colorC}; */
    border-radius: 30px;
    padding: 5px 10px;
    &:hover {
      opacity: 0.7;
    }
    &.selected {
      background-color: ${colors.colorB};
      color: white;
    }
    &:disabled {
      background-color: #f0f0f0;
      color: #b0b0b0;
    }
  }

  .reset-button {
    width: 80px;
    height: 20px;
    font-size: 10px;
    padding: 0;
    background-color: #e0e0e0;
    border: none;
    border-radius: 50px;
    color: gray;
    position: absolute;
    top: 10px;
    right: 30px;

    &:hover {
      cursor: pointer;
      background-color: #f3f3f3;
      opacity: 0.7;
      color: gray;
    }
    @media (max-width: 768px) {
      top: 4px;
      right: 4px;
      scale: 80%;
    }
  }
  .toggle-button {
    font-size: 16px;
    cursor: pointer;
    background: transparent;
    border: none;
    color: ${colors.colorA};
  }

  .toggle-button:hover {
    color: ${colors.colorB};
  }
  /* @media (max-width: 1024px) {
    width: 300px;
    .buttons {
      grid-template-columns: repeat(2, 1fr);
    }
  } */
  /* SelectTourItem 기본 상태 숨기기 (모바일 화면) */
  @media (max-width: 768px) {
    visibility: hidden;
    opacity: 0;
    transform: translateX(-100%);
    transition: all 0.3s ease;
    height: 730px;

    &.open {
      visibility: visible;
      opacity: 1;
      transform: translateX(0);
    }
    position: absolute;
    z-index: 10;
    top: 90px;
    left: 40px;
    padding: 35px 10px 10px;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    /* .buttons {
      width: 80%;
    } */
    button {
      font-size: 11px;
      width: 90px;
      height: 28px;
    }
    h3 {
      font-size: 17px;
      margin: 15px 0 5px 10px;
      &.title {
        margin-left: 0;
      }
    }
  }
`;

export const FilterButton = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    text-align: center;
    width: 20px;
    padding: 20px 0 0 20px;
    background-color: transparent;
    color: gray;
    font-size: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      opacity: 0.7;
    }
  }
`;

export const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 50vw;
  .totalCount {
    align-self: flex-start;
    font-size: 25px;
    font-weight: bolder;
    border-bottom: 1px solid #ddd;
    width: 100%;
    color: ${colors.colorA};
    padding: 10px 0 15px 0;
    position: relative;
    button {
      position: absolute;
      right: 0;
      height: 35px;
    }
    @media (max-width: 768px) {
      font-size: 20px;
      button {
        scale: 0.7;
      }
    }
  }
  .itemBox {
    border-bottom: 1px solid #ddd;
  }
  .tour-list,
  .plannerList {
    padding: 0;
  }
  .selectMenu {
    width: 95%;
    display: flex;
    justify-content: space-between;
  }
  @media (max-width: 768px) {
    width: 80%;
  }
`;
export const PriceRange = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  .slider {
    width: 100%;
    height: 10px;
    margin: 15px 0;
  }
  .track {
    margin-top: 5px;
    border: 5px solid #ddd;
  }
  .thumb {
    height: 20px;
    width: 20px;
    background: ${colors.colorC};
    border-radius: 50%;
    cursor: grab;
  }
  button {
    background-color: #ddd;
  }
`;

// 검색 페이지 스타일 ------------------------------------------------------------------------------------------
export const SearchResultBox = styled.div`
  width: 80vw;
  margin: auto;
  h3 {
    font-size: 30px;
    margin: 50px 0px;
  }
  .result-content {
    margin: 20px 0;
    min-height: 500px;
  }
  .more {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    p {
      font-size: 30px;
      font-weight: bold;
    }
    button {
      height: 20px;
      background-color: #ddd;
      color: #7c7c7c;
    }
  }
`;
