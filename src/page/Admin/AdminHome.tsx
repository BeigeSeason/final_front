import {useState} from "react";
import { AdminContainer } from "../../component/Admin/AdminComponent";

// icon
import { FaSortDown } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

const AdminHome = () => {
  const [category, setCategory] = useState("아이디");

  const [searchSelectOpen, setSearchSelectOpen] = useState(false);
  
  const handleCategory = () => {
    setSearchSelectOpen((prev) => !prev);
  }

  const handleSelectCategory = (select: string) => {
    setCategory(select);
    setSearchSelectOpen(false);
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
          
        </div>
        <div className="data-content">

        </div>
      </div>
    </AdminContainer>
  );
};

export default AdminHome;