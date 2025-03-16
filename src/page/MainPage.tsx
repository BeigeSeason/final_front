import { useEffect, useState } from "react";
import {
  MainBox,
  BestSpot,
  BestDiary,
  PolygonMap,
  QuickSearch,
  CateButton,
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
import { areas, types } from "../util/TourCodes";
import { useNavigate } from "react-router-dom";
import FontSize from "@tiptap/extension-font-size";
import { ItemApi } from "../api/ItemApi";
import { TourSpot, Diary } from "../types/ItemTypes";
import SpotBasicImg from "../img/item/type_100.png";
import DiaryBasicImg from "../img/item/type_200.png";
import TourBanner from "../img/banner/banner_tour.jpg";
import DiaryBanner from "../img/banner/banner_diary.jpg";
import RecommendBanner from "../img/banner/banner_recommend.png";
import { GoStarFill } from "react-icons/go";

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
      size: 5,
      sort: "rating,desc",
    };
    const response = await ItemApi.getTourSpotList(filters);
    console.log(response.content);
    setPlaces(response.content);
  };
  const getBestDiaries = async () => {
    const filters = {
      page: 0,
      size: 4,
      sort: "bookmark_count,desc",
    };
    const response = await ItemApi.getDiaryList(filters);
    console.log(response.content);
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
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            loop={true}
            navigation
            pagination={{ clickable: true }}
            // autoplay={{ delay: 3000,
            //   disableOnInteraction: false
            //  }}
          >
            {places.map((place) => (
              <SwiperSlide key={place.spotId} className="swiper-slide-custom">
                {/* <div
                  className="background"
                  style={{ backgroundColor: "#a6dbff" }}
                />
                <div className="slide-content">
                  <div className="slide-text-container">
                    <h1 className="title">완벽한 여행의 시작</h1>
                    <h3 className="sub-title">
                      관광지, 맛집, 숙소까지 한눈에 검색하고 떠나세요!
                    </h3>
                  </div>
                  <img
                    src={TourBanner || SpotBasicImg}
                    alt={place.title}
                    className="slide-image"
                    onClick={() => navigate(`/tourspot/${place.spotId}`)}
                  />
                </div> */}
                {/* <div
                  className="background"
                  style={{ backgroundColor: "#f1c38d" }}
                />
                <div className="slide-content">
                  <div className="slide-text-container">
                    <h1 className="title">완벽한 여행의 시작</h1>
                    <h3 className="sub-title">
                      관광지, 맛집, 숙소까지 한눈에 검색하고 떠나세요!
                    </h3>
                  </div>
                  <img
                    src={DiaryBanner || SpotBasicImg}
                    alt={place.title}
                    className="slide-image"
                    onClick={() => navigate(`/tourspot/${place.spotId}`)}
                  />
                </div> */}
                <div
                  className="background"
                  style={{ backgroundColor: "#a6dbff" }}
                />
                <div className="slide-content">
                  <div className="slide-text-container">
                    <h1 className="title">완벽한 여행의 시작</h1>
                    <h3 className="sub-title">
                      관광지, 맛집, 숙소까지 한눈에 검색하고 떠나세요!
                    </h3>
                  </div>
                  <img
                    src={RecommendBanner || SpotBasicImg}
                    alt={place.title}
                    className="slide-image"
                    onClick={() => navigate(`/tourspot/${place.spotId}`)}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </BestSpot>
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
        <QuickSearch>
          <div className="SelectCategory">
            <p>어떤 카테고리 you want?</p>
            <div className="catebuttons">
              {types.map((type) => (
                <CateButton
                  key={type.code}
                  onClick={() => navigate(`/tourlist?category=${type.code}`)}
                >
                  {type.name}
                </CateButton>
              ))}
            </div>
          </div>
          <div className="recommend-banner">
            <p>어디갈지 모르겠다구~?</p>
            <div className="banner" onClick={() => navigate("/recommTour")}>
              AI 추천 받아보면 어떨까요?
            </div>
          </div>
        </QuickSearch>
        {/* <VisitGraph className="GridItem"></VisitGraph> */}
        <BestDiary className="GridItem">
          {/* {diaries.map((diary) => (
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
          ))} */}
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={3}
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
                  width: "31%",
                }}
              >
                <img
                  className="diary-thumbnail"
                  src={diary.thumbnail || DiaryBasicImg}
                  alt={diary.title}
                  // style={{ maxWidth: "100%", height: "auto" }}
                />
                <div className="diary-info">
                  <p className="diary-title">{diary.title}</p>
                  <p className="diary-content">{diary.contentSummary}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </BestDiary>
      </MainBox>
    </>
  );
};
