import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../component/ButtonComponent";

export const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const query = params.get("searchQuery");

  const handleTourMoreClick = () => {
    navigate(`/tourlist?searchQuery=${query}&pageSize=10`);
  };
  const handleDiaryMoreClick = () => {
    navigate(`/diarylist?searchQuery=${query}&pageSize=10`);
  };

  return (
    <div>
      <h1>검색 결과</h1>
      <p>검색어: {query}</p>
      <Button onClick={handleTourMoreClick}> 관광지 더보기</Button>
      <Button onClick={handleDiaryMoreClick}> 여행일기 더보기</Button>
    </div>
  );
};
