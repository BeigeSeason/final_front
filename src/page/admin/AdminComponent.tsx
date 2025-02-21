import styled from "styled-components";

export const AdminContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: pink;
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .text-center {
    text-align: center;
  }
  .search-container {
    position: relative;
    width: 80%;
    height: 50px;
    padding: 10px;
    margin-top: 50px;
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
      z-index: 1;
      .search-selected {
        padding: 7.5px 10px;
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
    .search-button {
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
    margin-top: 50px;
    .data-head {
      display: flex;
      justify-content: right;
      .sort-box {
        display: flex;
        gap: 5px;
        padding: 5px;
        margin-right: 10px;
        .sort-icon {
          display: flex;
          flex-direction: column;
        }
      }
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
      z-index: 1;
      .sort-selected {
        padding: 7.5% 10px;
        border-radius: 5px;
        &:hover {
          background-color: #777;
        }
      }
    }
    .data-content {
      table {
        padding: 10px;
        width: 100%;
        border-spacing: 0;
        th,
        td {
          padding: 5px 3px;
          border: 1px solid #ddd;
        }
        tbody {
          tr:hover {
            td:not(:last-child) {
              background-color: #ddd;
            }
          }
        }
      }
    }
  }
`;

export const AdminHeaderSt = styled.div`
  .leftMenu,
  .rightMenu {
    display: flex;
    gap: 50px;
    align-items: center;
    position: relative;
    .tag {
    }
  }

  .click {
    cursor: pointer;
  }

  .admin-selectBox-ban {
    position: absolute;
    background-color: #aaa;
    padding: 5px;
    border-radius: 5px;
    top: 58px;
    left: 220px;
    z-index: 1;
  }

  .admin-selectBox-stats {
    width: 62px;
    position: absolute;
    background-color: #aaa;
    padding: 5px;
    border-radius: 5px;
    top: 58px;
    left: 315px;
    z-index: 1;
  }

  .admin-selected {
    padding: 7.5px 10px;
    &:hover {
      padding: 7.5px 10px;
      border-radius: 5px;
      background-color: #777;
    }
  }
`;
