import { useEffect } from "react";

const Test = () => {
  const data = localStorage.getItem("accessToken");
  useEffect(() => {
    const data = localStorage.getItem("accessToken");
    console.log(data);
  }, []);

  return (
    <>
      <div>accessToken : {data}</div>
    </>
  );
};

export default Test;
