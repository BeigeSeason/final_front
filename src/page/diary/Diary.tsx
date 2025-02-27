import { useParams } from "react-router-dom";

const Diary = () => {
  const { diaryId } = useParams();
  return (
    <>
      <div>다이어리 페이지입니다.</div>
    </>
  );
};

export default Diary;
