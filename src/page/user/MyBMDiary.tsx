import React from "react";

const MyBMDiary = React.memo(() => {
  console.log("북마크 여행일지 렌더링됨");
  return (
    <>
      <div>북마크 여행일지 페이지입니다.</div>
    </>
  );
});

export default MyBMDiary;
