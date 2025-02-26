import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../component/ButtonComponent";
import { ItemApi } from "../../api/ItemApi";
import { useState, useEffect } from "react";
import { TourItem } from "../../component/ItemComponent";

interface Filters {
  searchQuery: string;
  sortBy: string;
  currentPage: number;
  pageSize: number;
}

export const SearchPage = () => {
  const location = useLocation();
  const [filters, setFilters] = useState<Filters>({
    searchQuery: "",
    sortBy: "",
    currentPage: 0,
    pageSize: 10,
  });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [tourSpots, setTourSpots] = useState<any[]>([]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setFilters({
      searchQuery: queryParams.get("searchQuery") || "",
      sortBy: queryParams.get("sort") || "",
      currentPage: parseInt(queryParams.get("currentPage") || "0", 10),
      pageSize: parseInt(queryParams.get("pageSize") || "10", 10),
    });
  }, [location.search]);

  useEffect(() => {
    setSearchQuery(filters.searchQuery);
    fetchTourSpots(filters.currentPage);
  }, [filters.searchQuery, filters.currentPage]);

  const fetchTourSpots = async (page: number) => {
    try {
      setLoading(true);
      const requestFilters = {
        keyword: filters.searchQuery || undefined, // 상태에서 직접 필터값을 가져옵니다.
        page: page,
        size: 5,
      };
      const data = await ItemApi.getTourSpotList(requestFilters);
      setTourSpots(data.content || []);
      setTotalPages(data.totalPages);
      setTotalItems(data.totalElements);
    } catch (err) {
      setError("데이터를 가져오는 데 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleTourMoreClick = () => {
    navigate(
      `/tourlist?searchQuery=${filters.searchQuery}&pageSize=10&page=${
        filters.currentPage + 1
      }`
    );
  };

  const handleDiaryMoreClick = () => {
    navigate(
      `/diarylist?searchQuery=${filters.searchQuery}&pageSize=10&page=${
        filters.currentPage + 1
      }`
    );
  };

  return (
    <div>
      <h1>검색 결과</h1>
      <p>검색어: {filters.searchQuery}</p>
      <Button onClick={handleTourMoreClick}>관광지 더보기</Button>
      {loading ? (
        <p>로딩 중...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        tourSpots.map((spot) => (
          <TourItem
            key={spot.spotId}
            id={spot.spotId}
            image={spot.thumbnail}
            description={[spot.title, spot.addr]}
          />
        ))
      )}
      <Button onClick={handleDiaryMoreClick}>여행일기 더보기</Button>
    </div>
  );
};
