import styled from "styled-components"

export const AdminContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: pink;
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .search-container {
    position: relative;
    width: 80%;
    height: 50px;
    padding: 10px;
    margin: 50px 0;
    flex-direction: row;
    gap: 10px;
    justify-content: space-between;
    background-color: #aaa;
    box-sizing: border-box;
    .search-category {
      padding: 5px;
      background-color: #777;
      border-radius: 5px;
      gap: 5px;
    }
    .search-selectBox {
      padding: 5px;
      display: flex;
      flex-direction: column;
      position: absolute;
      gap: 5px;
      left: 10px;
      top: 45px;
      background-color: #999;
      border-radius: 5px;
      .search-selected {
        padding: 7.5% 10px;
        border-radius: 5px;
        &:hover {
          background-color: #777;
        }
      }
    }
    .search-input {
      flex-grow: 1;
      box-sizing: border-box;
      height: 100%;
      input {
        width: 100%;
        box-sizing: border-box;
        height: 80%;
        border: none;
        outline: none;
        /* background-color: transparent; */
      }
    }
    .search-button{
      width: 40px;
      svg {
        width: 30px;
        height: 30px;
      }
    }
  }
  .data-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    .data-head {
      display: flex;
      justify-content: right;
      .sort-box {
        display: flex;
        gap: 5px;
        padding: 5px;
        .sort-icon {
          display: flex;
          flex-direction: column;
        }
      }
    }
    .data-content {

    }
    .sort-selectBox {
      padding: 5px;
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 37px;
      right: 0;
      background-color: #999;
      border-radius: 5px;
      .sort-selected {
        padding: 7.5% 10px;
        border-radius: 5px;
        &:hover {
          background-color: #777;
        }
      }
    }
  }
`