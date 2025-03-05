import React, { useEffect, useState } from "react";
import { ItemList } from "../../style/ListStyled";
import { DiaryItem } from "../../component/ItemComponent";
import { Paginating } from "../../component/PaginationComponent";
import { ItemApi } from "../../api/ItemApi";
import { Diary } from "../itemlist/DiaryList";
import { useLocation, useNavigate } from "react-router-dom";
import { Loading } from "../../component/Loading";

const MyDiary = React.memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [numberOfElements, setNumberOfElements] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const queryParams = new URLSearchParams(location.search);

  const fetchDiaries = async (page: number) => {
    setLoading(true);
    try {
      const data = await ItemApi.getDiaryList({
        // keyword: filters.searchQuery || undefined,
        page: page,
        size: parseInt(queryParams.get("pageSize") || "5", 10),
      });
      setDiaries(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
      setNumberOfElements(data.numberOfElements);
      console.log(data.content);
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
    queryParams.set("page", currentPage.toString());
    navigate(
      `/mypage?menu=내%20여행일지${
        queryParams.toString() ? `?${queryParams.toString()}` : ""
      }`,
      { replace: true }
    );
    fetchDiaries(currentPage);
  }, [navigate, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // updateFilters("currentPage", page);
  };
  return (
    <ItemList>
      {diaries.map((diary, index) => (
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
      ))}
      <Paginating
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </ItemList>
  );
});

export default MyDiary;
