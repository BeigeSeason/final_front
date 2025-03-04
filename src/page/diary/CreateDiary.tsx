import { useState } from "react";
import { DiaryForm } from "./DiaryForm";
import { Loading } from "../../component/Loading";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { DiaryApi } from "../../api/DiaryApi";
import { Upload } from "../../component/FirebaseComponent";

const CreateDiary = () => {
  const navigate = useNavigate();
  const { userId } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState<boolean>(false);

  const extractBase64Images = (htmlContent: string): string[] => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const images = Array.from(doc.getElementsByTagName("img"));
    return images
      .map((img) => img.src)
      .filter((src) => src.startsWith("data:image/")); // base64 데이터만 필터링
  };

  const handleSubmit = async (data: {
    diaryId: string;
    title: string;
    region: string;
    startDate: string | null;
    endDate: string | null;
    tags: string[];
    totalCost: number;
    content: string;
    isPublic: boolean;
  }) => {
    if (!userId) {
      console.error("사용자 ID가 없습니다. 로그인이 필요합니다.");
      setLoading(false);
      alert("로그인이 필요합니다.");
      return;
    }
    setLoading(true);
    const base64Images = extractBase64Images(data.content);

    let updatedContent = data.content;
    if (base64Images.length > 0) {
      const uploadParams = {
        pics: base64Images,
        type: "diary" as const,
        userId,
        diaryId: data.diaryId,
      };
      const uploadedUrls = await Upload(uploadParams);
      if (!uploadedUrls) {
        console.log("이미지 업로드 실패");
        setLoading(false);
        return;
      }
      base64Images.forEach((base64, index) => {
        updatedContent = updatedContent.replace(base64, uploadedUrls[index]);
      });
    }

    const diaryData = { ...data, content: updatedContent, userId };
    const isDiarySaved = await DiaryApi.postDiary(diaryData);
    setLoading(false);
    if (isDiarySaved) navigate(`/diary/${data.diaryId}`);
    else console.log("다이어리 생성 중 에러");
  };

  return (
    <>
      <DiaryForm mode="create" onSubmit={handleSubmit} />
      {loading && (
        <Loading>
          <p>여행일지를 업로드 중입니다.</p>
        </Loading>
      )}
    </>
  );
};

export default CreateDiary;
