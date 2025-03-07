import { useNavigate, useParams } from "react-router-dom";
import { DiaryApi } from "../../api/DiaryApi";
import { DiaryData, DiaryInfo, EditDiaryData } from "../../types/DiaryTypes";
import { useEffect, useState } from "react";
import { DiaryForm } from "./DiaryForm";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Upload } from "../../component/FirebaseComponent";
import { Loading } from "../../component/Loading";

const mapDiaryInfoToDiaryData = (
  info: DiaryInfo,
  userId: string
): EditDiaryData => ({
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
  ownerId: info.ownerId,
});

const EditDiary = () => {
  const navigate = useNavigate();
  const { userId } = useSelector((state: RootState) => state.auth);
  const { diaryId } = useParams<{ diaryId: string }>();
  const [initialData, setInitialData] = useState<EditDiaryData | null>(null);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const urlToBase64 = async (url: string): Promise<string> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };
  const convertContentImagesToBase64 = async (
    content: string
  ): Promise<string> => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const images = Array.from(doc.getElementsByTagName("img"));

    let updatedContent = content;
    for (const img of images) {
      const url = img.src;
      if (!url.startsWith("data:image/")) {
        // base64가 아닌 경우만 변환
        const base64 = await urlToBase64(url);
        updatedContent = updatedContent.replace(url, base64);
      }
    }
    return updatedContent;
  };
  const extractBase64Images = (htmlContent: string): string[] => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const images = Array.from(doc.getElementsByTagName("img"));
    return images
      .map((img) => img.src)
      .filter((src) => src.startsWith("data:image/"));
  };

  useEffect(() => {
    const fetchDiary = async (diaryId?: string) => {
      console.log(diaryId);
      console.log(userId);
      try {
        if (diaryId && userId) {
          const diary = await DiaryApi.diaryDetail(diaryId);
          const updatedContent = await convertContentImagesToBase64(
            diary.content
          );
          const mappedData = mapDiaryInfoToDiaryData(
            { ...diary, content: updatedContent },
            userId
          );
          setInitialData(mappedData);
          setInitialLoading(false);
        }
      } catch (error) {
        console.error("다이어리 조회 실패:", error);
      }
    };
    fetchDiary(diaryId);
  }, [userId]);

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
    const isDiaryUpdated = await DiaryApi.editDiary(diaryData); // 수정 API가 필요하면 별도로 추가
    setLoading(false);
    if (isDiaryUpdated) navigate(`/diary/${data.diaryId}`);
    else {
      console.log("다이어리 수정 중 에러");
      alert("다이어리 수정에 실패했습니다.");
    }
  };

  return (
    <>
      <DiaryForm
        mode="edit"
        initialData={initialData}
        onSubmit={handleSubmit}
      />
      {initialLoading && (
        <Loading>
          <p>여행일지를 불러오는 중입니다...</p>
        </Loading>
      )}
      {loading && (
        <Loading>
          <p>여행일지를 업로드 중입니다...</p>
        </Loading>
      )}
    </>
  );
};

export default EditDiary;
