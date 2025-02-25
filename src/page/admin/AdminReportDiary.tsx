import {useState, useEffect} from "react";
import { AdminContainer } from "./AdminComponent";
import AxiosApi from "../../api/AxiosApi";

// icon
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

const AdminReportDiary = () => {
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
  interface Report {
    id: number;
    reportType: string;
    reporter: Member;
    reported: Member;
    reportEntity: string;
    reason: string;
    createdAt: Date;
    checkedAt: Date;
    state: string;
  }
  const [reports, setReports] = useState<Report[]>([]);
  const [sort, setSort] = useState("정렬");
  const [page, setPage] = useState(1);
  const [size] = useState(3);
  const [totalElements, setTotalElements] = useState(0);

  const [sortSelectOpen, setSortSelectOpen] = useState(false);

  // 데이터 가져오기
  const reportList = async () => {
    try {
      const data = await AxiosApi.reportList(page - 1, size, "DIARY");
      setReports(data.reports);
      setTotalElements(data.totalElements);
    } catch (error) {
      console.log("신고 리스트 조회 실패:", error);
    }
  };
  useEffect(() => {
    reportList();
  }, [page]);

  // 페이지 번호 생성
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalElements / size); i++) {
    pageNumbers.push(i);
  }

  // 페이지 이동
  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber);
    console.log(reports);
    console.log(totalElements);
  };

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
            <div className="sort-selected" onClick={() => handleSelectSort("일기번호 낮은순")}>
              일기번호 낮은순
            </div>
            <div className="sort-selected" onClick={() => handleSelectSort("일기번호 높은순")}>
            일기번호 높은순
            </div>
          </div>
        )}
        <div className="data-content">
          <table>
            <thead>
              <tr>
                <th>번호</th>
                <th>일기 번호</th>
                <th>작성자</th>
                <th>신고자</th>
                <th>신고내역</th>
                <th>상태</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id}>
                  <td>{report.id}</td>
                  <td>{report.reportEntity}</td>
                  <td>{report.reported.userId}</td>
                  <td>{report.reporter.userId}</td>
                  <td>{report.reason}</td>
                  <td>{report.state}</td>
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
          {Array.from({ length: Math.min(pageNumbers.length, 9) }).map((_, index) => {
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
              pageNumber >= 1 && pageNumber <= pageNumbers.length && (
                <button
                  key={pageNumber}
                  className={page === pageNumber ? "activePage" : ""}
                  onClick={() => handlePageClick(pageNumber)}
                >
                  {pageNumber}
                </button>
              )
            );
          })}

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
    </AdminContainer>
  );
};
export default AdminReportDiary;