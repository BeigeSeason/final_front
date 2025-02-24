import {useState, useEffect} from "react";
import { AdminContainer } from "./AdminComponent";
import AxiosApi from "../../api/AxiosApi";

// icon
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

const AdminReportUser = () => {
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

  // 데이터 정렬버튼
  const handleSort = () => {
    setSortSelectOpen((prev) => !prev);
  }
  const handleSelectSort = (select: string) => {
    setSort(select);
    setSortSelectOpen(false);
    // setTotalPages = Math.ceil(totalReports / size);
  }

  // 데이터 가져오기
  const reportList = async () => {
    try {
      const data = await AxiosApi.reportList(page - 1, size, "MEMBER");
      console.log("data: ", data);
      setReports(data.reports);
      setTotalElements(data.totalElements);
    } catch (error) {
      console.log("신고 리스트 조회 실패:", error);
    }
  };

  useEffect(() => {
    reportList();
  }, [page]);

  // 🔄 현재 페이지 데이터 계산
  const indexOfLastItem = page * size;
  const indexOfFirstItem = indexOfLastItem - size;
  const currentItems = reports.slice(indexOfFirstItem, indexOfLastItem);

  // 🔢 페이지 번호 생성
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalElements / size); i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (pageNumber: number) => setPage(pageNumber);


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
        {/* 📄 페이징 영역 */}
        <div className="pagination center">
          {pageNumbers.map((number) => (
            <button
              key={number}
              className={page === number ? "active" : ""}
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