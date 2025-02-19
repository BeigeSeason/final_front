import {useState} from "react";
import { AdminContainer } from "./AdminComponent";

// icon
import { FaSortDown, FaAngleUp, FaAngleDown } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

const AdminHome = () => {
  const [category, setCategory] = useState("아이디");
  const [sort, setSort] = useState("정렬");

  const [searchSelectOpen, setSearchSelectOpen] = useState(false);
  const [sortSelectOpen, setSortSelectOpen] = useState(false);
  
  // 검색 카테고리 선택
  const handleCategory = () => {
    setSearchSelectOpen((prev) => !prev);
  }
  const handleSelectCategory = (select: string) => {
    setCategory(select);
    setSearchSelectOpen(false);
  }

  // 데이터 정렬버튼
  const handleSort = () => {
    setSortSelectOpen((prev) => !prev);
  }
  const handleSelectSort = (select: string) => {
    setSort(select);
    setSortSelectOpen(false);
  }

  return (
    <AdminContainer>
      {/* 검색 박스 */}
      <div className="search-container center">
        <div className="search-category center" onClick={handleCategory}>
          {category} <FaSortDown />
        </div>
        {searchSelectOpen && (
          <div className="search-selectBox">
            <div className="search-selected" onClick={() => handleSelectCategory("아이디")}>
              아이디
            </div>
            <div className="search-selected" onClick={() => handleSelectCategory("닉네임")}>
              닉네임
            </div>
            <div className="search-selected" onClick={() => handleSelectCategory("이메일")}>
              이메일
            </div>
          </div>
        )}
        <div className="search-input center">
          <input type="text" />
        </div>
        <div className="search-button center">
          <IoSearch />
        </div>
      </div>

      {/* 데이터 박스 */}
      <div className="data-container">
        <div className="data-head">
          <div className="sort-box" onClick={handleSort}>
            <div className="sort-icon">
              <FaAngleUp />
              <FaAngleDown />
            </div>
            <div className="sort-selected center">
              {sort}
            </div>
          </div>
        </div>
        <div className="data-content">

        </div>
        {sortSelectOpen && (
          <div className="sort-selectBox">
            <div className="sort-selected" onClick={() => handleSelectSort("번호 낮은순")}>
              번호 낮은순
            </div>
            <div className="sort-selected" onClick={() => handleSelectSort("번호 높은순")}>
              번호 높은순
            </div>
            <div className="sort-selected" onClick={() => handleSelectSort("아이디 오름차순")}>
              아이디 오름차순
            </div>
            <div className="sort-selected" onClick={() => handleSelectSort("아이디 내림차순")}>
              아이디 내림차순
            </div>
          </div>
        )}
      </div>
    </AdminContainer>
  );
};

export default AdminHome;