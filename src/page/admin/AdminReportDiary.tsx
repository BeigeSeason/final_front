import {useState} from "react";
import { AdminContainer } from "./AdminComponent";

// icon
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

const AdminReportDiary = () => {
  const [sort, setSort] = useState("정렬");

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
    { id: 1, diaryId: 101, authorId: "user001", reporterId: "user010", reportDetails: "부적절한 언어 사용", status: "대기중" },
    { id: 2, diaryId: 102, authorId: "user002", reporterId: "user011", reportDetails: "허위 정보 작성", status: "대기중" },
    { id: 3, diaryId: 103, authorId: "user003", reporterId: "user012", reportDetails: "타인 비방 내용 포함", status: "대기중" }
  ];

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
                  <td>{report.diaryId}</td>
                  <td>{report.authorId}</td>
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
      </div>
    </AdminContainer>
  );
};
export default AdminReportDiary;