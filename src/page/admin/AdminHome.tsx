import { useState, useEffect } from "react";
import { AdminContainer } from "./AdminComponent";
import { GlobalFont } from "../../style/GlobalStyled";
import { Modal } from "../../component/ModalComponent";
import AxiosApi from "../../api/AxiosApi";
import { Member } from "../../types/AdminTypes";

// icon
import { FaSortDown, FaAngleUp, FaAngleDown } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

const AdminHome = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [page, setPage] = useState(1);
  const [size] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const [searchType, setSearchType] = useState("ID");
  const [searchValue, setSearchValue] = useState("");

  const [banId, setBanId] = useState<number | undefined>(undefined);
  const [banUserId, setBanUserId] = useState<String | undefined>(undefined);
  const [banDate, setBanDate] = useState(0);
  const [banReason, setBanReason] = useState("");

  const [type, setType] = useState<boolean | null>(null);
  const [sort, setSort] = useState("");

  const [searchSelectOpen, setSearchSelectOpen] = useState(false);
  const [typeSelectOpen, setTypeSelectOpen] = useState(false);
  const [sortSelectOpen, setSortSelectOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // 데이터 가져오기
  const memberList = async () => {
    try {
      const data = await AxiosApi.memberList(
        page - 1,
        size,
        searchType,
        searchValue,
        type,
        sort
      );
      setMembers(data.members);
      console.log(data);
      setTotalElements(data.totalElements);
    } catch (error) {
      console.log("멤버 리스트 조회 실패:", error);
    }
  };
  useEffect(() => {
    memberList();
  }, [page, type, sort]);

  // 페이지 번호 생성
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalElements / size); i++) {
    pageNumbers.push(i);
  }

  // 페이지 이동
  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber);
  };

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
    memberList();
    setPage(1);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "") {
      handleSearch();
    }
  };

  // 데이터 분류버튼
  const handleType = () => {
    setTypeSelectOpen((prev) => !prev);
    setSortSelectOpen(false);
  };
  const handleSelectType = (select: boolean | null) => {
    console.log("select:", select);
    setType(select);
    setTypeSelectOpen(false);
  };
  // 데이터 정렬버튼
  const handleSort = () => {
    setSortSelectOpen((prev) => !prev);
    setTypeSelectOpen(false);
  };
  const handleSelectSort = (select: string) => {
    setSort(select);
    setSortSelectOpen(false);
  };

  // 유저 관리 모달
  const openModal = (id: number, userId: string) => {
    setIsModalOpen(true);
    setBanId(id);
    setBanUserId(userId);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setBanDate(0);
    setBanReason("");
  };

  // 유저 관리
  const manageUser = async () => {
    setIsModalOpen(false);
    try {
      await AxiosApi.banMember(banId, banDate, banReason);
    } catch (error) {
      console.log("유저 정지 에러:", error);
    }
    setBanDate(0);
    setBanReason("");
    memberList();
  };

  return (
    <AdminContainer>
      <GlobalFont />
      <h1>유저 관리</h1>
      {/* 검색 박스 */}
      <div className="search-container center">
        <div className="search-category center" onClick={handleCategory}>
          {(() => {
            switch (searchType) {
              case "ID":
                return "아이디";
              case "NAME":
                return "이름";
              case "NICKNAME":
                return "닉네임";
              case "EMAIL":
                return "이메일";
              default:
                return "아이디";
            }
          })()}{" "}
          <FaSortDown />
        </div>
        {searchSelectOpen && (
          <div className="search-selectBox">
            <div
              className="search-selected"
              onClick={() => handleSelectCategory("ID")}
            >
              아이디
            </div>
            <div
              className="search-selected"
              onClick={() => handleSelectCategory("NAME")}
            >
              이름
            </div>
            <div
              className="search-selected"
              onClick={() => handleSelectCategory("NICKNAME")}
            >
              닉네임
            </div>
            <div
              className="search-selected"
              onClick={() => handleSelectCategory("EMAIL")}
            >
              이메일
            </div>
          </div>
        )}
        <div className="search-input center">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="search-button center" onClick={() => handleSearch()}>
          <IoSearch />
        </div>
      </div>

      {/* 데이터 박스 */}
      <div className="data-container">
        <div className="data-head">
          <div className="sort-box" onClick={handleType}>
            <div className="sort-icon">
              <FaAngleUp />
              <FaAngleDown />
            </div>
            <div className="type-selected center">
              {(() => {
                switch (type) {
                  case false:
                    return "정상";
                  case true:
                    return "정지";
                  default:
                    return "분류";
                }
              })()}
            </div>
          </div>
          <div className="sort-box" onClick={handleSort}>
            <div className="sort-icon">
              <FaAngleUp />
              <FaAngleDown />
            </div>
            <div className="sort-selected center">
              {(() => {
                switch (sort) {
                  case "idAsc":
                    return "번호 낮은순";
                  case "idDesc":
                    return "번호 높은순";
                  case "userIdAsc":
                    return "아이디 오름차순";
                  case "userIdDesc":
                    return "아이디 내림차순";
                  default:
                    return "정렬";
                }
              })()}
            </div>
          </div>
        </div>
        {typeSelectOpen && (
          <div className="selectBox type">
            <div className="selected" onClick={() => handleSelectType(null)}>
              분류
            </div>
            <div className="selected" onClick={() => handleSelectType(false)}>
              정상
            </div>
            <div className="selected" onClick={() => handleSelectType(true)}>
              정지
            </div>
          </div>
        )}
        {sortSelectOpen && (
          <div className="selectBox sort">
            <div
              className="selected center"
              onClick={() => handleSelectSort("")}
            >
              정렬
            </div>
            <div
              className="selected center"
              onClick={() => handleSelectSort("idAsc")}
            >
              번호 낮은순
            </div>
            <div
              className="selected center"
              onClick={() => handleSelectSort("idDesc")}
            >
              번호 높은순
            </div>
            <div
              className="selected center"
              onClick={() => handleSelectSort("userIdAsc")}
            >
              아이디 오름차순
            </div>
            <div
              className="selected center"
              onClick={() => handleSelectSort("userIdDesc")}
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
              {members && members.length > 0 ? (
                members.map((member) => (
                  <tr key={member.id}>
                    <td className="text-center">{member.id}</td>
                    <td></td>
                    <td>{member.userId}</td>
                    <td>{member.email}</td>
                    <td>{member.name}</td>
                    <td>{member.nickname}</td>
                    <td>{member.regDate}</td>
                    <td>{member.sso ? member.sso : ""}</td>
                    <td>{member.ssoId ? member.ssoId : ""}</td>
                    <td className={member.banned ? "text-red" : "text-green"}>
                      {member.banned ? "정지" : "정상"}
                    </td>
                    <td className="center">
                      <button
                        onClick={() => openModal(member.id, member.userId)}
                      >
                        관리
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="text-center">
                    데이터가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* 페이징 영역 */}
        <div className="pagination center">
          <button
            className="page-btn"
            onClick={() => handlePageClick(1)}
            disabled={page === 1}
          >
            {"<<"} {/* 첫 페이지로 이동 */}
          </button>
          <button
            className="page-btn"
            onClick={() => handlePageClick(page - 1)}
            disabled={page === 1}
          >
            {"<"} {/* 이전 페이지로 이동 */}
          </button>

          {/* 페이지 번호 표시 */}
          {Array.from({ length: Math.min(pageNumbers.length, 9) }).map(
            (_, index) => {
              let pageNumber: number; // 타입을 명시적으로 지정

              if (page <= 4) {
                // 1~4 페이지일 때는 1~9까지 페이지를 표시
                pageNumber = index + 1;
              } else if (pageNumbers.length - page <= 4) {
                // 마지막 4페이지 근처일 때는 뒤쪽으로 9개 페이지를 표시
                pageNumber = pageNumbers.length - (8 - index);
              } else {
                // 그 외에는 현재 페이지 기준으로 앞 4개, 뒤 4개 표시
                pageNumber = page - 4 + index;
              }

              // 페이지 번호가 1 이상, 마지막 페이지 이하로 보정
              pageNumber = Math.max(pageNumber, 1);
              pageNumber = Math.min(pageNumber, pageNumbers.length);

              return (
                pageNumber >= 1 &&
                pageNumber <= pageNumbers.length && (
                  <button
                    key={pageNumber}
                    className={page === pageNumber ? "activePage" : ""}
                    onClick={() => handlePageClick(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                )
              );
            }
          )}

          <button
            className="page-btn"
            onClick={() => handlePageClick(page + 1)}
            disabled={page === pageNumbers.length}
          >
            {">"} {/* 다음 페이지로 이동 */}
          </button>
          <button
            className="page-btn"
            onClick={() => handlePageClick(pageNumbers.length)}
            disabled={page === pageNumbers.length}
          >
            {">>"} {/* 마지막 페이지로 이동 */}
          </button>
        </div>
      </div>

      {/* 관리버튼 모달 */}
      <Modal isOpen={isModalOpen} onConfirm={manageUser} onClose={closeModal}>
        <div className="gap-10">
          <span>번호 : {banId}</span>
          <span>아이디 : {banUserId}</span>
          <span>정지일 : </span>
          <select
            name="ban-date"
            id="ban-date"
            value={banDate}
            onChange={(e) => setBanDate(Number(e.target.value))}
            className="text-center"
          >
            <option value={1}>1일</option>
            <option value={3}>3일</option>
            <option value={7}>7일</option>
            <option value={30}>30일</option>
            <option value={36500}>영구 정지</option>
          </select>
          <span>정지 사유</span>
          <input
            type="text"
            value={banReason}
            onChange={(e) => setBanReason(e.target.value)}
          />
        </div>
      </Modal>
    </AdminContainer>
  );
};

export default AdminHome;
