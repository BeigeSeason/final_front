import { useEffect, useState } from "react";
import {
  MainBox,
  BestSpot,
  BestDiary,
  PolygonMap,
  VisitGraph,
} from "../style/MainStyled";
import { GlobalFont } from "../style/GlobalStyled";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { geoCentroid } from "d3-geo";
import koreaGeoJson from "../util/korea.geojson.json";
import { areas } from "../util/TourCodes";
import { useNavigate } from "react-router-dom";
import FontSize from "@tiptap/extension-font-size";
import { ItemApi } from "../api/ItemApi";
import { TourSpot, Diary } from "../types/ItemTypes";
import SpotBasicImg from "../img/item/type_100.png";
import DiaryBasicImg from "../img/item/type_200.png";

export const Main = () => {
  const navigate = useNavigate();
  const [places, setPlaces] = useState<TourSpot[]>([]);
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    name: "",
  });
  // const places = [
  //   { id: 1, name: "장소 1", imgSrc: "path/to/image1.jpg" },
  //   { id: 2, name: "장소 2", imgSrc: "path/to/image2.jpg" },
  //   { id: 3, name: "장소 3", imgSrc: "path/to/image3.jpg" },
  //   { id: 4, name: "장소 4", imgSrc: "path/to/image4.jpg" },
  //   { id: 5, name: "장소 5", imgSrc: "path/to/image5.jpg" },
  // ];
  // const diaries = [
  //   { id: 1, name: "여행일지 1", imgSrc: "path/to/image1.jpg" },
  //   { id: 2, name: "여행일지 2", imgSrc: "path/to/image2.jpg" },
  //   { id: 3, name: "여행일지 3", imgSrc: "path/to/image3.jpg" },
  //   { id: 4, name: "여행일지 4", imgSrc: "path/to/image4.jpg" },
  //   { id: 5, name: "여행일지 5", imgSrc: "path/to/image5.jpg" },
  // ];
  const getBestSpots = async () => {
    const filters = {
      page: 0,
      size: 10,
      sort: "rating,desc",
    };
    const response = await ItemApi.getTourSpotList(filters);
    setPlaces(response.content);
  };
  const getBestDiaries = async () => {
    const filters = {
      page: 0,
      size: 4,
      sort: "bookmark_count,desc",
    };
    const response = await ItemApi.getDiaryList(filters);
    setDiaries(response.content);
  };
  const handleClick = (areaCode: string) => {
    navigate(`/tourlist?areaCode=${areaCode}&pageSize=10&page=0`);
  };
  const handleMouseEnter = (areaName: string) => {
    setHoveredArea(areaName); // 호버 시작 시 이름 설정
  };

  const handleMouseLeave = () => {
    setHoveredArea(null); // 호버 끝나면 이름 제거
  };

  useEffect(() => {
    getBestSpots();
    getBestDiaries();
  }, []);
  return (
    <>
      <GlobalFont />
      <MainBox>
        <BestSpot className="GridItem">
          <Swiper
            modules={[EffectCoverflow, Navigation, Pagination, Autoplay]}
            effect="coverflow"
            centeredSlides={true}
            spaceBetween={10}
            slidesPerView={3}
            loop={true}
            coverflowEffect={{
              rotate: 0, // 슬라이드 회전 각도
              stretch: 0, // 슬라이드 간 간격 조정
              depth: 500, // 입체감 (값이 클수록 깊이감 증가)
              modifier: 0.8, // 효과 강도
              slideShadows: false, // 슬라이드 그림자 효과
            }}
            navigation
            pagination={{ clickable: true }}
            // autoplay={{ delay: 3000, disableOnInteraction: false }}
            // breakpoints={{
            //   1024: { slidesPerView: 5, spaceBetween: 30 }, // 큰 화면에서는 5개
            //   768: { slidesPerView: 3, spaceBetween: 20 }, // 태블릿에서는 3개
            //   480: { slidesPerView: 2, spaceBetween: 10 }, // 모바일에서는 2개
            // }}
          >
            {places.map((place) => (
              <SwiperSlide key={place.spotId} className="swiper-slide-custom">
                <img
                  src={place.thumbnail || SpotBasicImg}
                  alt={place.title}
                  onClick={() => navigate(`/tourspot/${place.spotId}`)}
                />
                <p className="slide-text">{place.title}</p>
              </SwiperSlide>
            ))}
          </Swiper>
        </BestSpot>
        <BestDiary className="GridItem">
          {diaries.map((diary) => (
            <div key={diary.diaryId} className="diary-card">
              <img
                src={diary.thumbnail || DiaryBasicImg}
                alt={diary.title}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "10px",
                }}
              />
              <p className="diary-title">{diary.title}</p>
            </div>
          ))}
          {/* <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={"auto"}
            loop={true}
            navigation
            pagination={{ clickable: true }}
            centeredSlides={true}
          >
            {diaries.map((diary) => (
              <SwiperSlide
                key={diary.diaryId}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "32%",
                }}
              >
                <img
                  src={diary.thumbnail || DiaryBasicImg}
                  alt={diary.title}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
                <p>{diary.title}</p>
              </SwiperSlide>
            ))}
          </Swiper> */}
        </BestDiary>
        <PolygonMap>
          <ComposableMap
            width={500}
            height={730}
            projection="geoMercator"
            projectionConfig={{
              scale: 6000,
              center: [127.5, 36],
            }}
          >
            <Geographies geography={koreaGeoJson}>
              {({ geographies, projection }) => {
                return geographies.map((geo) => {
                  const centroid = geoCentroid(geo) || [0, 0];
                  const projected = projection(centroid); // 화면 좌표로 변환
                  if (!projected) return null;
                  const [x, y] = projected;
                  const areaCode = geo.properties.areaCode;
                  const area = areas.find((a) => a.code === areaCode);
                  const areaName = area ? area.name : geo.properties.NAME_1;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => areaCode && handleClick(areaCode)}
                      // onMouseEnter={() => handleMouseEnter(areaName)}
                      // onMouseLeave={handleMouseLeave}
                      onMouseEnter={() =>
                        setTooltip({ visible: true, x, y, name: areaName })
                      }
                      onMouseLeave={() =>
                        setTooltip({ ...tooltip, visible: false })
                      }
                    />
                  );
                });
              }}
            </Geographies>
          </ComposableMap>

          {hoveredArea && <div className="tooltip">{hoveredArea}</div>}
          {tooltip.visible && (
            <div
              style={{
                position: "absolute",
                left: `${tooltip.x * 0.8}px`,
                top: `${tooltip.y * 0.8}px`,
                background: "rgba(255, 255, 255, 0.8)",
                color: "black",
                fontWeight: "bold",
                fontSize: "17px",
                padding: "8px 12px",
                borderRadius: "5px",
                pointerEvents: "none",
                // transform: "translate(-50%, -100%)",
                whiteSpace: "nowrap",
              }}
            >
              {tooltip.name}
            </div>
          )}
        </PolygonMap>
        {/* <VisitGraph className="GridItem"></VisitGraph> */}
      </MainBox>
    </>
  );
};
