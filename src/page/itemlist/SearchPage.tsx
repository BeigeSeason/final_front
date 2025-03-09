import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../component/ButtonComponent";
import { ItemApi } from "../../api/ItemApi";
import { useState, useEffect } from "react";
import { TourItem, DiaryItem } from "../../component/ItemComponent";
import { SearchFilters } from "../../types/ItemTypes";
import { SearchResultBox } from "../../style/ListStyled";
import { GlobalFont } from "../../style/GlobalStyled";

export const SearchPage = () => {
  const location = useLocation();
  const [filters, setFilters] = useState<SearchFilters>({
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
  const [totalDiaryItems, setTotalDiaryItems] = useState(0);
  const [totalDiaryPages, setTotalDiaryPages] = useState(0);
  const [diaries, setDiaries] = useState<any[]>([]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setFilters({
      searchQuery: queryParams.get("searchQuery") || "",
      sortBy: queryParams.get("sort") || "",
      currentPage: parseInt(queryParams.get("page") || "0", 10),
      pageSize: parseInt(queryParams.get("pageSize") || "10", 10),
    });
  }, [location.search]);

  useEffect(() => {
    setSearchQuery(filters.searchQuery);
    fetchTourSpots(filters.currentPage);
    fetchDiaries(filters.currentPage);
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
  const fetchDiaries = async (page: number) => {
    try {
      setLoading(true);
      const requestFilters = {
        keyword: filters.searchQuery || undefined,
        page: page,
        size: 5,
      };
      const data = await ItemApi.getDiaryList(requestFilters);
      setDiaries(data.content || []);
      setTotalDiaryPages(data.totalPages);
      setTotalDiaryItems(data.totalElements);
    } catch (err) {
      setError("여행일지 데이터를 가져오는 데 오류가 발생했습니다.");
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
      <GlobalFont />
      <SearchResultBox>
        <h3>"{filters.searchQuery}" 검색 결과</h3>
        <div className="more">
          <p className="title-font">관광지</p>
          <Button onClick={handleTourMoreClick}>더보기 › </Button>
        </div>
        <div className="result-content">
          {loading ? (
            <p>로딩 중...</p>
          ) : error ? (
            <p>{error}</p>
          ) : tourSpots.length > 0 ? (
            tourSpots.map((spot) => (
              <TourItem
                key={spot.spotId}
                id={spot.spotId}
                image={spot.thumbnail}
                description={[spot.title, spot.addr]}
              />
            ))
          ) : (
            <p>관광지 검색 결과가 없습니다.</p>
          )}
        </div>
        <div className="more">
          <p className="title-font">여행일지</p>
          <Button onClick={handleDiaryMoreClick}>더보기 ›</Button>
        </div>
        <div className="result-content">
          {loading ? (
            <p>로딩 중...</p>
          ) : error ? (
            <p>{error}</p>
          ) : diaries.length > 0 ? (
            diaries.map((diary) => (
              <DiaryItem
                key={diary.diaryId}
                id={diary.diaryId}
                thumbnail={diary.thumbnail}
                description={[
                  diary.title,
                  diary.contentSummary,
                  `${diary.writer} (${new Date(
                    diary.createdAt
                  ).toLocaleString()})`,
                ]}
              />
            ))
          ) : (
            <p>여행일지 검색 결과가 없습니다.</p>
          )}
        </div>
      </SearchResultBox>
    </div>
  );
};
