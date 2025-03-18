import { useEffect, useState } from "react";
import { ItemApi } from "../../api/ItemApi";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ReviewPageResponse } from "../../types/CommonTypes";
import { MyReviewContainer } from "../../style/MypageComponentStyled";
import { Loading } from "../../component/Loading";
import { Modal } from "../../component/ModalComponent";
import { Paginating } from "../../component/PaginationComponent";
import { GoStarFill } from "react-icons/go";
import { useLocation, useNavigate } from "react-router-dom";

export const MyReview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = useSelector((state: RootState) => state.auth);
  const [reviews, setReviews] = useState<ReviewPageResponse>();
  const [filters, setFilters] = useState(() => {
    const queryParams = new URLSearchParams(location.search);
    return {
      page: parseInt(queryParams.get("page") || "0", 10),
      size: parseInt(queryParams.get("size") || "10", 10),
    };
  });
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [selectedReviewId, setSelectedReviewId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const fetchReviews = async (page: number) => {
    setLoading(true);
    const params = {
      size: 10,
      page: page,
      userId: userId as string,
    };
    const data = await ItemApi.myReviewList(params);
    console.log(data);
    setReviews(data);
    setTotalPages(data.totalPages);
    setLoading(false);
  };
  const deleteReview = async (id: number) => {
    setLoading(true);
    await ItemApi.deleteReview(id);
    setReviews((prevReviews) => {
      if (!prevReviews) return prevReviews;
      const updatedReviews = prevReviews?.content.map((review) =>
        review.id === id
          ? { ...review, content: "해당 댓글은 삭제되었습니다." }
          : review
      );
      return { ...prevReviews, content: updatedReviews };
    });
    setLoading(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setFilters((prev) => ({ ...prev, page }));
    const queryParams = new URLSearchParams();
    queryParams.set("menu", "내 정보");
    queryParams.set("page", page.toString());
    queryParams.set("size", filters.size.toString());
    navigate(`?${queryParams.toString()}`, { replace: true });
  };

  useEffect(() => {
    fetchReviews(currentPage);
  }, [currentPage]);
  return (
    <MyReviewContainer>
      {reviews?.content.length === 0 ? (
        <p>작성한 리뷰가 없습니다.</p>
      ) : (
        reviews?.content.map((review) => (
          <div key={review.id}>
            <div className="review-item">
              <div className="review-info">
                {review.content !== "해당 댓글은 삭제되었습니다." && (
                  <button
                    onClick={() => {
                      setSelectedReviewId(review.id);
                      setDeleteModal(true);
                    }}
                  >
                    삭제
                  </button>
                )}
                <span
                  className="spot-title"
                  onClick={() => navigate(`/tourspot/${review.tourspotId}`)}
                >
                  {review.tourspotTitle}
                </span>
                <span className="review-rating">
                  <GoStarFill
                    style={{ color: "#FFD700", margin: "0 3px 0 5px" }}
                  />
                  {review.rating}
                </span>
              </div>
              <p
                className="review-content"
                onClick={() => navigate(`/tourspot/${review.id}`)}
              >
                {review.content}
              </p>
              <p
                className="review-date"
                onClick={() => navigate(`/tourspot/${review.id}`)}
              >
                {review.createdAt.slice(0, 10).replaceAll("-", ". ")}
              </p>
            </div>
            <hr />
          </div>
        ))
      )}
      {loading && (
        <Loading istransparent={"true"}>
          <p></p>
        </Loading>
      )}
      {deleteModal && (
        <Modal
          isOpen={deleteModal}
          onClose={() => setDeleteModal(false)}
          onConfirm={() => {
            deleteReview(selectedReviewId as number);
            setDeleteModal(false);
            setSelectedReviewId(null);
          }}
        >
          <p>댓글을 삭제하시겠습니까?</p>
        </Modal>
      )}
      <Paginating
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </MyReviewContainer>
  );
};
