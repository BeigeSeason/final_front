import React, { useState, useEffect, useMemo } from "react";
import {
  Map,
  useMap,
  MapMarker,
  Roadview,
  RoadviewMarker,
} from "react-kakao-maps-sdk";

interface KakaoMapProps {
  mapX: number;
  mapY: number;
}

export const KakaoMapSpot: React.FC<KakaoMapProps> = ({ mapX, mapY }) => {
  const [toggle, setToggle] = useState<"map" | "roadview">("map");
  const [hasRoadview, setHasRoadview] = useState<boolean | null>(null);

  const [isKakaoLoaded, setIsKakaoLoaded] = useState(false);
  const placePosition = {
    lat: mapY,
    lng: mapX,
  };

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        setIsKakaoLoaded(true);
      });
    } else {
      console.error("Kakao Maps API가 로드되지 않았습니다.");
    }
  }, []);

  // 로드뷰 가능 여부 체크
  useEffect(() => {
    if (!isKakaoLoaded) return;

    const roadviewService = new window.kakao.maps.RoadviewClient();
    roadviewService.getNearestPanoId(
      new window.kakao.maps.LatLng(mapY, mapX),
      50, // 반경 50m 이내 검색
      (panoId) => {
        setHasRoadview(panoId !== null);
      }
    );
  }, [mapX, mapY, isKakaoLoaded]);

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

      {/* 로드뷰 */}
      {hasRoadview && (
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
      )}

      {/* 로드뷰가 없을 때 메시지 표시 */}
      {toggle === "roadview" && hasRoadview === false && (
        <>
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
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "rgba(0,0,0,0.7)",
              color: "white",
              padding: "10px 20px",
              borderRadius: "5px",
            }}
          >
            해당 위치에서는 로드뷰를 사용할 수 없습니다.
          </div>
        </>
      )}
    </div>
  );
};
