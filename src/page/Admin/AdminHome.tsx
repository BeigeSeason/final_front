import {useState} from "react";
import { AdminContainer } from "./AdminComponent";
import { GlobalFont } from "../../style/GlobalStyled";
import { Modal } from "../../component/ModalComponent";

// icon
import { FaSortDown, FaAngleUp, FaAngleDown } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

const AdminHome = () => {
  const [category, setCategory] = useState("아이디");
  const [sort, setSort] = useState("정렬");

  const [searchSelectOpen, setSearchSelectOpen] = useState(false);
  const [sortSelectOpen, setSortSelectOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  
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

  // 유저 관리 모달
  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  // 유저 관리
  const manageUser = () => {
    setIsModalOpen(false);
  }

  // 임시 데이터
  const members = [
    { id: 1, userId: "user001", email: "user001@example.com", name: "홍길동", nickname: "길동", joinDate: "2025-01-01" },
    { id: 2, userId: "user002", email: "user002@example.com", name: "김철수", nickname: "철수", joinDate: "2025-01-05" },
    { id: 3, userId: "user003", email: "user003@example.com", name: "이영희", nickname: "영희", joinDate: "2025-01-10" }
  ];

  return (
    <AdminContainer>
      <GlobalFont/>
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
        <div className="data-content">
          <table>
            <thead>
              <tr>
                <th>번호</th>
                <th>이미지</th>
                <th>아이디</th>
                <th>이메일</th>
                <th>이름</th>
                <th>닉네임</th>
                <th>가입일</th>
                <th>소셜</th>
                <th>소셜아이디</th>
                <th>상태</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id}>
                  <td className="text-center">{member.id}</td>
                  <td></td>
                  <td>{member.userId}</td>
                  <td>{member.email}</td>
                  <td>{member.name}</td>
                  <td>{member.nickname}</td>
                  <td>{member.joinDate}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="center">
                    <button onClick={openModal}>
                      관리
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 관리버튼 모달 */}
      <Modal
        isOpen={isModalOpen}
        onConfirm={manageUser}
        onClose={closeModal}
      >
        <p>dd</p>
      </Modal>
    </AdminContainer>
  );
};

export default AdminHome;