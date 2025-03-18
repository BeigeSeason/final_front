import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  TourItemInfoBox,
  SpotTitle,
  RecommendBox,
} from "../../style/TourSpotStyled";
import AxiosApi from "../../api/AxiosApi";
import basicImg from "../../img/item/type_200.png";

import { FaArrowRight } from "react-icons/fa";

const TourRecResult = () => {
  const location = useLocation();
  const recommendations = location.state?.recommendations || [];
  const [recArray, setRecArray] = useState<Record<string, Array<Item>>>({});
  const navigate = useNavigate();

  type Item = {
    spotId: string;
    title: string | null;
    addr: string | null;
    thumbnail: string;
    cat1: string | null;
    cat2: string | null;
    cat3: string | null;
    avgRating: number;
    bookmarkCount: number;
    reviewCount: number;
  };

  useEffect(() => {
    const sendToBackend = async () => {
      const keyword = recommendations.map((item: any) => item.VISIT_AREA_NM);

      try {
        const response = await AxiosApi.recommendResult(keyword);
        setRecArray(response);
        console.log("백엔드 응답:", response);
        // 응답을 받아서 상태를 업데이트하거나 다른 작업을 할 수 있습니다
      } catch (error) {
        console.error("데이터 요청 실패:", error);
      }
    };
    console.log("recArray: ", recArray);
    sendToBackend(); // 컴포넌트 마운트 시 API 요청
  }, [recommendations]); // recommendations가 변경될 때마다 호출

  return (
    <TourItemInfoBox>
      <SpotTitle>
        <h1 className="tour-title">여행지 추천</h1>
      </SpotTitle>
      <h2>
        회원님과 {(recommendations[4]["Probability_5.0"] * 100).toFixed(0)}%
        맞는 여행지에요!
      </h2>

      <RecommendBox>
        {Object.keys(recArray).map((area: string, index: number) => (
          <div key={index}>
            <div className="result-item-head">
              <span className="name">{area}</span>
              <span
                className="link center underLine"
                onClick={() =>
                  navigate(`/tourlist?searchQuery=${area}&pageSize=10&page=0`)
                }
              >
                더보기
                <FaArrowRight />
              </span>
            </div>
            <div className="flex-row gap30">
              {recArray[area].map((item: any, idx: number) => (
                <div
                  key={idx}
                  onClick={() => navigate(`/tourspot/${item.spotId}`)}
                  style={{ cursor: "pointer", width: "120px" }}
                  className="underLine"
                >
                  {item.thumbnail === "" ? (
                    <img
                      src={basicImg}
                      alt={area}
                      style={{ width: "120px", height: "120px" }}
                    />
                  ) : (
                    <img
                      src={item.thumbnail}
                      alt={area}
                      style={{ width: "120px", height: "120px" }}
                    />
                  )}
                  <div>{item.title || "제목 없음"}</div>
                  {/* <div>사진주소: {item.thumbnail || "없음"}</div>
                  <div>링크주소: {item.spotId}</div> */}
                </div>
              ))}
            </div>
          </div>
        ))}
      </RecommendBox>
    </TourItemInfoBox>
  );
};

export default TourRecResult;
