import { useEffect, useRef, useState } from "react";
import {
  MainBox,
  Banner,
  BestDiary,
  PolygonMap,
  // VisitGraph,
} from "../style/MainStyled";
import { GlobalFont } from "../style/GlobalStyled";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { geoCentroid } from "d3-geo";
import koreaGeoJson from "../util/korea.geojson.json";
import { areas } from "../util/TourCodes";
import { useNavigate } from "react-router-dom";
import FontSize from "@tiptap/extension-font-size";
import styled from "styled-components";

const Tooltip = styled.div<{ x: number; y: number }>`
  position: absolute;
  left: ${({ x }) => `${x}px`};
  top: ${({ y }) => `${y - 30}px`};
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  pointer-events: none;
  transform: translate(-50%, -100%);
  whitespace: nowrap;
  z-index: 10;
`;

export const Main = () => {
  const navigate = useNavigate();
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    name: "",
  });
  const [mapSize, setMapSize] = useState<{ width: number; height: number }>({
    width: 500,
    height: 730,
  });
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

  useEffect(() => {
    const updateMapSize = () => {
      if (mapRef.current) {
        const { width, height } = mapRef.current.getBoundingClientRect();
        setMapSize({ width, height });
      }
    };

    updateMapSize(); // 초기 크기 설정
    window.addEventListener("resize", updateMapSize);
    return () => window.removeEventListener("resize", updateMapSize);
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
        </Banner>
        <PolygonMap ref={mapRef}>
          <ComposableMap
            width={mapSize.width}
            height={mapSize.height}
            projection="geoMercator"
            projectionConfig={{
              scale: 6000,
              center: [127.5, 36],
            }}
          >
            <Geographies geography={koreaGeoJson}>
              {({ geographies, projection }) => {
                return geographies.map((geo) => {
                  // const centroid = geoCentroid(geo) || [0, 0];
                  // const projected = projection(centroid); // 화면 좌표로 변환
                  const tooltipCoord = geo.properties.tooltip || [127.5, 36];
                  const projected = projection(tooltipCoord);
                  if (!projected) return null;
                  let [x, y] = projected;
                  const areaCode = geo.properties.areaCode;
                  const area = areas.find((a) => a.code === areaCode);
                  const areaName = area ? area.name : geo.properties.NAME_1;
                  // 툴팁 위치를 지도 경계 내로 제한
                  const padding = 5;
                  x = Math.max(padding, Math.min(x, mapSize.width - padding));
                  y = Math.max(padding, Math.min(y, mapSize.height - padding));

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
            <Tooltip x={tooltip.x} y={tooltip.y}>
              {tooltip.name}
            </Tooltip>
          )}
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
        {/* <VisitGraph className="GridItem"></VisitGraph> */}
      </MainBox>
    </>
  );
};
