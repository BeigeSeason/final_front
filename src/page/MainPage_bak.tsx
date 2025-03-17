import { useEffect, useState } from "react";
import {
  MainBox,
  Banner,
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
import koreaGeoJson from "../util/korea.geojson.json";
import { areas, types } from "../util/TourCodes";
import { ServiceCode } from "../util/ServiceCode";
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
import { FaRegMap, FaRegCalendarAlt } from "react-icons/fa";

interface Place {
  thumbnail: string;
  title: string;
  cat1?: string | null; // 선택적이고 null일 수도 있음
  cat2?: string | null;
  cat3?: string | null;
}

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
  const bannerData = [
    {
      backgroundColor: "#86ffd7",
      imageSrc: TourBanner,
      alt: "관광지",
      title: "완벽한 여행의 시작",
      subTitle: "관광지, 맛집, 숙소까지 한눈에 검색하고 떠나세요!",
      navigatePath: "/tourlist",
    },
    {
      backgroundColor: "#f1c38d",
      imageSrc: DiaryBanner,
      alt: "여행일지",
      title: "여행일지입니다.",
      subTitle: "여행일지에요!",
      navigatePath: "/diarylist",
    },
    {
      backgroundColor: "#a6dbff",
      imageSrc: RecommendBanner,
      alt: "관광지 추천",
      title: "관광지 추천입니다.",
      subTitle: "관광지 추천이에요!",
      navigatePath: "/tourRecommend",
    },
  ];
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

  // 카테고리 이름을 찾는 유틸 함수
  const getCategoryNames = (
    cat1: string | null | undefined,
    cat2: string | null | undefined
  ): string[] => {
    const result: string[] = [];

    if (!cat1 || typeof cat1 !== "string") return result;

    const cat1Data = ServiceCode.find((item) => item.cat1 === cat1);
    if (!cat1Data) return result;
    result.push(cat1Data.cat1Name);

    if (!cat2 || typeof cat2 !== "string") return result;

    const cat2Data = cat1Data.cat2List.find((item) => item.cat2 === cat2);
    if (!cat2Data) return result;
    result.push(cat2Data.cat2Name);

    return result;
  };

  useEffect(() => {
    getBestSpots();
    getBestDiaries();
  }, []);
  return (
    <>
      <GlobalFont />
      <MainBox>
        <Banner className="GridItem">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            loop={true}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
          >
            {bannerData.map((data) => (
              <SwiperSlide key={data.title} className="swiper-slide-custom">
                <div
                  className="background"
                  style={{ backgroundColor: data.backgroundColor }}
                />
                <div className="slide-content">
                  <div className="slide-text-container">
                    <h1 className="title">{data.title}</h1>
                    <h3 className="sub-title">{data.subTitle}</h3>
                  </div>
                  <img
                    src={data.imageSrc || SpotBasicImg}
                    alt={data.alt}
                    className="slide-image"
                    onClick={() => navigate(data.navigatePath)}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Banner>
        <BestSpot className="GridItem">
          <h2 className="section-title">
            🔥 지금 가장 핫한 여행지! 놓치면 후회할 곳은?
          </h2>
          <div className="bestspots-container">
            {places.map((place) => {
              const categories = getCategoryNames(place.cat1, place.cat2).join(
                " > "
              );

              return (
                <div
                  className="spot-container"
                  key={place.spotId}
                  onClick={() => navigate(`/tourspot/${place.spotId}`)}
                >
                  <img src={place.thumbnail || SpotBasicImg} alt="썸네일" />
                  <p className="title">{place.title}</p>
                  {categories && <p className="categories">{categories}</p>}
                  <p className="rating">
                    <GoStarFill style={{ color: "#FFD700" }} />
                    &nbsp;{place.avgRating.toFixed(2)} (
                    {place.reviewCount.toLocaleString()})
                  </p>
                </div>
              );
            })}
          </div>
        </BestSpot>
        <BestDiary className="GridItem">
          <h2 className="section-title">
            📖 여행은 끝났지만, 이야기로 남았다.
          </h2>
          <div className="bestdiaries-container">
            {diaries.map((diary) => (
              <div
                className="diary-container"
                key={diary.diaryId}
                onClick={() => navigate(`/diary/${diary.diaryId}`)}
              >
                <img src={diary.thumbnail || DiaryBasicImg} alt="썸네일" />
                <p className="title">{diary.title}</p>
                <p className="content">{diary.contentSummary}</p>
                <div className="travel-info">
                  <FaRegMap /> <span>{diary.region}</span>
                </div>
                <div className="travel-info">
                  <FaRegCalendarAlt />{" "}
                  <span>
                    {diary.startDate?.replaceAll("-", ". ")} ~{" "}
                    {diary.endDate?.replaceAll("-", ". ")}
                  </span>
                </div>
              </div>
            ))}
          </div>
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
              {({ geographies }) => {
                return geographies.map((geo) => {
                  const areaCode = geo.properties.areaCode;
                  const area = areas.find((a) => a.code === areaCode);
                  const areaName = area ? area.name : geo.properties.NAME_1;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => areaCode && handleClick(areaCode)}
                      onMouseEnter={() => setHoveredArea(areaName)}
                      onMouseLeave={() => setHoveredArea(null)}
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
            {/* <div className="catebuttons">
              {types.map((type) => (
                <CateButton
                  key={type.code}
                  onClick={() => navigate(`/tourlist?category=${type.code}`)}
                >
                  {type.name}
                </CateButton>
              ))}
            </div> */}
          </div>
          <div className="recommend-banner">
            <p>어디갈지 모르겠다구~?</p>
            <div className="banner" onClick={() => navigate("/recommTour")}>
              AI 추천 받아보면 어떨까요?
            </div>
          </div>
        </QuickSearch>
        {/* <VisitGraph className="GridItem"></VisitGraph> */}
      </MainBox>
    </>
  );
};
