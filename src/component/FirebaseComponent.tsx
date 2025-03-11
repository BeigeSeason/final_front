import { storage } from "../api/Firebase";

interface UploadParams {
  pics: string[] | null;
  type: "profile" | "diary";
  userId: string | null;
  diaryId: string | null;
}
interface DeleteFolderParams {
  type: "profile" | "diary" | "all";
  userId: string | null;
  diaryId?: string;
}

export const Upload = async ({
  pics,
  type,
  userId,
  diaryId,
}: UploadParams): Promise<string[] | null> => {
  const imgFolder =
    type === "profile"
      ? `/UserProfilePic/${userId}`
      : `/DiaryPic/${userId}/${diaryId}`;

  const uploadedUrls: string[] = [];
  // currentPics가 없거나 빈 경우
  if (!pics || (Array.isArray(pics) && pics.length === 0)) {
    return null;
  }

  // 단일 이미지를 배열로 변환 (편의성)
  const picsArray = Array.isArray(pics) ? pics : [pics];

  try {
    // 모든 이미지 업로드를 병렬로 처리
    const uploadPromises = picsArray.map(async (pic, index) => {
      // if (pic && pic.startsWith("blob:")) {
      if (pic.startsWith("data:image/") || pic.startsWith("blob")) {
        // Blob URL을 실제 Blob으로 변환
        const response = await fetch(pic);
        const blob = await response.blob();

        // 파일 이름 생성: 0.png, 1.png, ...
        const imgName = type === "profile" ? "profile.png" : `${index}.png`;

        // Firebase Storage 참조
        const storageRef = storage.ref(`${imgFolder}`);
        const fileRef = storageRef.child(imgName);

        // 파일 업로드
        await fileRef.put(blob);

        // 업로드된 파일의 다운로드 URL 가져오기
        const downloadUrl = await fileRef.getDownloadURL();
        // uploadedUrls.push(downloadUrl);
        uploadedUrls[index] = downloadUrl;
      } else {
        // base64가 아닌 경우 (기존 URL 등)
        uploadedUrls[index] = pic;
      }
    });

    // 모든 업로드가 완료될 때까지 기다림
    await Promise.all(uploadPromises);

    return uploadedUrls;
  } catch (error) {
    console.error("이미지 업로드 실패:", error);
    return null;
  }
};

export const DeleteFolder = async ({
  type,
  userId,
  diaryId,
}: DeleteFolderParams) => {
  try {
    if (type === "all") {
      // 프로필 사진 폴더 삭제
      const profileFolderRef = storage.ref(`/UserProfilePic/${userId}`);
      const profileFileList = await profileFolderRef.listAll();
      const profileDeletePromises = profileFileList.items.map((file) =>
        file.delete()
      );
      await Promise.all(profileDeletePromises);

      // DiaryPic 하위 모든 폴더와 파일 삭제
      const diaryRootRef = storage.ref(`/DiaryPic/${userId}`);
      const diaryFolderList = await diaryRootRef.listAll();

      // 하위 폴더들 순회
      const folderDeletePromises = diaryFolderList.prefixes.map(
        async (folderRef) => {
          const fileList = await folderRef.listAll();
          const fileDeletePromises = fileList.items.map((file) =>
            file.delete()
          );
          return Promise.all(fileDeletePromises);
        }
      );

      await Promise.all(folderDeletePromises);
      return true;
    } else {
      // type이 "profile" 또는 "diary"일 경우
      const folderPath =
        type === "profile"
          ? `/UserProfilePic/${userId}`
          : `/DiaryPic/${userId}/${diaryId}`;

      const folderRef = storage.ref(folderPath);
      const fileList = await folderRef.listAll();
      const deletePromises = fileList.items.map((file) => file.delete());
      await Promise.all(deletePromises);

      return true;
    }
  } catch (error) {
    console.error("폴더 삭제 실패:", error);
    return false;
  }
};
