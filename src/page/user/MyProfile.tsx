import React from "react";

const MyProfile = React.memo(() => {
  console.log("내 정보 렌더링됨");
  return (
    <>
      <div>내 정보 페이지입니다.</div>
    </>
  );
});

export default MyProfile;
