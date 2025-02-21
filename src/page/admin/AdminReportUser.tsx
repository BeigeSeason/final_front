import {useState} from "react";
import { AdminContainer } from "./AdminComponent";

// icon
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

const AdminReportUser = () => {
  const [sort, setSort] = useState("정렬");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const [sortSelectOpen, setSortSelectOpen] = useState(false);

  // 데이터 정렬버튼
  const handleSort = () => {
    setSortSelectOpen((prev) => !prev);
  }
  const handleSelectSort = (select: string) => {
    setSort(select);
    setSortSelectOpen(false);
  }

  // 임시 데이터
  const reports = [
    { id: 1, targetId: "user001", reporterId: "admin01", reportDetails: "부적절한 언어 사용", status: "대기중" },
    { id: 2, targetId: "user002", reporterId: "admin02", reportDetails: "불법적인 컨텐츠 업로드", status: "대기중" },
    { id: 3, targetId: "user003", reporterId: "admin03", reportDetails: "다른 사용자의 개인정보 유출", status: "대기중" },
    { id: 4, targetId: "user004", reporterId: "admin04", reportDetails: "스팸성 메시지 반복 전송", status: "처리 중" },
    { id: 5, targetId: "user005", reporterId: "admin05", reportDetails: "허위 정보 게시", status: "처리 완료" },
    { id: 6, targetId: "user006", reporterId: "admin06", reportDetails: "타인 비방 및 모욕", status: "대기중" },
    { id: 7, targetId: "user007", reporterId: "admin07", reportDetails: "선정적인 콘텐츠 게시", status: "처리 중" },
    { id: 8, targetId: "user008", reporterId: "admin08", reportDetails: "불법 다운로드 링크 공유", status: "대기중" },
    { id: 9, targetId: "user009", reporterId: "admin09", reportDetails: "계정 해킹 시도", status: "대기중" },
    { id: 10, targetId: "user010", reporterId: "admin10", reportDetails: "도배성 댓글 작성", status: "처리 완료" },
    { id: 11, targetId: "user011", reporterId: "admin01", reportDetails: "비방적 언어 사용", status: "대기중" },
    { id: 12, targetId: "user012", reporterId: "admin02", reportDetails: "저작권 침해 자료 업로드", status: "처리 완료" },
    { id: 13, targetId: "user013", reporterId: "admin03", reportDetails: "악성 프로그램 배포", status: "처리 중" },
    { id: 14, targetId: "user014", reporterId: "admin04", reportDetails: "차별적 발언", status: "대기중" },
    { id: 15, targetId: "user015", reporterId: "admin05", reportDetails: "도박 관련 콘텐츠 게시", status: "대기중" },
    { id: 16, targetId: "user016", reporterId: "admin06", reportDetails: "위협적인 메시지 전송", status: "처리 중" },
    { id: 17, targetId: "user017", reporterId: "admin07", reportDetails: "불법 성인물 업로드", status: "처리 완료" },
    { id: 18, targetId: "user018", reporterId: "admin08", reportDetails: "허위 신고 반복", status: "대기중" },
    { id: 19, targetId: "user019", reporterId: "admin09", reportDetails: "악의적 리뷰 작성", status: "대기중" },
    { id: 20, targetId: "user020", reporterId: "admin10", reportDetails: "다른 사용자 사칭", status: "처리 중" }
  ];

  // 🔄 현재 페이지 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reports.slice(indexOfFirstItem, indexOfLastItem);

  // 🔢 페이지 번호 생성
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(reports.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (pageNumber: number) => setCurrentPage(pageNumber);


  return (
    <AdminContainer>
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
                <th>대상자</th>
                <th>신고자</th>
                <th>신고내역</th>
                <th>상태</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((report) => (
                <tr key={report.id}>
                  <td>{report.id}</td>
                  <td>{report.targetId}</td>
                  <td>{report.reporterId}</td>
                  <td>{report.reportDetails}</td>
                  <td>{report.status}</td>
                  <td className="center">
                    <button>
                      관리
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* 📄 페이징 영역 */}
        <div className="pagination center">
          {pageNumbers.map((number) => (
            <button
              key={number}
              className={currentPage === number ? "active" : ""}
              onClick={() => handlePageClick(number)}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    </AdminContainer>
  );
};
export default AdminReportUser;