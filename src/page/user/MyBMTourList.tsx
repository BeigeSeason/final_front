import React from "react";

const MyBMTourList = React.memo(() => {
  console.log("북마크 관광지 렌더링됨");
  return (
    <>
      <div>북마크 관광지 페이지입니다.</div>
    </>
  );
});

export default MyBMTourList;
