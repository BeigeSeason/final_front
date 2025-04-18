import React, { useEffect, useState, useCallback } from "react";
import { ItemApi } from "../../api/ItemApi";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Diary } from "../../types/ItemTypes";
import { ItemList } from "../../style/ListStyled";
import { DiaryItem } from "../../component/ItemComponent";
import { Paginating } from "../../component/PaginationComponent";
import { Loading } from "../../component/Loading";

interface FilterState {
  page: number;
  size: number;
}

const MyBMDiary: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery({ query: "(max-width: 860px)" });
  const { userId } = useSelector((state: RootState) => state.auth);
  
  // 필터 상태 초기화
  const [filters, setFilters] = useState<FilterState>(() => {
    const queryParams = new URLSearchParams(location.search);
    return {
      page: parseInt(queryParams.get("page") || "0", 10),
      size: parseInt(queryParams.get("size") || "5", 10),
    };
  });
  
  // 다이어리 관련 상태
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [pagination, setPagination] = useState({
    totalPages: 0,
    totalElements: 0,
    numberOfElements: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);

  // 다이어리 데이터 가져오기
  const fetchDiaries = useCallback(async (page: number) => {
    if (!userId) return;
    
    setLoading(true);
    try {
      const data = await ItemApi.myBookmarkedDiaries({
        userId,
        page,
        size: filters.size,
      });
      
      setDiaries(data.content);
      setPagination({
        totalPages: data.totalPages,
        totalElements: data.totalElements,
        numberOfElements: data.numberOfElements,
      });
    } catch (error) {
      console.error("다이어리 데이터 불러오기 실패:", error);
    } finally {
      setLoading(false);
    }
  }, [userId, filters.size]);

  // URL에서 페이지 파라미터 변경 감지
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = parseInt(queryParams.get("page") || "0", 10);
    setFilters(prev => ({ ...prev, page }));
  }, [location.search]);

  // 페이지 변경 시 데이터 가져오기
  useEffect(() => {
    if (userId) {
      fetchDiaries(filters.page);
    }
  }, [filters.page, userId, fetchDiaries]);

  // 페이지 변경 핸들러
  const handlePageChange = useCallback((page: number) => {
    const queryParams = new URLSearchParams();
    queryParams.set("menu", "북마크 여행일지");
    queryParams.set("page", page.toString());
    queryParams.set("size", filters.size.toString());
    
    navigate(`?${queryParams.toString()}`, { replace: true });
  }, [navigate, filters.size]);

  // 다이어리 목록 렌더링
  const renderDiaries = () => {
    if (!Array.isArray(diaries) || diaries.length === 0) {
      return (
        <p
          style={{
            textAlign: "center",
            color: "#888",
            padding: "20px",
            margin: "0 auto",
          }}
        >
          북마크한 다이어리가 없습니다.
        </p>
      );
    }

    return diaries.map((diary, index) => (
      <DiaryItem
        key={diary.diaryId || index}
        id={diary.diaryId}
        thumbnail={diary.thumbnail}
        profile={diary.writerImg}
        description={[
          diary.title,
          diary.contentSummary,
          diary.writer,
          diary.createdAt.slice(0, 10).replaceAll("-", ". "),
          new Date(diary.createdAt).toLocaleString(),
          `${diary.writer} (${new Date(diary.createdAt).toLocaleString()})`,
          diary.startDate.slice(0, 10).replaceAll("-", ". "),
          diary.endDate.slice(0, 10).replaceAll("-", ". "),
        ]}
      />
    ));
  };

  return (
    <ItemList style={{ width: isMobile ? "80vw" : "48vw", margin: "0 auto" }}>
      {renderDiaries()}
      
      <Paginating
        currentPage={filters.page}
        totalPages={pagination.totalPages}
        handlePageChange={handlePageChange}
      />
      
      {loading && (
        <Loading istransparent={"true"}>
          <p>다이어리 불러오는중...</p>
        </Loading>
      )}
    </ItemList>
  );
});

export default MyBMDiary;