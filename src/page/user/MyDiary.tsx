import React, { useEffect, useState } from "react";
import { ItemList } from "../../style/ListStyled";
import { DiaryItem } from "../../component/ItemComponent";
import { Paginating } from "../../component/PaginationComponent";
import { ItemApi } from "../../api/ItemApi";
import { Diary } from "../itemlist/DiaryList";
import { useLocation, useNavigate } from "react-router-dom";
import { Loading } from "../../component/Loading";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const MyDiary = React.memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = useSelector((state: RootState) => state.auth);
  const [filters, setFilters] = useState(() => {
    const queryParams = new URLSearchParams(location.search);
    return {
      page: parseInt(queryParams.get("page") || "0", 10),
      size: parseInt(queryParams.get("size") || "10", 10),
    };
  });
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  // const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [numberOfElements, setNumberOfElements] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const queryParams = new URLSearchParams(location.search);

  const fetchDiaries = async (page: number) => {
    setLoading(true);
    console.log("이건 호출 됨?");
    try {
      if (userId) {
        const data = await ItemApi.getMyDiaryList({
          userId: userId,
          page: page,
          size: filters.size,
          // size: parseInt("10", 10),
        });
        console.log(data);
        setDiaries(data.content);
        setTotalPages(data.totalPages);
        setTotalElements(data.totalElements);
        setNumberOfElements(data.numberOfElements);
      }
    } catch (err) {
      setError("데이터를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const queryParams = new URLSearchParams();
    // Object.entries(filters).forEach(([key, value]) => {
    //   if (value) {
    //     if (key === "searchQuery") {
    //       queryParams.set(key, value);
    //     } else {
    //       queryParams.set(key, value.toString());
    //     }
    //   }
    // });
    queryParams.set("menu", "내 여행일지");
    queryParams.set("page", filters.page.toString());
    queryParams.set("size", filters.size.toString());
    navigate(`/mypage?${queryParams.toString()}`, { replace: true });
    fetchDiaries(filters.page);
  }, [navigate, filters.page, filters.size, userId]);

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
    // updateFilters("currentPage", page);
  };
  return (
    <ItemList style={{ width: "48vw", margin: "0 auto" }}>
      {diaries.length > 0 ? (
        diaries.map((diary, index) => (
          <DiaryItem
            key={index}
            id={diary.diaryId}
            thumbnail={diary.thumbnail}
            description={[
              diary.title,
              diary.contentSummary,
              `${diary.writer} (${new Date(diary.createdAt).toLocaleString()})`,
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
          작성한 다이어리가 없습니다.
        </p>
      )}
      <Paginating
        currentPage={filters.page}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </ItemList>
  );
});

export default MyDiary;
