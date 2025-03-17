import { useParams, Link } from "react-router-dom";
import { ItemApi } from "../../api/ItemApi";
import { TourSpotDetail } from "../../types/TourSpotTypes";
import { Comment } from "html-react-parser";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import {
  TourItemInfoBox,
  SpotTitle,
  SpotBasic,
  SpotDetail,
  NearTravelList,
  StyledWrapper,
  CommentBox,
} from "../../style/TourSpotStyled";
import basicImg from "../../img/item/type_200.png";
import { Loading } from "../../component/Loading";
import { Modal, CheckModal } from "../../component/ModalComponent";
import { InputBox } from "../../component/InputComponent";
import { Button } from "../../component/ButtonComponent";
import { Paginating } from "../../component/PaginationComponent";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { KakaoMapSpot } from "../../component/KakaoMapComponent";
import AxiosApi from "../../api/AxiosApi";
import { Review } from "../../types/CommonTypes";
import { BookmarkData } from "../../types/ItemTypes";
import { GoStarFill } from "react-icons/go";

// icon
import { FaRegStar, FaRegStarHalfStroke, FaStar } from "react-icons/fa6";

export const TourSpot = () => {
  const { id } = useParams<{ id: string }>(); // id 값을 URL에서 받아옵니다.
  const { userId, nickname, profile } = useSelector(
    (state: RootState) => state.auth
  );
  const [isBookmarked, setIsBookmarked] = useState<boolean | null>(null);
  const [bookmarkCount, setBookmarkCount] = useState<number>(0);
  const [tourSpotDetail, setTourSpotDetail] = useState<TourSpotDetail | null>(
    null
  );
  const [rating, setRating] = useState(5); // ⭐ 별점 상태 추가
  const [ratingHover, setRatingHover] = useState(0); // 마우스 오버 별점
  const starRef = useRef<HTMLDivElement>(null);
  const [comment, setComment] = useState(""); // 댓글 입력창

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");
  const [editRating, setEditRating] = useState(rating);
  const [editRatingHover, setEditRatingHover] = useState(ratingHover);
  const editStarRef = useRef<HTMLDivElement>(null);

  const [deleteReviewId, setDeleteReviewId] = useState(0);

  const [comments, setComments] = useState<
    {
      id: number;
      nickname: string;
      content: string;
      rating: number;
      createdAt: Date;
    }[]
  >([]); // 현재 페이지 댓글 목록
  const [totalComments, setTotalComments] = useState(0);

  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태 추가
  const commentsPerPage = 10;
  const totalPages = Math.ceil(totalComments / commentsPerPage);

  const [needDeleteModal, setNeedDeleteModal] = useState<boolean>(false);
  const [needLoginModal, setNeedLoginModal] = useState<boolean>(false);

  useEffect(() => {
    if (tourSpotDetail) {
      getPaginatedComments(); // tourSpotDetail이 로드되면 댓글을 불러옴
    }
  }, [tourSpotDetail]);
  useEffect(() => {
    getPaginatedComments();
  }, [currentPage]);

  // 별점
  const handleRatingHover = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!starRef.current) return;

    const { left, width } = starRef.current.getBoundingClientRect();
    const relativeX = event.clientX - left; // 부모 div 내 상대적 X 좌표
    const starWidth = width / 5; // 별 하나의 너비 (간격 포함)
    const position = relativeX / starWidth; // 몇 번째 별인지 계산

    setRatingHover(Math.ceil(position * 2) / 2); // 0.5 단위로 반올림
  };
  const handleRatingLeave = () => {
    setRatingHover(rating);
  };
  const handleRatingClick = () => {
    setRating(ratingHover);
  };
  // 별점 수정
  const handleEditRatingHover = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!editStarRef.current) return;

    const { left, width } = editStarRef.current.getBoundingClientRect();
    const relativeX = event.clientX - left; // 부모 div 내 상대적 X 좌표
    const starWidth = width / 5; // 별 하나의 너비 (간격 포함)
    const position = relativeX / starWidth; // 몇 번째 별인지 계산

    setEditRatingHover(Math.ceil(position * 2) / 2); // 0.5 단위로 반올림
  };
  const handleEditRatingLeave = () => {
    setEditRatingHover(editRating);
  };
  const handleEditRatingClick = () => {
    setEditRating(editRatingHover);
  };

  // 댓글 리스트
  const getPaginatedComments = async () => {
    if (!tourSpotDetail?.contentId) return;

    try {
      const response = await AxiosApi.reviewList(
        currentPage,
        commentsPerPage,
        tourSpotDetail?.contentId
      );

      setComments(response.content);
      console.log(response.content);
      setTotalComments(response.totalElements);
    } catch (error) {
      console.error("댓글 불러오기 실패:", error);
    }
  };

  // 댓글 입력
  const handleAddComment = async () => {
    if (comment.trim() === "") {
      alert("댓글을 입력해주세요!"); // ⭐ 별점과 댓글이 없으면 등록 불가
      setComment("");
      return;
    }

    if (userId) {
      const reviewData: Review = {
        id: null,
        memberId: userId,
        rating: rating,
        tourSpotId: tourSpotDetail?.contentId,
        content: comment,
      };

      try {
        await AxiosApi.postReview(reviewData);

        setComments((prevComments) => {
          const updatedComments = [
            {
              id: 0,
              nickname: nickname || "", // 여기에 적절한 닉네임을 넣어야 해
              content: comment,
              rating: rating,
              createdAt: new Date(),
            },
            ...prevComments,
          ];

          // 10개 댓글만 유지
          return updatedComments.slice(0, 10);
        });
        setTotalComments(totalComments + 1);

        setComment(""); // 입력 필드 초기화
        setRating(5); // ⭐ 별점 초기화
        setRatingHover(5);
        setCurrentPage(0);
      } catch (error) {
        console.log("댓글 추가 실패: ", error);
      }
    } else {
      setNeedLoginModal(true);
    }
  };

  // 댓글 수정
  const handleReviewEdit = (index: number, content: string) => {
    setEditIndex(index);
    setEditContent(content);
  };
  // 댓글 수정 저장
  const handleSaveEdit = async (
    id: number,
    content: string,
    rating: number
  ) => {
    // 수정 로직
    const reviewData: Review = {
      id: id,
      memberId: userId || "",
      rating: rating,
      tourSpotId: tourSpotDetail?.contentId,
      content: editContent,
    };
    try {
      await AxiosApi.editReview(reviewData);
      setComments((prevComments) => {
        return prevComments.map((comment) => {
          if (comment.id === id) {
            return {
              ...comment,
              content: editContent,
              rating: editRating,
            };
          }
          return comment;
        });
      });

      setEditIndex(null);
    } catch (error) {
      console.log("댓글 수정 실패");
    }
  };

  // 댓글 삭제
  const clickReviewDelete = (id: number) => {
    setNeedDeleteModal(true);
    setDeleteReviewId(id);
  };
  const handleReviewDelete = async () => {
    try {
      await AxiosApi.deleteReview(deleteReviewId);

      setComments((prevComments) => {
        return prevComments.filter((comment) => comment.id !== deleteReviewId);
      });

      setNeedDeleteModal(false);
    } catch (error) {
      console.log("댓글 삭제 실패");
    }
  };

  const parseLinks = (htmlString: string): React.ReactNode[] => {
    // <a> 태그와 <br/> 태그를 모두 매칭하는 정규식
    const regex =
      /<a href="([^"]+)"(?:\s*target="_blank")?(?:\s*title="([^"]+)")?>([^<]+)<\/a>|<br\s*\/?>/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(htmlString)) !== null) {
      // 매칭된 태그 이전의 텍스트 추가
      if (match.index > lastIndex) {
        parts.push(htmlString.slice(lastIndex, match.index));
      }

      // <a> 태그 처리
      if (match[0].startsWith("<a")) {
        parts.push(
          <a
            key={match.index}
            href={match[1]}
            target="_blank"
            rel="noopener noreferrer"
            title={match[2] || ""}
          >
            {match[3]}
          </a>
        );
      }
      // <br> 또는 <br/> 태그 처리
      else if (match[0].startsWith("<br")) {
        parts.push(<br key={match.index} />);
      }

      lastIndex = regex.lastIndex;
    }

    // 남은 텍스트 처리 (www.으로 시작하는 링크 변환)
    if (lastIndex < htmlString.length) {
      const remainingText = htmlString.slice(lastIndex);
      if (remainingText.startsWith("www.")) {
        parts.push(
          <a
            key={lastIndex}
            href={`http://${remainingText}`}
            className="info-content"
          >
            {`http://${remainingText}`}
          </a>
        );
      } else if (remainingText.startsWith("<a")) {
        const hrefMatch = remainingText.match(/href="([^"]+)"/);
        const hrefValue = hrefMatch ? hrefMatch[1] : "";

        const textMatch = remainingText.match(/>([^<]+)<\/a>/);
        const textContent = textMatch ? textMatch[1] : "";

        parts.push(
          <a key={lastIndex} href={`${hrefValue}`} className="info-content">
            {`${textContent}`}
          </a>
        );
      } else {
        parts.push(remainingText);
      }
    }

    return parts;
  };

  useEffect(() => {
    if (id) {
      fetchTourSpotDetail(id);
    }
  }, [id]);
  useEffect(() => {
    const fetchIsBookmarked = async () => {
      if (userId) {
        const data: BookmarkData = {
          targetId: id,
          userId: userId,
        };
        const rsp = await ItemApi.isBookmarked(data);
        setIsBookmarked(rsp);
      }
    };
    fetchIsBookmarked();
  }, [userId]);

  // 상세 정보를 가져오는 함수
  const fetchTourSpotDetail = async (id: string) => {
    try {
      const response = await ItemApi.getTourSpotDetail(id);
      setTourSpotDetail(response);
      setBookmarkCount(response.bookmarkCount);
      console.log(response);
    } catch (error) {
      console.error("관광지 상세 정보 불러오기 실패:", error);
    }
  };
  // 북마크
  const onClickBookmark = async () => {
    if (!userId) {
      setNeedLoginModal(true);
      return;
    } else if (!isBookmarked) {
      // 북마크
      const data: BookmarkData = {
        targetId: id,
        userId: userId,
        type: "TOURSPOT",
      };
      await ItemApi.addBookmark(data);
      setBookmarkCount(bookmarkCount + 1);
    } else {
      const data: BookmarkData = {
        targetId: id,
        userId: userId,
      };
      await ItemApi.deleteBookmark(data);
      setBookmarkCount(bookmarkCount - 1);
    }
    setIsBookmarked(!isBookmarked);
  };

  if (!tourSpotDetail) {
    return <Loading>정보를 불러오는 중입니다.</Loading>;
  }

  // 페이지 번호 생성
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalComments / commentsPerPage); i++) {
    pageNumbers.push(i);
  }

  // 페이지 이동
  const handlePageChange = (page: number) => {
    console.log("클릭한 페이지: " + page);
    setCurrentPage(page);
  };

  return (
    <>
      <TourItemInfoBox>
        <SpotTitle>
          <h1 className="tour-title">{tourSpotDetail?.title}</h1>
          <div className="icon-container">
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
          </div>
        </SpotTitle>
        <SpotBasic>
          <div className="tourThumb">
            {tourSpotDetail.images?.length > 1 ? (
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                spaceBetween={10}
                slidesPerView={1}
              >
                {tourSpotDetail.images.map((image: string, index: number) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image.replace("http:", "https:")}
                      alt={`여행지 이미지 ${index + 1}`}
                      className="tour-image"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <img
                src={tourSpotDetail.images?.[0] || basicImg}
                alt="기본 이미지"
                className="tour-image"
              />
            )}
          </div>
          <div className="spotInfo">
            <div className="itemInfo">
              <p>주소</p>
              {tourSpotDetail?.addr1
                ? parseLinks(tourSpotDetail.addr1)
                : "주소 정보 없음"}
            </div>
            <div className="itemInfo">
              <p>연락처</p>
              {tourSpotDetail?.contact
                ? parseLinks(tourSpotDetail.contact)
                : "연락처 정보 없음"}
            </div>
            <div className="itemInfo">
              <p>운영 시간</p>
              {tourSpotDetail?.useTime
                ? parseLinks(tourSpotDetail.useTime)
                : "운영 시간 정보 없음"}
            </div>
            <div className="itemInfo">
              <p>홈페이지</p>
              <span>
                {tourSpotDetail?.homepage
                  ? parseLinks(tourSpotDetail.homepage)
                  : "정보 없음"}
              </span>
            </div>
            <div className="itemInfo">
              <p>주차</p>
              {tourSpotDetail?.parking
                ? parseLinks(tourSpotDetail.parking)
                : "주차 정보 없음"}
            </div>
          </div>
        </SpotBasic>
        <SpotDetail>
          <div className="spotDetail">{tourSpotDetail?.overview}</div>
          <div className="map-near-container">
            <div className="MapSpot">
              <KakaoMapSpot
                mapX={tourSpotDetail.mapX}
                mapY={tourSpotDetail.mapY}
              />
            </div>
            {/* <div className="nearbySpot">
            <p>여기에 주변 관광지 목록</p>
          </div> */}
            <NearTravelList>
              <h3>주변 관광지</h3>
              {tourSpotDetail.nearSpots.length > 0 && (
                <div className="nearby-travelspot">
                  {tourSpotDetail.nearSpots.map((spot) => {
                    // const categoryPath = getCategoryName(
                    //   spot.cat1,
                    //   spot.cat2,
                    //   spot.cat3
                    // );
                    return (
                      <div key={spot.spotId}>
                        <div className="nearbybox">
                          <Link
                            to={`/tourspot/${spot.spotId}`}
                            className="nearbyspot"
                          >
                            <h4>{spot.title}</h4>
                            {/* <p>{categoryPath}</p> */}
                            <p>
                              <GoStarFill style={{ color: "#FFD700" }} />{" "}
                              {spot.avgRating}{" "}
                              <span>
                                (
                                {String(spot.reviewCount).replace(
                                  /\B(?=(\d{3})+(?!\d))/g,
                                  ","
                                )}
                                )
                              </span>
                            </p>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </NearTravelList>
          </div>
        </SpotDetail>

        {/* 댓글 영역 */}
        <CommentBox>
          <div className="commentCount">댓글 수 {totalComments}</div>
          <div className="commentInput">
            <textarea
              placeholder="댓글을 입력하세요..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              style={{ width: "100%", resize: "none" }}
            />
            {/* 별점 */}
            <StyledWrapper>
              <div
                ref={starRef}
                onMouseMove={handleRatingHover}
                onMouseLeave={handleRatingLeave}
                onClick={handleRatingClick}
                style={{
                  display: "flex",
                  gap: 5,
                  cursor: "pointer",
                  width: "140px",
                }}
              >
                {[...Array(5)].map((_, i) => {
                  const score = ratingHover || rating; // 마우스 오버 or 확정된 값
                  const full = score >= i + 1;
                  const half = score >= i + 0.5 && score < i + 1;

                  return (
                    <div key={i} style={{ width: 24 }}>
                      {full ? (
                        <FaStar size={24} color="gold" />
                      ) : half ? (
                        <FaRegStarHalfStroke size={24} color="gold" />
                      ) : (
                        <FaRegStar size={24} color="gold" />
                      )}
                    </div>
                  );
                })}
              </div>
            </StyledWrapper>
            <Button onClick={handleAddComment}> 등록</Button>
          </div>

          {/* 댓글 목록 */}
          {comments.map((c, index) => (
            <div key={index}>
              <div className="commentList">
                <div className="comment-header">
                  <div className="header-left">
                    <div>{c.nickname}</div>
                    <div className="rate center">
                      <GoStarFill
                        style={{ color: "#FFD700", marginRight: "5px" }}
                      />{" "}
                      {c.rating}점
                    </div>
                  </div>
                  {c.nickname === nickname && (
                    <div className="header-right">
                      {editIndex === index ? (
                        <div
                          className="button"
                          onClick={() =>
                            handleSaveEdit(c.id, editContent, editRating)
                          }
                        >
                          저장
                        </div>
                      ) : (
                        <div
                          className="button"
                          onClick={() => handleReviewEdit(index, c.content)}
                        >
                          수정
                        </div>
                      )}
                      |
                      <div
                        className="button"
                        onClick={() => clickReviewDelete(c.id)}
                      >
                        삭제
                      </div>
                    </div>
                  )}
                </div>

                <div className="comment" style={{ whiteSpace: "pre-line" }}>
                  {editIndex === index ? (
                    <div className="commentInput">
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        rows={3}
                      />
                      <StyledWrapper>
                        <div
                          ref={editStarRef}
                          onMouseMove={handleEditRatingHover}
                          onMouseLeave={handleEditRatingLeave}
                          onClick={handleEditRatingClick}
                          style={{
                            display: "flex",
                            gap: 5,
                            cursor: "pointer",
                            width: "140px",
                          }}
                        >
                          {[...Array(5)].map((_, i) => {
                            const score = editRatingHover || editRating; // 마우스 오버 or 확정된 값
                            const full = score >= i + 1;
                            const half = score >= i + 0.5 && score < i + 1;

                            return (
                              <div key={i} style={{ width: 24 }}>
                                {full ? (
                                  <FaStar size={24} color="gold" />
                                ) : half ? (
                                  <FaRegStarHalfStroke size={24} color="gold" />
                                ) : (
                                  <FaRegStar size={24} color="gold" />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </StyledWrapper>
                    </div>
                  ) : (
                    c.content
                  )}
                </div>

                <div className="commentInfo">
                  <div className="date">
                    {new Date(c.createdAt).toLocaleString("ko-KR", {
                      timeZone: "Asia/Seoul",
                      hour12: false,
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* 페이징 */}
          {totalComments > commentsPerPage && (
            <Paginating
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          )}
        </CommentBox>

        {/* 댓글 모달 */}
        {needLoginModal && (
          <CheckModal
            isOpen={needLoginModal}
            onClose={() => setNeedLoginModal(false)}
          >
            <p>로그인이 필요한 서비스입니다.</p>
          </CheckModal>
        )}
        {/* 댓글 삭제 모달 */}
        {needDeleteModal && (
          <Modal
            isOpen={needDeleteModal}
            onClose={() => setNeedDeleteModal(false)}
            onConfirm={handleReviewDelete}
          >
            <p>댓글을 삭제하시겠습니까?</p>
          </Modal>
        )}
      </TourItemInfoBox>
    </>
  );
};
