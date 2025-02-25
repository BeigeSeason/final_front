import { useLocation } from "react-router-dom";

export const SearchPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("searchQuery");

  return (
    <div>
      <h1>검색 결과</h1>
      <p>검색어: {query}</p>
    </div>
  );
};
