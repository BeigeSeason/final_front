import { useParams, Link } from "react-router-dom";
import { ItemApi } from "../../api/ItemApi";
import { TourSpotDetail } from "../../types/TourSpotTypes";
import { Comment } from "html-react-parser";
import React, { useEffect, useState } from "react";
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
import { CheckModal } from "../../component/ModalComponent";
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

export const TourSpot = () => {
  const { id } = useParams<{ id: string }>(); // id 값을 URL에서 받아옵니다.
  const { userId } = useSelector((state: RootState) => state.auth);
  const [isBookmarked, setIsBookmarked] = useState<boolean | null>(null);
  const [bookmarkCount, setBookmarkCount] = useState<number>(0);
  const [tourSpotDetail, setTourSpotDetail] = useState<TourSpotDetail | null>(
    null
  );
  const [rating, setRating] = useState<number | null>(null); // ⭐ 별점 상태 추가
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<
    { text: string; rating: number | null; date: Date }[]
  >([]);
  const [needLoginModal, setNeedLoginModal] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태 추가
  const commentsPerPage = 10;
  const totalPages = Math.ceil(comments.length / commentsPerPage);

  // 댓글 입력
  const handleAddComment = async () => {
    if (!comment.trim() || rating === null) {
      alert("별점과 댓글을 모두 입력해주세요!"); // ⭐ 별점과 댓글이 없으면 등록 불가
      return;
    }

    if (userId) {
      const reviewData: Review = {
        memberId: userId,
        rating: rating,
        tourSpotId: tourSpotDetail?.contentId,
        content: comment,
      };
      await AxiosApi.postReview(reviewData);
    }
    setComments([{ text: comment, rating, date: new Date() }, ...comments]);
    setComment(""); // 입력 필드 초기화
    setRating(null); // ⭐ 별점 초기화
  };

  const getPaginatedComments = () => {
    const startIndex = currentPage * commentsPerPage;
    const endIndex = startIndex + commentsPerPage;
    return comments.slice(startIndex, endIndex);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
              {tourSpotDetail.nearSpots.content.length > 0 && (
                <div className="nearby-travelspot">
                  {tourSpotDetail.nearSpots.content.map((spot) => {
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
                              {spot.avgRating}점
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

        <CommentBox>
          <div className="commentCount">댓글 수 {comments.length}</div>
          <div className="commentInput">
            <InputBox
              placeholder="댓글을 입력하세요..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
            />
            <StyledWrapper>
              <div className="rating">
                {[5, 4, 3, 2, 1].map((value) => (
                  <React.Fragment key={value}>
                    <input
                      type="radio"
                      id={`star${value}`}
                      name="rating"
                      value={value}
                      checked={rating === value}
                      onChange={() => setRating(value)}
                    />
                    <label htmlFor={`star${value}`} />
                  </React.Fragment>
                ))}
              </div>
            </StyledWrapper>
            <Button onClick={handleAddComment}> 등록</Button>
          </div>

          {getPaginatedComments().map((c, index) => (
            <div key={index}>
              <div className="commentList">
                <p className="comment">{c.text}</p>
                <div className="commentInfo">
                  <p className="date">{c.date.toLocaleString()}</p>
                  <p className="rate">
                    <GoStarFill style={{ color: "#FFD700" }} /> {c.rating}점
                  </p>
                </div>
              </div>
            </div>
          ))}
          {comments.length > commentsPerPage && (
            <Paginating
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          )}
        </CommentBox>
        {needLoginModal && (
          <CheckModal
            isOpen={needLoginModal}
            onClose={() => setNeedLoginModal(false)}
          >
            <p>로그인이 필요한 서비스입니다.</p>
          </CheckModal>
        )}
      </TourItemInfoBox>
    </>
  );
};
