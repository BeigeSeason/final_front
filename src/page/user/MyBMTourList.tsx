import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { TourSpot } from "../../types/ItemTypes";
import { ItemApi } from "../../api/ItemApi";
import { ItemList } from "../../style/ListStyled";
import { TourItem } from "../../component/ItemComponent";
import { Paginating } from "../../component/PaginationComponent";
import { Loading } from "../../component/Loading";

const MyBMTourList = React.memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const [filters, setFilters] = useState(() => {
    const queryParams = new URLSearchParams(location.search);
    return {
      page: parseInt(queryParams.get("page") || "0", 10),
      size: parseInt(queryParams.get("size") || "5", 10),
    };
  });
  const { userId } = useSelector((state: RootState) => state.auth);
  const [tourspots, setTourspots] = useState<TourSpot[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [numberOfElements, setNumberOfElements] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTourSpots = async (page: number) => {
    setLoading(true);
    if (userId) {
      const data = await ItemApi.myBookmarkedTourspots({
        userId: userId,
        page: page,
        size: filters.size,
      });
      console.log(data);
      setTourspots(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
      setNumberOfElements(data.numberOfElements);
    }
    setLoading(false);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = parseInt(queryParams.get("page") || "0", 10);
    setFilters((prev) => ({ ...prev, page }));
  }, [location.search]);

  useEffect(() => {
    if (userId) {
      fetchTourSpots(filters.page);
    }
  }, [filters.page, userId]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setFilters((prev) => ({ ...prev, page }));
    const queryParams = new URLSearchParams();
    queryParams.set("menu", "북마크 관광지");
    queryParams.set("page", page.toString());
    queryParams.set("size", filters.size.toString());
    navigate(`?${queryParams.toString()}`, { replace: true });
  };

  return (
    <ItemList style={{ width: "48vw", margin: "0 auto" }}>
      {Array.isArray(tourspots) && tourspots.length > 0 ? (
        tourspots.map((spot, index) => (
          <TourItem
            key={spot.spotId}
            id={spot.spotId}
            image={spot.thumbnail}
            description={[spot.title, spot.addr]}
          />
        ))
      ) : (
        <p
          style={{
            textAlign: "center",
            color: "#888",
            padding: "20px",
            margin: "0 auto",
          }}
        >
          북마크한 관광지가 없습니다.
        </p>
      )}
      <Paginating
        currentPage={filters.page}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
      {loading && (
        <Loading istransparent={"true"}>
          <p>관광지 목록 불러오는중...</p>
        </Loading>
      )}
    </ItemList>
  );
});

export default MyBMTourList;
