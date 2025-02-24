import { useState, useEffect } from "react";
import { AdminContainer } from "./AdminComponent";
import { GlobalFont } from "../../style/GlobalStyled";
import { Modal } from "../../component/ModalComponent";
import AxiosApi from "../../api/AxiosApi";

// icon
import { FaSortDown, FaAngleUp, FaAngleDown } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

const AdminHome = () => {
  interface Member {
    id: number;
    userId: string;
    email: string;
    name: string;
    nickname: string;
    imgPath: string;
    regDate: string;
    banned: Boolean;
  }
  const [members, setMembers] = useState<Member[]>([]);
  const [page, setPage] = useState(1);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [searchType, setSearchType] = useState("NAME");
  const [searchValue, setSearchValue] = useState("");

  const [sort, setSort] = useState("정렬");

  const [searchSelectOpen, setSearchSelectOpen] = useState(false);
  const [sortSelectOpen, setSortSelectOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // 데이터 가져오기
  const memberList = async () => {
    try {
      const data = await AxiosApi.memberList(page - 1, size, searchType, searchValue);
      console.log("data: ", data);
      setMembers(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log("멤버 리스트 조회 실패:", error);
    }
  };

  useEffect(() => {
    memberList();
  }, [page, searchType, searchValue]);

  

  // 검색 카테고리 선택
  const handleCategory = () => {
    setSearchSelectOpen((prev) => !prev);
  };
  const handleSelectCategory = (select: string) => {
    setSearchType(select);
    setSearchSelectOpen(false);
  };

  // 검색 기능
  const handleSearch = () => {
    setPage(1);
    memberList();
  };

  // 데이터 정렬버튼
  const handleSort = () => {
    setSortSelectOpen((prev) => !prev);
  };
  const handleSelectSort = (select: string) => {
    setSort(select);
    setSortSelectOpen(false);
  };

  // 유저 관리 모달
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 유저 관리
  const manageUser = () => {
    setIsModalOpen(false);
  };

  return (
    <AdminContainer>
      <GlobalFont />
      {/* 검색 박스 */}
      <div className="search-container center">
        <div className="search-category center" onClick={handleCategory}>
          {searchType} <FaSortDown />
        </div>
        {searchSelectOpen && (
          <div className="search-selectBox">
            <div
              className="search-selected"
              onClick={() => handleSelectCategory("아이디")}
            >
              아이디
            </div>
            <div
              className="search-selected"
              onClick={() => handleSelectCategory("닉네임")}
            >
              닉네임
            </div>
            <div
              className="search-selected"
              onClick={() => handleSelectCategory("이메일")}
            >
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
            <div className="sort-selected center">{sort}</div>
          </div>
        </div>
        {sortSelectOpen && (
          <div className="sort-selectBox">
            <div
              className="sort-selected"
              onClick={() => handleSelectSort("번호 낮은순")}
            >
              번호 낮은순
            </div>
            <div
              className="sort-selected"
              onClick={() => handleSelectSort("번호 높은순")}
            >
              번호 높은순
            </div>
            <div
              className="sort-selected"
              onClick={() => handleSelectSort("아이디 오름차순")}
            >
              아이디 오름차순
            </div>
            <div
              className="sort-selected"
              onClick={() => handleSelectSort("아이디 내림차순")}
            >
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
              {members && members.length > 0 ? (members.map((member) => (
                <tr key={member.id}>
                  <td className="text-center">{member.id}</td>
                  <td></td>
                  <td>{member.userId}</td>
                  <td>{member.email}</td>
                  <td>{member.name}</td>
                  <td>{member.nickname}</td>
                  <td>{member.regDate}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="center">
                    <button onClick={openModal}>관리</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="text-center">데이터가 없습니다.</td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 관리버튼 모달 */}
      <Modal isOpen={isModalOpen} onConfirm={manageUser} onClose={closeModal}>
        <p>정지일</p>
        <select name="ban-date" id="ban-date">
          <option value="1day">1일</option>
          <option value="3days">3일</option>
          <option value="7days">7일</option>
          <option value="30days">30일</option>
          <option value="fvr">영구 정지</option>
        </select>
        <p>정지 사유</p>
        <input type="text" />
      </Modal>
    </AdminContainer>
  );
};

export default AdminHome;
