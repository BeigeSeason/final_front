import React from "react";

const MyDiary = React.memo(() => {
  console.log("나의 여행일지 렌더링됨");
  return (
    <>
      <div>나의 여행일지 페이지입니다.</div>
    </>
  );
});

export default MyDiary;
