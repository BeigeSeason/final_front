import React, { useState, useEffect, useMemo } from "react";
import { Map, useMap, MapMarker, Roadview, RoadviewMarker } from "react-kakao-maps-sdk";

interface KakaoMapProps {
  mapX: number;
  mapY: number;
}

export const KakaoMapSpot: React.FC<KakaoMapProps> = ({ mapX, mapY }) => {
  const [toggle, setToggle] = useState("map");
  const placePosition = {
    lat: mapY,
    lng: mapX,
  };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <Map
        center={placePosition}
        style={{
          display: toggle === "map" ? "block" : "none",
          width: "100%",
          height: "100%",
        }}
        level={3}
      >
        <MapMarker position={placePosition} />
        {toggle === "map" && (
          <input
            style={{
              position: "absolute",
              width: "55px",
              top: "5px",
              left: "5px",
              zIndex: 10,
              backgroundColor: "rgb(96, 179, 214)",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            type="button"
            onClick={() => setToggle("roadview")}
            value="로드뷰"
          />
        )}
      </Map>
      <Roadview
        position={{ ...placePosition, radius: 50 }}
        style={{
          display: toggle === "roadview" ? "block" : "none",
          width: "100%",
          height: "100%",
        }}
      >
        <RoadviewMarker position={placePosition} />
        {toggle === "roadview" && (
          <input
            style={{
              position: "absolute",
              width: "55px",
              top: "5px",
              left: "5px",
              zIndex: 10,
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            type="button"
            onClick={() => setToggle("map")}
            title="지도 보기"
            value="지도"
          />
        )}
      </Roadview>
    </div>
  );
};