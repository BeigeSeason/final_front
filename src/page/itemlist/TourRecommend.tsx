import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../../api/AxiosApi";
import { TourItemInfoBox, SpotTitle, RecommendBox } from "../../style/TourSpotStyled";
import { CheckModal } from "../../component/ModalComponent";
import { Recommendation, RecommendInput } from "../../types/CommonTypes";
import { Button } from "../../component/ButtonComponent";

const TourRecommend = () => {
  const [gender, setGender] = useState<number>(-1);
  const [age, setAge] = useState<number>(0);
  const [companions, setCompanions] = useState<number>(1);
  const [style1, setStyle1] = useState<number>(0);
  const [style2, setStyle2] = useState<number>(0);
  const [style3, setStyle3] = useState<number>(0);
  const [style4, setStyle4] = useState<number>(0);
  const [style5, setStyle5] = useState<number>(0);
  const [style6, setStyle6] = useState<number>(0);
  const [style7, setStyle7] = useState<number>(0);
  const [style8, setStyle8] = useState<number>(0);
  const [motive, setMotive] = useState<number>(0);
  const [purpose, setPurpose] = useState<number>(0);

  const [isCheckModalOpen, setIsCheckModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleRecommend = async () => {
    if (
      gender === -1 ||
      age === 0 ||
      style1 === 0 ||
      style2 === 0 ||
      style3 === 0 ||
      style4 === 0 ||
      style5 === 0 ||
      style6 === 0 ||
      style7 === 0 ||
      style8 === 0 ||
      motive === 0 ||
      purpose === 0
    ) {
      console.log("모든 값을 설정해야 합니다.");
      setIsCheckModalOpen(true);
      return;
    }
    const data: RecommendInput = {
      GENDER: gender,
      AGE_GRP: age,
      TRAVEL_STYL_1: style1,
      TRAVEL_STYL_2: style2,
      TRAVEL_STYL_3: style3,
      TRAVEL_STYL_4: style4,
      TRAVEL_STYL_5: style5,
      TRAVEL_STYL_6: style6,
      TRAVEL_STYL_7: style7,
      TRAVEL_STYL_8: style8,
      TRAVEL_MOTIVE_1: motive,
      TRAVEL_COMPANIONS_NUM: companions,
      TRAVEL_MISSION_INT: purpose,
    }
    const response = await AxiosApi.recommendSpot(data);

    navigate(`/tourRecommend/result`, { state: { recommendations: response } });
  };

  const handleCheckModalClose = () => {
    setIsCheckModalOpen(false);
  };

  return (
    <TourItemInfoBox>
      <SpotTitle>
        <h1 className="tour-title">여행지 추천</h1>
      </SpotTitle>
      <RecommendBox>
        <div className="recommend-box gap30">
          <div className="title center">
            성별
          </div>
          <div 
            className={`genderBox ${gender === 1 ? "selected" : ""}`}
            onClick={() => setGender(1)}
          >
            남자
          </div>
          <div 
            className={`genderBox ${gender === 0 ? "selected" : ""}`}
            onClick={() => setGender(0)}
          >
            여자
          </div>
        </div>
        <div className="recommend-box gap30">
          <div className="title center">
            나이
          </div>
          <div 
            className={`genderBox ${age === 20 ? "selected" : ""}`}
            onClick={() => setAge(20)}
          >
            20대
          </div>
          <div 
            className={`genderBox ${age === 30 ? "selected" : ""}`}
            onClick={() => setAge(30)}
          >
            30대
          </div>
          <div 
            className={`genderBox ${age === 40 ? "selected" : ""}`}
            onClick={() => setAge(40)}
          >
            40대
          </div>
          <div 
            className={`genderBox ${age === 50 ? "selected" : ""}`}
            onClick={() => setAge(50)}
          >
            50대
          </div>
          <div 
            className={`genderBox ${age === 60 ? "selected" : ""}`}
            onClick={() => setAge(60)}
          >
            60대
          </div>
        </div>
        <div className="recommend-box gap30">
          <div className="title center">
            인원
          </div>
            <select value={companions} onChange={(e) => setCompanions(Number(e.target.value))}>
              {Array.from({ length: 20 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
          </select>
        </div>
        <div className="recommend-box gap30">
          <div className="title justify-center" style={{ paddingTop: "8px" }}>
            스타일
          </div>
          <div className="radio-gap">
            <div className="radio-container">
              <div className="radio-item center">자연형</div>
              <div className="radio-box">
                {Array.from({ length: 7 }, (_, i) => (
                  <div key={i + 1} className="radio-lineBox">
                    {/* 선 (버튼을 연결하는 역할) */}
                    {i !== 6 && ( // 마지막 버튼에는 선을 추가하지 않음
                      <div className="radio-line"/>
                    )}
                    {/* 버튼 */}
                    <input
                      type="radio"
                      name="survey"
                      value={i + 1}
                      checked={style1 === i + 1}
                      onChange={() => setStyle1(i + 1)}
                      className="radio-button"
                      style={{ backgroundColor: style1 === i + 1 ? "#aaa" : "white" }}
                    />
                  </div>
                ))}
              </div>
              <div className="radio-item center">도시형</div>
            </div>
            <div className="radio-container">
              <div className="radio-item center">숙박</div>
              <div className="radio-box">
                {Array.from({ length: 7 }, (_, i) => (
                  <div key={i + 1} className="radio-lineBox">
                    {i !== 6 && (
                      <div className="radio-line"/>
                    )}
                    <input
                      type="radio"
                      name="survey"
                      value={i + 1}
                      checked={style2 === i + 1}
                      onChange={() => setStyle2(i + 1)}
                      className="radio-button"
                      style={{ backgroundColor: style2 === i + 1 ? "#aaa" : "white" }}
                    />
                  </div>
                ))}
              </div>
              <div className="radio-item center">당일치기</div>
            </div>
            <div className="radio-container">
              <div className="radio-item center">새로움</div>
              <div className="radio-box">
                {Array.from({ length: 7 }, (_, i) => (
                  <div key={i + 1} className="radio-lineBox">
                    {i !== 6 && (
                      <div className="radio-line"/>
                    )}
                    <input
                      type="radio"
                      name="survey"
                      value={i + 1}
                      checked={style3 === i + 1}
                      onChange={() => setStyle3(i + 1)}
                      className="radio-button"
                      style={{ backgroundColor: style3 === i + 1 ? "#aaa" : "white" }}
                    />
                  </div>
                ))}
              </div>
              <div className="radio-item center">익숙함</div>
            </div>
            <div className="radio-container">
              <div className="radio-item center">고급</div>
              <div className="radio-box">
                {Array.from({ length: 7 }, (_, i) => (
                  <div key={i + 1} className="radio-lineBox">
                    {i !== 6 && (
                      <div className="radio-line"/>
                    )}
                    <input
                      type="radio"
                      name="survey"
                      value={i + 1}
                      checked={style4 === i + 1}
                      onChange={() => setStyle4(i + 1)}
                      className="radio-button"
                      style={{ backgroundColor: style4 === i + 1 ? "#aaa" : "white" }}
                    />
                  </div>
                ))}
              </div>
              <div className="cenradio-item centerter">경제적</div>
            </div>
            <div className="radio-container">
              <div className="radio-item center">여유</div>
              <div className="radio-box">
                {Array.from({ length: 7 }, (_, i) => (
                  <div key={i + 1} className="radio-lineBox">
                    {i !== 6 && (
                      <div className="radio-line"/>
                    )}
                    <input
                      type="radio"
                      name="survey"
                      value={i + 1}
                      checked={style5 === i + 1}
                      onChange={() => setStyle5(i + 1)}
                      className="radio-button"
                      style={{ backgroundColor: style5 === i + 1 ? "#aaa" : "white" }}
                    />
                  </div>
                ))}
              </div>
              <div className="radio-item center">액티브</div>
            </div>
            <div className="radio-container">
              <div className="radio-item center">한적함</div>
              <div className="radio-box">
                {Array.from({ length: 7 }, (_, i) => (
                  <div key={i + 1} className="radio-lineBox">
                    {i !== 6 && (
                      <div className="radio-line"/>
                    )}
                    <input
                      type="radio"
                      name="survey"
                      value={i + 1}
                      checked={style6 === i + 1}
                      onChange={() => setStyle6(i + 1)}
                      className="radio-button"
                      style={{ backgroundColor: style6 === i + 1 ? "#aaa" : "white" }}
                    />
                  </div>
                ))}
              </div>
              <div className="radio-item center">유명함</div>
            </div>
            <div className="radio-container">
              <div className="radio-item center">계획적</div>
              <div className="radio-box">
                {Array.from({ length: 7 }, (_, i) => (
                  <div key={i + 1} className="radio-lineBox">
                    {i !== 6 && (
                      <div className="radio-line"/>
                    )}
                    <input
                      type="radio"
                      name="survey"
                      value={i + 1}
                      checked={style7 === i + 1}
                      onChange={() => setStyle7(i + 1)}
                      className="radio-button"
                      style={{ backgroundColor: style7 === i + 1 ? "#aaa" : "white" }}
                    />
                  </div>
                ))}
              </div>
              <div className="radio-item center">즉흥적</div>
            </div>
            <div className="radio-container">
              <div className="radio-item center">경험</div>
              <div className="radio-box">
                {Array.from({ length: 7 }, (_, i) => (
                  <div key={i + 1} className="radio-lineBox">
                    {i !== 6 && (
                      <div className="radio-line"/>
                    )}
                    <input
                      type="radio"
                      name="survey"
                      value={i + 1}
                      checked={style8 === i + 1}
                      onChange={() => setStyle8(i + 1)}
                      className="radio-button"
                      style={{ backgroundColor: style8 === i + 1 ? "#aaa" : "white" }}
                    />
                  </div>
                ))}
              </div>
              <div className="radio-item center">사진</div>
            </div>
          </div>
        </div>
        <div className="recommend-box gap30">
          <div className="title center">
            여행 동기
          </div>
          <select 
            name="motive"
            value={motive}
            onChange={(e) => setMotive(Number(e.target.value))}
          >
            <option value={0}>여행 동기를 선택하세요</option>
            <option value={1}>일상에서 벗어나기 (지루함 탈피, 환경 및 역할 변화)</option>
            <option value={2}>휴식과 재충전 (육체적 피로 해소 및 정신적 힐링)</option>
            <option value={3}>여행 동반자와의 유대감 형성</option>
            <option value={4}>자신을 돌아보는 시간 (자아 탐색)</option>
            <option value={5}>추억 남기기 및 SNS 공유</option>
            <option value={6}>운동 및 건강 관리</option>
            <option value={7}>새로운 경험과 도전</option>
            <option value={8}>역사 및 문화 탐방 (교육적 동기)</option>
            <option value={9}>특별한 기념 여행 (신혼여행, 칠순여행 등)</option>
            <option value={10}>기타</option>
          </select>
        </div>
        <div className="recommend-box gap30">
          <div className="title center">
            여행 목적
          </div>
          <select 
            name="purpose"
            value={purpose}
            onChange={(e) => setPurpose(Number(e.target.value))}
          >
            <option value={0}>여행 목적을 선택하세요</option>
            <option value={1}>쇼핑 여행</option>
            <option value={2}>테마파크 및 동/식물원 방문</option>
            <option value={3}>역사 유적지 탐방</option>
            <option value={4}>도시 투어</option>
            <option value={5}>레포츠 및 야외 스포츠</option>
            <option value={6}>문화예술 및 공연 관람</option>
            <option value={7}>유흥 및 오락</option>
            <option value={8}>캠핑 여행</option>
            <option value={9}>지역 축제 및 이벤트 참가</option>
            <option value={10}>온천 및 스파</option>
            <option value={11}>교육 및 체험 프로그램</option>
            <option value={12}>드라마 촬영지 탐방</option>
            <option value={13}>종교 및 성지 순례</option>
            <option value={21}>힐링 & 웰빙 여행</option>
            <option value={22}>SNS 사진 여행</option>
            <option value={23}>호캉스</option>
            <option value={24}>신규 여행지 탐방</option>
            <option value={25}>반려동물과 함께하는 여행</option>
            <option value={26}>인플루언서 여행</option>
            <option value={27}>플로깅 여행 (친환경 여행)</option>
            <option value={28}>등산 및 등반 여행</option>
          </select>
        </div>
        <Button
          onClick={handleRecommend}
        >
          추천받기
        </Button>
      </RecommendBox>
      <CheckModal
        isOpen={isCheckModalOpen}
        onClose={handleCheckModalClose}
      >
        <p>모든 항목을 선택해야 합니다.</p>
      </CheckModal>
    </TourItemInfoBox>
  );
};

export default TourRecommend;