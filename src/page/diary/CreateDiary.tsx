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

  // // 작성 완료 버튼 클릭 시 실행되는 함수
  //   const handleSubmit = async () => {
  //     setLoading(true);
  //     // 1. content에서 base64 이미지 추출
  //     const base64Images = extractBase64Images(content);
  //     if (base64Images.length === 0) {
  //       console.log("업로드할 이미지가 없습니다.");
  //       // 이미지가 없으면 바로 제출 로직 실행 (필요 시)
  //       const diaryData = {
  //         diaryId: diaryId,
  //         title: title,
  //         region: selectedArea + " " + selectedSubArea,
  //         startDate: formatDate(startDate) ?? null,
  //         endDate: formatDate(endDate ?? startDate) ?? null,
  //         tags: tags,
  //         totalCost: travelCost || 0,
  //         content: content,
  //         userId: userId as string,
  //         isPublic: isPublic,
  //       };
  //       console.log(diaryData);
  //       const isDiarySaved = await DiaryApi.postDiary(diaryData);
  //       setLoading(false);
  //       if (isDiarySaved) {
  //         navigate(`/diary/${diaryId}`);
  //       } else {
  //         console.log("다이어리 생성 중 에러");
  //       }
  //       setLoading(false);
  //       return;
  //     }

  //     // 2. Firebase에 이미지 업로드
  //     const uploadParams = {
  //       pics: base64Images, // base64 데이터 배열
  //       type: "diary" as const, // 타입 설정 (필요에 따라 수정)
  //       userId: userId, // 실제 userId로 교체
  //       diaryId: diaryId, // 예시 diaryId, 실제 값으로 교체
  //     };

  //     const uploadedUrls = await Upload(uploadParams);
  //     if (!uploadedUrls) {
  //       console.log("이미지 업로드 실패");
  //       setLoading(false);
  //       return;
  //     }

  //     // 3. base64를 Firebase URL로 교체
  //     let updatedContent = content;
  //     base64Images.forEach((base64, index) => {
  //       updatedContent = updatedContent.replace(base64, uploadedUrls[index]);
  //     });

  //     // 4. 상태 업데이트
  //     setContent(updatedContent);
  //     // console.log("업로드 및 URL 교체 완료:", updatedContent);

  //     // 5. 이후 제출 로직 추가 (예: 서버에 저장 등)
  //     const diaryData = {
  //       diaryId: diaryId,
  //       title: title,
  //       region: selectedArea + " " + selectedSubArea,
  //       startDate: formatDate(startDate) ?? null,
  //       endDate: formatDate(endDate ?? startDate) ?? null,
  //       tags: tags,
  //       totalCost: travelCost || 0,
  //       content: updatedContent,
  //       userId: userId as string,
  //       isPublic: isPublic,
  //     };
  //     console.log(diaryData);
  //     console.log("이미지 넣은 content : ", updatedContent);
  //     const isDiarySaved = await DiaryApi.postDiary(diaryData);
  //     setLoading(false);
  //     if (isDiarySaved) {
  //       navigate(`/diary/${diaryId}`);
  //     } else {
  //       console.log("다이어리 생성 중 에러");
  //     }
  //   };

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
