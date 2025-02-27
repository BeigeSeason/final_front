import { useParams } from "react-router-dom";
import { ItemApi } from "../../api/ItemApi";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

// 데이터를 받아올 타입을 정의
interface TourSpotDetail {
  contentId: string;
  title: string;
  addr1: string;
  contact: string;
  mapX: number;
  mapY: number;
  images: string[];
  overview: string;
  homepage: string;
  useTime: string;
  parking: string;
}

export const TourSpot = () => {
  const { id } = useParams<{ id: string }>(); // id 값을 URL에서 받아옵니다.

  // 상태를 정의하여 받아온 데이터를 저장, 타입 지정
  const [tourSpotDetail, setTourSpotDetail] = useState<TourSpotDetail | null>(
    null
  );

  useEffect(() => {
    if (id) {
      fetchTourSpotDetail(id);
    }
  }, [id]);

  // 상세 정보를 가져오는 함수
  const fetchTourSpotDetail = async (id: string) => {
    try {
      const response = await ItemApi.getTourSpotDetail(id);
      setTourSpotDetail(response);
      console.log(response);
    } catch (error) {
      console.error("관광지 상세 정보 불러오기 실패:", error);
    }
  };

  if (!tourSpotDetail) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <h1>{tourSpotDetail?.title}</h1>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={10}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation={true}
        >
          {tourSpotDetail.images?.map((image: string, index: number) => (
            <SwiperSlide key={index}>
              <img src={image} alt={`TourSpot Image ${index + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>
        <p>
          <strong>주소:</strong> {tourSpotDetail?.addr1 || "주소 정보 없음"}
        </p>
        <p>
          <strong>연락처:</strong>
          {tourSpotDetail?.contact || "연락처 정보 없음"}
        </p>
        <p>
          <strong>운영 시간:</strong>
          {tourSpotDetail?.useTime || "운영 시간 정보 없음"}
        </p>
        <p>
          <strong>개요:</strong> {tourSpotDetail?.overview}
        </p>
        <p>
          <strong>홈페이지:</strong>
          <span
            dangerouslySetInnerHTML={{
              __html:
                tourSpotDetail?.homepage.replace(
                  /<a /g,
                  '<a target="_blank" rel="noopener noreferrer" '
                ) || "",
            }}
          />
        </p>

        <p>
          <strong>주차:</strong> {tourSpotDetail?.parking || "주차 정보 없음"}
        </p>
        <p>
          <strong>위도:</strong> {tourSpotDetail?.mapY}
        </p>
        <p>
          <strong>경도:</strong> {tourSpotDetail?.mapX}
        </p>
      </div>
    </>
  );
};
