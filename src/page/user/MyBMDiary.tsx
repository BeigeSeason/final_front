import React, { useEffect, useState } from "react";
import { ItemApi } from "../../api/ItemApi";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useLocation, useNavigate } from "react-router-dom";
import { Diary } from "../../types/ItemTypes";
import { ItemList } from "../../style/ListStyled";
import { DiaryItem } from "../../component/ItemComponent";
import { Paginating } from "../../component/PaginationComponent";
import { Loading } from "../../component/Loading";

const MyBMDiary = React.memo(() => {
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
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [numberOfElements, setNumberOfElements] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchDiaries = async (page: number) => {
    setLoading(true);
    if (userId) {
      const data = await ItemApi.myBookmarkedDiaries({
        userId: userId,
        page: page,
        size: filters.size,
      });
      setDiaries(data.content);
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
      fetchDiaries(filters.page);
    }
  }, [filters.page, userId]);

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
    const queryParams = new URLSearchParams();
    queryParams.set("menu", "북마크 여행일지");
    queryParams.set("page", page.toString());
    queryParams.set("size", filters.size.toString());
    navigate(`?${queryParams.toString()}`, { replace: true });
  };

  return (
    <ItemList style={{ width: "48vw", margin: "0 auto" }}>
      {Array.isArray(diaries) && diaries.length > 0 ? (
        diaries.map((diary, index) => (
          <DiaryItem
            key={index}
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
          북마크한 다이어리가 없습니다.
        </p>
      )}
      <Paginating
        currentPage={filters.page}
        totalPages={totalPages}
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
