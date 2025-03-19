import { useEffect, useRef, useState } from "react";
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
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_koreaLow from "@amcharts/amcharts4-geodata/southKoreaLow";
import { areas, types, tooltipAreas } from "../util/TourCodes";
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
import AIBanner from "../img/banner/banner_ai.png";
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
  // const [hoveredArea, setHoveredArea] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    name: "",
  });
  const mapRef = useRef<HTMLDivElement>(null);

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
      title: "여행 이야기 공유",
      subTitle: "다양한 여행 이야기를 보고, 멋진 여행을 구상해보세요!",
      navigatePath: "/diarylist",
    },
    {
      backgroundColor: "#a6dbff",
      imageSrc: RecommendBanner,
      alt: "관광지 추천",
      title: "나만의 여행지 찾기",
      subTitle: "AI가 추천하는 맞춤형 여행지, 지금 확인하세요!",
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
  // const handleMouseEnter = (areaName: string) => {
  //   setHoveredArea(areaName); // 호버 시작 시 이름 설정
  // };

  // const handleMouseLeave = () => {
  //   setHoveredArea(null); // 호버 끝나면 이름 제거
  // };

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

  // amCharts 지도 설정
  useEffect(() => {
    if (!mapRef.current) return;

    const chart = am4core.create(mapRef.current, am4maps.MapChart);
    if (chart.logo) {
      chart.logo.disabled = true;
    }
    chart.geodata = am4geodata_koreaLow; // 한국 지도 데이터 사용
    chart.projection = new am4maps.projections.Mercator();

    // 초기 줌 레벨과 중심 설정
    chart.homeZoomLevel = 1;
    chart.homeGeoPoint = { latitude: 36, longitude: 127.5 }; // 한국 중심

    // 줌 기능 비활성화
    chart.seriesContainer.draggable = false; // 드래그로 이동 비활성화
    chart.seriesContainer.resizable = false; // 크기 조정 비활성화
    chart.seriesContainer.wheelable = false; // 마우스 휠로 줌 비활성화
    chart.maxZoomLevel = 1; // 최대 줌 레벨을 1로 고정
    chart.minZoomLevel = 1; // 최소 줌 레벨을 1로 고정
    chart.seriesContainer.events.on("wheel", (ev) => {
      // 페이지 스크롤을 위해 이벤트 전달
      window.scrollBy(0, ev.event.deltaY);
    });

    const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;

    const polygonTemplate = polygonSeries.mapPolygons.template;

    // polygonTemplate.tooltipText = "{name}";
    // 툴팁을 한국어로 설정
    polygonTemplate.adapter.add("tooltipText", (text, target) => {
      const data = target.dataItem.dataContext as any;
      if (data && data.name) {
        const area = tooltipAreas.find(
          (a) => a.tooltip === data.name || a.name === data.name
        );
        return area ? area.name : data.name; // 한국어 이름 반환, 없으면 기본 이름
      }
      return text;
    });

    polygonTemplate.fill = am4core.color("#7BAE7F");
    // #74B266 / #D7CEC7
    polygonTemplate.stroke = am4core.color("#FFFFFF");
    polygonTemplate.strokeWidth = 1;

    // 호버 효과
    const hoverState = polygonTemplate.states.create("hover");
    hoverState.properties.fill = am4core.color("#B0D8A4");
    // #367B25 / #E8D8C4

    // 호버 시 커서를 pointer로 변경
    polygonTemplate.cursorOverStyle = am4core.MouseCursorStyle.pointer;

    // 클릭 이벤트
    polygonTemplate.events.on("hit", (ev) => {
      const data = ev.target.dataItem.dataContext as any;
      if (data && data.name) {
        // tooltipAreas에서 해당 지역의 code를 찾음
        const area = tooltipAreas.find(
          (a) => a.tooltip === data.name || a.name === data.name
        );
        if (area && area.code) {
          navigate(`/tourlist?areaCode=${area.code}&pageSize=10&page=0`);
        }
      }
    });
    return () => {
      chart.dispose(); // 컴포넌트 언마운트 시 정리
    };
  }, []);

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
                  <p className="address">{place.addr}</p>
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
          <h2 className="section-title">원하는 지역을 바로 찾기🔍</h2>
          <div className="map" ref={mapRef} />
        </PolygonMap>
        <QuickSearch>
          <div className="SelectCategory">
            <h2 className="section-title">취향 맞춤 카테고리 Pick🎯</h2>
            <div className="catebuttons">
              {types.map((type) => (
                <CateButton
                  key={type.code}
                  onClick={() => navigate(`/tourlist?category=${type.code}`)}
                  typeName={type.name}
                  style={{
                    backgroundImage: `url(${type.img})`,
                    backgroundSize: "cover", // 이미지가 버튼을 덮도록
                    backgroundPosition: "center", // 이미지의 중앙을 버튼에 맞춤
                  }}
                >
                  {/* <span>{type.name}</span> */}
                </CateButton>
              ))}
            </div>
          </div>
          <div className="recommend-banner">
            <div className="banner" onClick={() => navigate("/tourRecommend")}>
              <img src={AIBanner} alt="" />
            </div>
          </div>
        </QuickSearch>
      </MainBox>
    </>
  );
};
