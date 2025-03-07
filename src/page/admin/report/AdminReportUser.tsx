import { useState, useEffect } from "react";
import { AdminContainer } from "../AdminComponent";
import AxiosApi from "../../../api/AxiosApi";
import { Report } from "../../../types/AdminTypes";
import { Modal } from "../../../component/ModalComponent";

// icon
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

const AdminReportUser = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [type, setType] = useState("");
  const [sort, setSort] = useState("정렬");
  const [page, setPage] = useState(1);
  const [size] = useState(10);
  const [totalElements, setTotalElements] = useState(0);

  const [reportId, setReportId] = useState<number | undefined>(undefined);
  const [reportState, setReportState] = useState(true);
  const [reportedId, setReportedId] = useState<number | undefined>(undefined);
  const [reportedUserId, setReportedUserId] = useState<string | undefined>(
    undefined
  );
  const [banDate, setBanDate] = useState(0);
  const [banReason, setBanReason] = useState("");

  const [typeSelectOpen, setTypeSelectOpen] = useState(false);
  const [sortSelectOpen, setSortSelectOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // 데이터 가져오기
  const reportList = async () => {
    try {
      const data = await AxiosApi.reportList(
        page - 1,
        size,
        "MEMBER",
        type,
        sort
      );
      setReports(data.reports);
      setTotalElements(data.totalElements);
    } catch (error) {
      console.log("신고 리스트 조회 실패:", error);
    }
  };
  useEffect(() => {
    reportList();
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

  // 데이터 분류버튼
  const handleType = () => {
    setTypeSelectOpen((prev) => !prev);
    setSortSelectOpen(false);
  };
  const handleSelectType = (select: string) => {
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

  // 신고 관리 모달
  const openModal = (
    reportId: number,
    reportedId: number,
    reportedUserId: string
  ) => {
    setIsModalOpen(true);
    setReportId(reportId);
    setReportedId(reportedId);
    setReportedUserId(reportedUserId);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setBanDate(0);
    setBanReason("");
    setReportState(true);
  };

  // 신고 처리
  const manageUser = async () => {
    setIsModalOpen(false);
    try {
      await AxiosApi.reportProcess(
        reportId,
        reportState,
        banDate === 0 ? null : reportedId,
        banDate,
        banReason,
        null,
        null
      );
    } catch (error) {
      console.log("유저 정지 에러:", error);
    }
    setBanDate(0);
    setBanReason("");
    setReportState(true);
    reportList();
  };

  return (
    <AdminContainer>
      <h1>유저 신고</h1>
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
                  case "WAIT":
                    return "대기";
                  case "ACCEPT":
                    return "승인";
                  case "REJECT":
                    return "거절";
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
                  default:
                    return "정렬";
                }
              })()}
            </div>
          </div>
        </div>
        {typeSelectOpen && (
          <div className="selectBox type">
            <div className="selected" onClick={() => handleSelectType("")}>
              분류
            </div>
            <div className="selected" onClick={() => handleSelectType("WAIT")}>
              대기
            </div>
            <div
              className="selected"
              onClick={() => handleSelectType("ACCEPT")}
            >
              승인
            </div>
            <div
              className="selected"
              onClick={() => handleSelectType("REJECT")}
            >
              거절
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
              {reports.map((report) => (
                <tr key={report.id}>
                  <td>{report.id}</td>
                  <td>{report.reported.userId}</td>
                  <td>{report.reporter.userId}</td>
                  <td>{report.reason}</td>
                  <td
                    className="text-center"
                    style={{
                      color: (() => {
                        switch (report.state) {
                          case "ACCEPT":
                            return "green";
                          case "REJECT":
                            return "red";
                          default:
                            return "black";
                        }
                      })(),
                    }}
                  >
                    {(() => {
                      switch (report.state) {
                        case "WAIT":
                          return "대기";
                        case "ACCEPT":
                          return "승인";
                        case "REJECT":
                          return "거절";
                        default:
                          return "알 수 없음"; // 예기치 않은 값에 대한 처리
                      }
                    })()}
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() =>
                        openModal(
                          report.id,
                          report.reported.id,
                          report.reported.userId
                        )
                      }
                    >
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
          <span>신고 번호 : {reportId}</span>
          <span>대상자 번호 : {reportedId}</span>
          <span>대상자 아이디 : {reportedUserId}</span>
          <span>정지일 : </span>
          <select
            name="ban-date"
            id="ban-date"
            value={banDate}
            onChange={(e) => setBanDate(Number(e.target.value))}
            className="text-center"
          >
            <option value={0}>보류</option>
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
          <span>신고 처리 : </span>
          <select
            name="report-state"
            id="report-state"
            value={reportState ? "true" : "false"}
            onChange={(e) => setReportState(e.target.value === "true")}
            className="text-center"
          >
            <option value="true">승인</option>
            <option value="false">거절</option>
          </select>
        </div>
      </Modal>
    </AdminContainer>
  );
};
export default AdminReportUser;
