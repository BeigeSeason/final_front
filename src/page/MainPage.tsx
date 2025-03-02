import { useState } from "react";
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
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import koreaGeoJson from "../util/korea.geojson.json";
import { areas } from "../util/TourCodes";
import { useNavigate } from "react-router-dom";

export const Main = () => {
  const navigate = useNavigate();
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);
  const places = [
    { id: 1, name: "장소 1", imgSrc: "path/to/image1.jpg" },
    { id: 2, name: "장소 2", imgSrc: "path/to/image2.jpg" },
    { id: 3, name: "장소 3", imgSrc: "path/to/image3.jpg" },
    { id: 4, name: "장소 4", imgSrc: "path/to/image4.jpg" },
    { id: 5, name: "장소 5", imgSrc: "path/to/image5.jpg" },
  ];
  const diaries = [
    { id: 1, name: "여행일지 1", imgSrc: "path/to/image1.jpg" },
    { id: 2, name: "여행일지 2", imgSrc: "path/to/image2.jpg" },
    { id: 3, name: "여행일지 3", imgSrc: "path/to/image3.jpg" },
    { id: 4, name: "여행일지 4", imgSrc: "path/to/image4.jpg" },
    { id: 5, name: "여행일지 5", imgSrc: "path/to/image5.jpg" },
  ];
  const handleClick = (areaCode: string) => {
    navigate(`/tourlist?areaCode=${areaCode}&pageSize=10&page=0`);
  };
  const handleMouseEnter = (areaName: string) => {
    setHoveredArea(areaName); // 호버 시작 시 이름 설정
  };

  const handleMouseLeave = () => {
    setHoveredArea(null); // 호버 끝나면 이름 제거
  };
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
              <SwiperSlide key={place.id}>
                <img src={place.imgSrc} alt={place.name} />
                <p>{place.name}</p>
              </SwiperSlide>
            ))}
          </Swiper>
        </BestSpot>
        <PolygonMap>
          <ComposableMap
            width={800}
            height={1000}
            projection="geoMercator"
            projectionConfig={{
              scale: 9000,
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
                      onMouseEnter={() => handleMouseEnter(areaName)}
                      onMouseLeave={handleMouseLeave}
                    />
                  );
                });
              }}
            </Geographies>
          </ComposableMap>
          {hoveredArea && <div className="tooltip">{hoveredArea}</div>}
        </PolygonMap>
        <BestDiary className="GridItem">
          <Swiper
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
                key={diary.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "32%",
                }}
              >
                <img
                  src={diary.imgSrc}
                  alt={diary.name}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
                <p>{diary.name}</p>
              </SwiperSlide>
            ))}
          </Swiper>
        </BestDiary>
        <VisitGraph className="GridItem"></VisitGraph>
      </MainBox>
    </>
  );
};
