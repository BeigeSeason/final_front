import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import parse from "html-react-parser";
import { DiaryApi, DiaryInfo } from "../../api/DiaryApi";
import { GetProfileImageSrc } from "../../component/ProfileComponent";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { BiLock, BiLockOpen, BiTrash } from "react-icons/bi";
import { GoPencil } from "react-icons/go";
import { RiAlarmWarningLine } from "react-icons/ri";
import { HiEllipsisVertical } from "react-icons/hi2";
import { Modal } from "../../component/ModalComponent";
import {
  DiaryContainer,
  DiaryHeader,
  DiaryBody,
  DiaryFooter,
} from "../../style/DiaryStyled";

const Diary = () => {
  const navigate = useNavigate();
  const { nickname } = useSelector((state: RootState) => state.auth);
  const { diaryId } = useParams<string>();
  const [diaryInfo, setDiaryInfo] = useState<DiaryInfo | null>();
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [isMenuToggleOpen, setIsMenuToggleOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const [isPublicModal, setIsPublicModal] = useState<boolean>(false);
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);

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
          setIsPublic(diary.public);
          console.log("공개 여부 : ", diary.public);
          console.log("조회된 다이어리:", diary);
        }
      } catch (error) {
        console.error("다이어리 조회 실패:", error);
      }
    };
    fetchDiary(diaryId);
  }, []);

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

  // 다이어리 삭제
  const onClickDelete = async () => {
    if (diaryId) {
      const response = await DiaryApi.deleteDiary(diaryId);
      if (response) {
        navigate("/");
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
                // onClick={() => handleBookmarked()}
                onClick={() => setIsBookmarked(!isBookmarked)}
              />
              <span className="bookmarked-count">10</span>
            </>
          ) : (
            <>
              <FaRegBookmark
                className="icon"
                title="북마크"
                // onClick={() => handleBookmarked()}
                onClick={() => setIsBookmarked(!isBookmarked)}
              />
              <span className="bookmarked-count">10</span>
            </>
          )}
          {isPublic ? (
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
          )}
          <HiEllipsisVertical
            className="icon menu-icon"
            onClick={() => setIsMenuToggleOpen(!isMenuToggleOpen)}
          />
          {isMenuToggleOpen && (
            <div className="menu-toggle-container">
              {nickname === diaryInfo?.nickname && (
                <>
                  <div className="menu-item">
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
              <div className="menu-item">
                <RiAlarmWarningLine className="icon" />
                <span>신고</span>
              </div>
            </div>
          )}
        </div>
        <h1 onClick={() => setIsMenuToggleOpen(false)}>
          {diaryInfo?.title ?? "제목 없음"}
        </h1>
        <div className="profile">
          <div className="profile-img">
            <img
              src={GetProfileImageSrc(diaryInfo?.profileImgPath ?? null)}
              alt="프로필 이미지"
            />
          </div>
          <div className="profile-info">
            <p className="nickname">{diaryInfo?.nickname ?? "사용자 닉네임"}</p>
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
              {tag}
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
          {isPublic ? "비공개" : "공개"}로 전환하시겠습니까?
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
    </DiaryContainer>
  );
};

export default Diary;
