import React, { useEffect, useState } from "react";
import { ItemList } from "../../style/ListStyled";
import { DiaryItem } from "../../component/ItemComponent";
import { Paginating } from "../../component/PaginationComponent";
import { ItemApi } from "../../api/ItemApi";
import { Diary } from "../../types/ItemTypes";
import { MyDiaryProps } from "../../types/DiaryTypes";
import { useLocation, useNavigate } from "react-router-dom";
import { Loading } from "../../component/Loading";

const MyDiary: React.FC<MyDiaryProps> = React.memo(({ type, userId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  // const { userId } = useSelector((state: RootState) => state.auth);
  const [filters, setFilters] = useState(() => {
    const queryParams = new URLSearchParams(location.search);
    return {
      page: parseInt(queryParams.get("page") || "0", 10),
      size: parseInt(queryParams.get("size") || "5", 10),
    };
  });
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  // const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [numberOfElements, setNumberOfElements] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchDiaries = async (page: number) => {
    setLoading(true);
    try {
      if (userId) {
        let data = null;
        if (type === "/mypage") {
          data = await ItemApi.getMyDiaryList({
            userId: userId,
            page: page,
            size: filters.size,
          });
        } else {
          data = await ItemApi.getOtherUserDiaryList({
            userId: userId,
            page: page,
            size: filters.size,
          });
        }
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
    navigate(`${type}?${queryParams.toString()}`, { replace: true });
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
          작성한 다이어리가 없습니다.
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

export default MyDiary;
