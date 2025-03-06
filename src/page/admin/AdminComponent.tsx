import styled from "styled-components";
import { NavSt } from "../../style/GlobalStyled";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { colors } from "../../style/GlobalStyled";

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
  .text-right {
    text-align: right;
  }
  .search-container {
    position: relative;
    width: 80%;
    height: 50px;
    padding: 10px;
    margin-top: 30px;
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
      cursor: pointer;
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
    margin-top: 30px;
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
        .sort-selected {
          width: 117px;
        }
      }
    }
    .selectBox {
      padding: 5px;
      display: flex;
      flex-direction: column;
      position: absolute;

      background-color: #999;
      border-radius: 5px;
      z-index: 1;
      .selected {
        padding: 7.5% 10px;
        border-radius: 5px;
        &:hover {
          background-color: #777;
        }
      }
    }
    .type {
      top: 37px;
      right: 156px;
    }
    .sort {
      top: 37px;
      right: 0;
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
  .pagination {
    .activePage {
      background-color: #aaa;
    }
  }
  .text-red {
    color: red;
  }
  .text-green {
    color: green;
  }
  .chartTitle {
    font-size: 32px;
    font-weight: 700;
    margin: 30px 0;
    gap: 10px;
    .icon,
    .title {
      cursor: pointer;
    }
  }

  .gap-10 {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 10px 0;
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
  .active {
    font-weight: 600;
  }
`;

export const AdminNav = () => {
  const location = useLocation();

  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  const isActiveRouteReport = location.pathname.startsWith("/admin/report");
  const isActiveRouteChart = location.pathname.startsWith("/admin/chart");
  
  return (
    <NavSt>
      {isActiveRouteReport && (
        <div className="leftMenu">
          <Link
            className={`tag content-font1 ${
              isActive("/admin/report/user") ? "active" : ""
            }`}
            to="/admin/report/user"
          >
            유저
          </Link>
          <Link
            className={`tag content-font1 ${
              isActive("/admin/report/diary") ? "active" : ""
            }`}
            to="/admin/report/diary"
          >
            여행 일지
          </Link>
          <Link
            className={`tag content-font1 ${
              isActive("/admin/report/review") ? "active" : ""
            }`}
            to="/admin/report/review"
          >
            관광지 댓글
          </Link>
        </div>
      )}
      {isActiveRouteChart && (
        <div className="leftMenu">
          <Link
            className={`tag content-font1 ${
              isActive("/admin/chart/user") ? "active" : ""
            }`}
            to="/admin/chart/user"
          >
            유저
          </Link>
          <Link
            className={`tag content-font1 ${
              isActive("/admin/chart/diary") ? "active" : ""
            }`}
            to="/admin/chart/diary"
          >
            일지
          </Link>
          <Link
            className={`tag content-font1 ${
              isActive("/admin/chart/review") ? "active" : ""
            }`}
            to="/admin/chart/report"
          >
            신고
          </Link>
        </div>
      )}
      <div className="rightMenu">
      </div>
    </NavSt>
  )
}