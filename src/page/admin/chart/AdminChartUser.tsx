import { useState, useEffect } from "react";
import { AdminContainer } from "../AdminComponent";
import { GlobalFont } from "../../../style/GlobalStyled";
import AxiosApi from "../../../api/AxiosApi";
import BarChart from "./UserChartComponent";
import { Modal } from "../../../component/ModalComponent";

// icon
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const AdminChartUser = () => {
  const [title1, setTitle1] = useState("가입 유저 수");
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [inputYear, setInputYear] = useState<number>(0);
  const [chartData1, setChartData1] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // 데이터 가져오기
  const statsData = async (year: number) => {
    try {
      const response = await AxiosApi.monthlyStats("user", year);
      console.log(response.data);
      setChartData1(response.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  }
  useEffect(() => {
    statsData(year);
  }, [year]);

  // year 버튼
  const handleYearMinus = () => {
    setYear(year - 1);
  };
  const handleYearPlus = () => {
    setYear(year + 1);
  };

  // year 모달
  const openModal = () => {
    setInputYear(year);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleInputYear = () => {
    setYear(inputYear);
    setIsModalOpen(false);
  };

  // year 변경 시 inputYear 변경
  useEffect(() => {
    setInputYear(year);
  }, [year]);

  return (
    <AdminContainer>
      <GlobalFont />
      <div style={{width: "70%"}}>
        <div className="chartTitle center">
          <div className="icon center" onClick={handleYearMinus}>
            <FaChevronLeft />
          </div>
          <span className="title" onClick={openModal}>
            {year}년 유저 통계
          </span>
          <div className="icon center" onClick={handleYearPlus}>
            <FaChevronRight />
          </div>
        </div>
        <BarChart title1={title1} chartData1={chartData1} />
      </div>

      {/* year 모달 */}
      <Modal
        isOpen={isModalOpen}
        onConfirm={handleInputYear}
        onClose={closeModal}
      >
        <div className="gap-10">
          <span>연도 입력</span>
          <input
            type="number"
            value={inputYear}
            onChange={(e) => setInputYear(Number(e.target.value))}
          />
        </div>
      </Modal>
    </AdminContainer>
  );
};

export default AdminChartUser;
