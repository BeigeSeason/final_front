import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { DiaryApi } from "../../api/DiaryApi";

const Diary = () => {
  const { diaryId } = useParams();

  useEffect(() => {
    const fetchDiary = async (diaryId?: string) => {
      try {
        if (diaryId) {
          const diary = await DiaryApi.diaryDetail(diaryId);
          console.log("조회된 다이어리:", diary);
        }
      } catch (error) {
        console.error("다이어리 조회 실패:", error);
      }
    };
    fetchDiary(diaryId);
  }, []);
  return (
    <>
      <div>다이어리 페이지입니다.</div>
    </>
  );
};

export default Diary;
