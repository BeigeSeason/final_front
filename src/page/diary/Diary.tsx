import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import { DiaryApi, DiaryInfo } from "../../api/DiaryApi";
import { FaBookmark, FaRegBookmark, FaEllipsisV } from "react-icons/fa";
import {
  DiaryContainer,
  DiaryHeader,
  DiaryBody,
} from "../../style/DiaryStyled";

import Profile1 from "../../img/profile/profile1.png";

const Diary = () => {
  const { diaryId } = useParams<string>();
  const [diaryInfo, setDiaryInfo] = useState<DiaryInfo | null>();
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  const timeFormatting = (date: Date | null) => {
    if (date) {
      const formattedDate = String(date).slice(2, 10).replaceAll("-", ".");
      const formattedTime = String(date).slice(11, 16);
      return `${formattedDate} ${formattedTime}`;
    }
  };

  useEffect(() => {
    const fetchDiary = async (diaryId?: string) => {
      try {
        if (diaryId) {
          const diary = await DiaryApi.diaryDetail(diaryId);
          setDiaryInfo(diary);
          console.log("조회된 다이어리:", diary);
        }
      } catch (error) {
        console.error("다이어리 조회 실패:", error);
      }
    };
    fetchDiary(diaryId);
  }, []);

  return (
    <DiaryContainer>
      <DiaryHeader>
        <div className="menu-icons">
          {isBookmarked ? (
            <>
              <FaBookmark
                className="menu-icon"
                title="북마크"
                // onClick={() => handleBookmarked()}
                onClick={() => setIsBookmarked(!isBookmarked)}
              />
              <span>숫자</span>
            </>
          ) : (
            <>
              <FaRegBookmark
                className="menu-icon"
                title="북마크"
                // onClick={() => handleBookmarked()}
                onClick={() => setIsBookmarked(!isBookmarked)}
              />
              <span>숫자</span>
            </>
          )}
          <FaEllipsisV />
          {/* <button>북마크</button>
          <button>신고</button>
          <button>공개/비공개</button>
          <button>수정</button>
          <button>삭제</button> */}
          <h1>{diaryInfo?.title ?? "제목 없음"}</h1>
          <div className="profile">
            <div className="profile-img">
              <img src={Profile1} alt="프로필 이미지" />
            </div>
            <div className="profile-info">
              <p className="nickname">
                {diaryInfo?.nickname ?? "사용자 닉네임"}
              </p>
              <p className="create-time">
                {timeFormatting(diaryInfo?.createdTime as Date) ?? "작성일"}
              </p>
            </div>
          </div>
        </div>
      </DiaryHeader>
      <DiaryBody>
        <div>{parse(diaryInfo?.content ?? "내용 없음")}</div>
      </DiaryBody>
    </DiaryContainer>
  );
};

export default Diary;
