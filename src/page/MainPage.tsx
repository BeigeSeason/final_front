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

export const Main = () => {
  const places = [
    { id: 1, name: "장소 1", imgSrc: "path/to/image1.jpg" },
    { id: 2, name: "장소 2", imgSrc: "path/to/image2.jpg" },
    { id: 3, name: "장소 3", imgSrc: "path/to/image3.jpg" },
    { id: 4, name: "장소 4", imgSrc: "path/to/image4.jpg" },
    { id: 5, name: "장소 5", imgSrc: "path/to/image5.jpg" },
  ];

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
        <BestDiary className="GridItem"></BestDiary>
        <PolygonMap className="GridItem"></PolygonMap>
        <VisitGraph className="GridItem"></VisitGraph>
      </MainBox>
    </>
  );
};
