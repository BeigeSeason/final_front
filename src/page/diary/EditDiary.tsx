import { useNavigate, useParams } from "react-router-dom";
import { DiaryApi, DiaryInfo, DiaryData } from "../../api/DiaryApi";
import { useEffect, useState } from "react";
import { DiaryForm } from "./DiaryForm";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Upload } from "../../component/FirebaseComponent";

const mapDiaryInfoToDiaryData = (
  info: DiaryInfo,
  userId: string
): DiaryData => ({
  diaryId: info.diaryId,
  title: info.title,
  region: info.region,
  startDate: info.startDate,
  endDate: info.endDate,
  tags: info.tags,
  totalCost: info.totalCost,
  content: info.content,
  userId, // EditDiary에서 제공
  isPublic: info.public, // DiaryInfo의 public을 isPublic으로 매핑
});

const EditDiary = () => {
  const navigate = useNavigate();
  const { userId } = useSelector((state: RootState) => state.auth);
  const { diaryId } = useParams<{ diaryId: string }>();
  const [initialData, setInitialData] = useState<DiaryData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchDiary = async (diaryId?: string) => {
      try {
        if (diaryId && userId) {
          const diary = await DiaryApi.diaryDetail(diaryId);
          const mappedData = mapDiaryInfoToDiaryData(diary, userId);
          setInitialData(mappedData);
        }
      } catch (error) {
        console.error("다이어리 조회 실패:", error);
      }
    };
    fetchDiary(diaryId);
  }, [userId]);

  const extractBase64Images = (htmlContent: string): string[] => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const images = Array.from(doc.getElementsByTagName("img"));
    return images
      .map((img) => img.src)
      .filter((src) => src.startsWith("data:image/"));
  };

  const handleSubmit = async (data: DiaryData) => {
    setLoading(true);
    if (!userId) {
      console.error("사용자 ID가 없습니다.");
      setLoading(false);
      alert("로그인이 필요합니다.");
      return;
    }

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
        alert("이미지 업로드에 실패했습니다.");
        return;
      }
      base64Images.forEach((base64, index) => {
        updatedContent = updatedContent.replace(base64, uploadedUrls[index]);
      });
    }

    const diaryData = { ...data, content: updatedContent, userId };
    const isDiaryUpdated = await DiaryApi.postDiary(diaryData); // 수정 API가 필요하면 별도로 추가
    setLoading(false);
    if (isDiaryUpdated) navigate(`/diary/${data.diaryId}`);
    else {
      console.log("다이어리 수정 중 에러");
      alert("다이어리 수정에 실패했습니다.");
    }
  };

  return (
    <DiaryForm mode="edit" initialData={initialData} onSubmit={handleSubmit} />
  );
};

export default EditDiary;
