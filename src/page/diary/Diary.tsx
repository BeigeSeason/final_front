import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import parse from "html-react-parser";
import { DiaryApi } from "../../api/DiaryApi";
import { ItemApi } from "../../api/ItemApi";
import { DiaryInfo } from "../../types/DiaryTypes";
import { ReportData } from "../../types/CommonTypes";
import { BookmarkData } from "../../types/ItemTypes";
import { GetProfileImageSrc } from "../../component/ProfileComponent";
import {
  FaBookmark,
  FaRegBookmark,
  FaRegCalendarAlt,
  FaWonSign,
} from "react-icons/fa";
// import { FaCalendarDays } from "react-icons/fa6";
import { TbPigMoney } from "react-icons/tb";
import { PiPiggyBank } from "react-icons/pi";
import { BiLock, BiLockOpen, BiTrash } from "react-icons/bi";
import { GoPencil } from "react-icons/go";
import { RiAlarmWarningLine } from "react-icons/ri";
import { HiEllipsisVertical } from "react-icons/hi2";
import { Modal, CheckModal } from "../../component/ModalComponent";
import {
  DiaryContainer,
  DiaryHeader,
  DiaryBody,
  DiaryFooter,
  ReportContent,
} from "../../style/DiaryStyled";
import { DeleteFolder } from "../../component/FirebaseComponent";

const Diary = () => {
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  const { nickname, userId } = useSelector((state: RootState) => state.auth);
  const { diaryId } = useParams<string>();
  const [diaryInfo, setDiaryInfo] = useState<DiaryInfo | null>();
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [bookmarkCount, setBookmarkCount] = useState<number>(0);
  const [isPublic, setIsPublic] = useState<boolean | null>(null);
  const [isMenuToggleOpen, setIsMenuToggleOpen] = useState<boolean>(false);
  const [reportContent, setReportContent] = useState<string>("");

  const [isPublicModal, setIsPublicModal] = useState<boolean>(false);
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
  const [reportModal, setReportModal] = useState<boolean>(false);
  const [needLoginModal, setNeedLoginModal] = useState<boolean>(false);

  const timeFormatting = (date: Date | null) => {
    if (date) {
      const formattedDate = String(date).slice(2, 10).replaceAll("-", ".");
      const formattedTime = String(date).slice(11, 16);
      return `${formattedDate} ${formattedTime}`;
    }
  };

  useEffect(() => {
    const fetchDiary = async () => {
      try {
        if (diaryId) {
          const diary = await DiaryApi.diaryDetail(diaryId);
          setDiaryInfo(diary);
          setBookmarkCount(diary.bookmarkCount);
          setIsPublic(diary.public);
          console.log("조회된 다이어리:", diary);
        }
      } catch (error) {
        console.error("다이어리 조회 실패:", error);
      }
    };
    fetchDiary();
  }, [userId]);
  useEffect(() => {
    if (isPublic === null) return;
    if (userId === null && !isPublic) {
      navigate("/");
    }
  }, [isPublic, userId]);
  useEffect(() => {
    const fetchIsBookmarked = async () => {
      if (userId) {
        const data: BookmarkData = {
          targetId: diaryId,
          userId: userId,
        };
        const rsp = await ItemApi.isBookmarked(data);
        setIsBookmarked(rsp);
      }
    };
    fetchIsBookmarked();
  }, [userId]);

  // 토글 메뉴 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuToggleOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsMenuToggleOpen(false); // 메뉴 외부 클릭 시 닫기
      }
    };

    // 이벤트 리스너 등록
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuToggleOpen]);

  // 공개/비공개 전환
  const onClickIsPublic = async () => {
    if (diaryId) {
      const response = await DiaryApi.changeIsPublic(diaryId, !isPublic);
      console.log(response);
      if (response) {
        setIsPublic(!isPublic);
      }
      setIsPublicModal(false);
    }
  };

  // 다이어리 북마크
  const onClickBookmark = async () => {
    if (!userId) {
      setNeedLoginModal(true);
      return;
    } else if (!isBookmarked) {
      // 북마크
      const data: BookmarkData = {
        targetId: diaryId,
        userId: userId,
        type: "DIARY",
      };
      await ItemApi.addBookmark(data);
      setBookmarkCount(bookmarkCount + 1);
    } else {
      const data: BookmarkData = {
        targetId: diaryId,
        userId: userId,
      };
      await ItemApi.deleteBookmark(data);
      setBookmarkCount(bookmarkCount - 1);
    }
    setIsBookmarked(!isBookmarked);
  };

  // 다이어리 삭제
  const onClickDelete = async () => {
    if (diaryId) {
      const response = await DiaryApi.deleteDiary(diaryId);
      const deleteParams = {
        type: "diary" as const,
        userId,
        diaryId: diaryId,
      };
      const fbrsp = await DeleteFolder(deleteParams);
      if (response && fbrsp) {
        navigate("/");
      }
    }
  };

  // 다이어리 신고
  const onClickReport = async () => {
    if (userId && diaryInfo && diaryId) {
      const reportData: ReportData = {
        reportType: "DIARY",
        reporter: userId,
        reported: diaryInfo?.ownerId,
        reportEntity: diaryId,
        reason: reportContent.trim(),
      };
      const response = await DiaryApi.reportDiary(reportData);
      if (response) {
        setReportContent("");
        setReportModal(false);
      }
    }
  };

  return (
    <DiaryContainer>
      <DiaryHeader>
        <div className="menu-icons" ref={menuRef}>
          {isBookmarked ? (
            <>
              <FaBookmark
                className="icon"
                title="북마크"
                onClick={() => onClickBookmark()}
              />
              <span className="bookmarked-count">{bookmarkCount}</span>
            </>
          ) : (
            <>
              <FaRegBookmark
                className="icon"
                title="북마크"
                onClick={() => onClickBookmark()}
              />
              <span className="bookmarked-count">{bookmarkCount}</span>
            </>
          )}
          {userId === diaryInfo?.ownerId &&
            (isPublic ? (
              <BiLockOpen
                className="icon"
                title="공개/비공개"
                onClick={() => setIsPublicModal(true)}
              />
            ) : (
              <BiLock
                className="icon"
                title="공개/비공개"
                onClick={() => setIsPublicModal(true)}
              />
            ))}
          <HiEllipsisVertical
            className="icon menu-icon"
            onClick={() => setIsMenuToggleOpen(!isMenuToggleOpen)}
          />
          {isMenuToggleOpen && (
            <div className="menu-toggle-container">
              {nickname === diaryInfo?.nickname && (
                <>
                  <div
                    className="menu-item"
                    onClick={() => navigate(`/diary/${diaryId}/edit`)}
                  >
                    <GoPencil className="icon" />
                    <span>수정</span>
                  </div>
                  <hr />

                  <div
                    className="menu-item"
                    onClick={() => setIsDeleteModal(true)}
                  >
                    <BiTrash className="icon" />
                    <span>삭제</span>
                  </div>
                  <hr />
                </>
              )}
              <div className="menu-item" onClick={() => setReportModal(true)}>
                <RiAlarmWarningLine className="icon" />
                <span>신고</span>
              </div>
            </div>
          )}
        </div>
        <h1 onClick={() => setIsMenuToggleOpen(false)}>
          {diaryInfo?.title ?? "제목 없음"}
        </h1>
        <div className="travel-info-container">
          <div className="travel-info">
            <FaRegCalendarAlt />{" "}
            <span>
              {diaryInfo?.startDate?.replaceAll("-", ". ")} ~{" "}
              {diaryInfo?.endDate?.replaceAll("-", ". ")}
            </span>
          </div>
          <div className="travel-info">
            <FaWonSign /> <span>{diaryInfo?.totalCost.toLocaleString()}</span>
          </div>
        </div>
        <div className="profile">
          <div
            className="profile-img"
            onClick={() => {
              if (userId === diaryInfo?.ownerId) {
                navigate(`/mypage`);
              } else {
                navigate(`/otheruser/${diaryInfo?.ownerId}`);
              }
            }}
          >
            <img
              src={GetProfileImageSrc(diaryInfo?.profileImgPath ?? null)}
              alt="프로필 이미지"
            />
          </div>
          <div className="profile-info">
            <p
              className="nickname"
              onClick={() => {
                if (userId === diaryInfo?.ownerId) {
                  navigate(`/mypage`);
                } else {
                  navigate(`/otheruser/${diaryInfo?.ownerId}`);
                }
              }}
            >
              {diaryInfo?.nickname ?? "사용자 닉네임"}
            </p>
            <p className="create-time">
              {timeFormatting(diaryInfo?.createdTime as Date) ?? "작성일"}
            </p>
          </div>
        </div>
      </DiaryHeader>
      {/* <hr /> */}
      <DiaryBody>
        <div className="diary-content">
          {parse(diaryInfo?.content ?? "내용 없음")}
        </div>
      </DiaryBody>
      <DiaryFooter>
        <div className="tag-container">
          {diaryInfo?.tags.map((tag, index) => (
            <span className="tag content-font1" key={index}>
              {tag.replace("#", "# ")}
            </span>
          ))}
        </div>
      </DiaryFooter>
      {isPublicModal && (
        <Modal
          isOpen={isPublicModal}
          onConfirm={onClickIsPublic}
          onClose={() => setIsPublicModal(false)}
        >
          <p>{isPublic ? "비공개" : "공개"}로 전환하시겠습니까?</p>
        </Modal>
      )}
      {isDeleteModal && (
        <Modal
          isOpen={isDeleteModal}
          onConfirm={onClickDelete}
          onClose={() => setIsDeleteModal(false)}
        >
          <div>
            <p>정말 삭제하시겠습니까?</p>
            <p>삭제 후엔 복구가 불가능합니다.</p>
          </div>
        </Modal>
      )}
      {reportModal && (
        <Modal
          isOpen={reportModal}
          onConfirm={onClickReport}
          onClose={() => setReportModal(false)}
          disabled={reportContent.trim().length < 1}
        >
          <ReportContent>
            <h3>신고 내용을 입력해주세요</h3>
            <textarea
              value={reportContent}
              onChange={(e) => setReportContent(e.target.value)}
              placeholder={
                "신고 내용을 입력해 주세요.\n허위 신고의 경우 신고자에게 불이익이 생길 수 있습니다."
              }
            />
          </ReportContent>
        </Modal>
      )}
      {needLoginModal && (
        <CheckModal
          isOpen={needLoginModal}
          onClose={() => setNeedLoginModal(false)}
        >
          <p>로그인이 필요한 서비스입니다.</p>
        </CheckModal>
      )}
    </DiaryContainer>
  );
};

export default Diary;
