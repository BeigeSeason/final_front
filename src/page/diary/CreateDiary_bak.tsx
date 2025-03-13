import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import ReactQuill from "react-quill-new";
import "react-quill/dist/quill.snow.css";
import { v4 as uuidv4 } from "uuid";
import { modules, formats } from "./ReactQuillModule";
import { areas } from "../../util/TourCodes";
import { SelectBox, InputBox } from "../../component/InputComponent";
import { Button } from "../../component/ButtonComponent";
import { Upload } from "../../component/FirebaseComponent";
import { Loading } from "../../component/Loading";
import { TipTap } from "./TipTap";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  CreateDiaryContainer,
  TourInfoContainer,
  StyledWrapper,
  TourContentContainer,
} from "../../style/CreateDiaryStyled";
import React, { useEffect, useState } from "react";
import { DiaryApi } from "../../api/DiaryApi";
import { useNavigate } from "react-router-dom";
import { FaCalendar } from "react-icons/fa";

const CreateDiary = () => {
  const { userId, refreshToken } = useSelector(
    (state: RootState) => state.auth
  );
  const diaryId = uuidv4();
  const navigate = useNavigate();
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedSubArea, setSelectedSubArea] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [inputTag, setInputTag] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [travelCost, setTravelCost] = useState<number | null>(null);
  const [title, setTitle] = useState<string>("");
  const [isPublic, setIsPublic] = useState(true);
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const maxBytes = 5000000; // 5MB

  const isFormValid =
    selectedArea &&
    selectedSubArea &&
    startDate &&
    title &&
    title.trim().length > 0 &&
    content &&
    content.trim().replace(/<[^>]*>/g, "").length > 0;

  // 지역 선택
  const handleAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedArea(e.target.value);
    setSelectedSubArea(null);
  };
  const selectedAreaData = areas.find((area) => area.name === selectedArea);

  // DatePicker
  const onChangeDatepicker = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  const formatDate = (date: Date | null) => {
    if (date) {
      const koreaTime = new Date(date.getTime() + 9 * 60 * 60 * 1000); // 9시간 추가
      const formattedDate = koreaTime.toISOString();
      return formattedDate;
    } else {
      return;
    }
  };

  // Tag
  const handleInputTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const specialChars = /[^a-zA-Z0-9_ ]/;
    if (specialChars.test(e.key)) {
      e.preventDefault();
    }

    if (e.key === "Enter" || e.key === " ") {
      if (inputTag.trim() === "") return;

      const formattedTag = `#${inputTag.trim()}`;

      setTags((prevTags) => [...prevTags, formattedTag]);
      setInputTag("");
    }
  };
  const handleInputTagOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 10) {
      setInputTag(e.target.value);
    }
  };
  const handleDeleteTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index)); // 선택된 태그 삭제
  };

  // 여행 경비
  const formatTravelCost = (value: number | null) => {
    if (value === null) return "";
    return value.toLocaleString();
  };
  const handleTravelCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, "");
    const numericValue = Number(value);
    if (isNaN(numericValue) || numericValue === 0) {
      setTravelCost(null);
    } else {
      setTravelCost(numericValue);
    }
  };
  const handleTravelCostKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const allowedKeys = [
      "Backspace",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Tab",
    ];
    if (!/^[0-9]$/.test(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  // 제목
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 제목 길이가 40자 이하일 때만 상태 업데이트
    if (e.target.value.length <= 40) {
      setTitle(e.target.value);
    }
  };

  // 작성 내용
  // base64 이미지 추출 함수
  const extractBase64Images = (htmlContent: string): string[] => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const images = Array.from(doc.getElementsByTagName("img"));
    return images
      .map((img) => img.src)
      .filter((src) => src.startsWith("data:image/")); // base64 데이터만 필터링
  };

  // 작성 완료 버튼 클릭 시 실행되는 함수
  const handleSubmit = async () => {
    console.log("이거이거 : ", isPublic);
    setLoading(true);
    // 1. content에서 base64 이미지 추출
    const base64Images = extractBase64Images(content);
    if (base64Images.length === 0) {
      console.log("업로드할 이미지가 없습니다.");
      // 이미지가 없으면 바로 제출 로직 실행 (필요 시)
      const diaryData = {
        diaryId: diaryId,
        title: title,
        region: selectedArea + " " + selectedSubArea,
        startDate: formatDate(startDate) ?? null,
        endDate: formatDate(endDate ?? startDate) ?? null,
        tags: tags,
        totalCost: travelCost || 0,
        content: content,
        userId: userId as string,
        isPublic: isPublic,
      };
      console.log(diaryData);
      const isDiarySaved = await DiaryApi.postDiary(diaryData);
      setLoading(false);
      if (isDiarySaved) {
        navigate(`/diary/${diaryId}`);
      } else {
        console.log("다이어리 생성 중 에러");
      }
      setLoading(false);
      return;
    }

    // 2. Firebase에 이미지 업로드
    const uploadParams = {
      pics: base64Images, // base64 데이터 배열
      type: "diary" as const, // 타입 설정 (필요에 따라 수정)
      userId: userId, // 실제 userId로 교체
      diaryId: diaryId, // 예시 diaryId, 실제 값으로 교체
    };

    const uploadedUrls = await Upload(uploadParams);
    if (!uploadedUrls) {
      console.log("이미지 업로드 실패");
      setLoading(false);
      return;
    }

    // 3. base64를 Firebase URL로 교체
    let updatedContent = content;
    base64Images.forEach((base64, index) => {
      updatedContent = updatedContent.replace(base64, uploadedUrls[index]);
    });

    // 4. 상태 업데이트
    setContent(updatedContent);
    // console.log("업로드 및 URL 교체 완료:", updatedContent);

    // 5. 이후 제출 로직 추가 (예: 서버에 저장 등)
    const diaryData = {
      diaryId: diaryId,
      title: title,
      region: selectedArea + " " + selectedSubArea,
      startDate: formatDate(startDate) ?? null,
      endDate: formatDate(endDate ?? startDate) ?? null,
      tags: tags,
      totalCost: travelCost || 0,
      content: updatedContent,
      userId: userId as string,
      isPublic: isPublic,
    };
    console.log(diaryData);
    console.log("이미지 넣은 content : ", updatedContent);
    const isDiarySaved = await DiaryApi.postDiary(diaryData);
    setLoading(false);
    if (isDiarySaved) {
      navigate(`/diary/${diaryId}`);
    } else {
      console.log("다이어리 생성 중 에러");
    }
  };

  useEffect(() => {
    if (startDate) {
      const koreaTime = new Date(startDate.getTime() + 9 * 60 * 60 * 1000); // 9시간 추가
      const formattedDate = koreaTime.toISOString();
      console.log(formattedDate);
    }
  }, [startDate]);

  return (
    <>
      <CreateDiaryContainer>
        <TourInfoContainer>
          <div className="select-container title-container">
            <InputBox
              className="title"
              placeholder="제목 입력"
              value={title}
              onChange={handleTitleChange}
            />
            <span className="word-count">{title.length}/40</span>
            <StyledWrapper>
              <div className="toggle">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={!isPublic}
                    onChange={(e) => setIsPublic(!e.target.checked)}
                  />
                  <span>
                    <em />
                    <strong />
                  </span>
                </label>
              </div>
            </StyledWrapper>
          </div>
          <div className="select-container">
            <SelectBox
              className="selectOption"
              value={selectedArea ?? ""}
              onChange={handleAreaChange}
            >
              <option value="">지역 선택</option>
              {areas.map((area) => (
                <option key={area.name} value={area.name}>
                  {area.name}
                </option>
              ))}
            </SelectBox>
            <SelectBox
              className="selectOption"
              value={selectedSubArea ?? ""}
              onChange={(e) => setSelectedSubArea(e.target.value)}
            >
              <option value="">세부 지역 선택</option>
              {selectedArea &&
                selectedAreaData?.subAreas.map((subArea) => (
                  <option key={subArea.code} value={subArea.name}>
                    {subArea.name}
                  </option>
                ))}
            </SelectBox>
          </div>
          <div className="select-container">
            <DatePicker
              className="datepicker"
              locale={ko}
              dateFormat="yy.MM.dd"
              dateFormatCalendar="yyyy년 MM월"
              placeholderText="일정 선택"
              selected={startDate}
              onChange={onChangeDatepicker}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              onFocus={(e) => e.target.blur()}
            />
            <FaCalendar
              style={{
                marginLeft: "-30px",
                marginRight: "30px",
                color: "gray",
                zIndex: "-1",
              }}
            />
          </div>

          <div className="select-container">
            <InputBox
              className="selectOption"
              placeholder="여행 총 경비"
              value={formatTravelCost(travelCost)}
              onChange={handleTravelCostChange}
              onKeyDown={handleTravelCostKeyDown}
            />
            원
          </div>
          <div className="select-container">
            <InputBox
              className="selectOption"
              value={inputTag}
              onChange={handleInputTagOnChange}
              onKeyDown={handleInputTagKeyDown}
              placeholder="태그 추가하기"
            />
          </div>
          <div>
            <div className="tags-container">
              {tags.length > 0 ? (
                tags.map((tag, index) => (
                  <span key={index} className="tag-box">
                    {tag}
                    <button
                      className="tag-delete"
                      onClick={() => handleDeleteTag(index)}
                    >
                      X
                    </button>
                  </span>
                ))
              ) : (
                <p className="tagInfo">enter로 태그를 추가해 주세요</p>
              )}
            </div>
          </div>
        </TourInfoContainer>
        <TourContentContainer>
          {/* <TipTap /> */}
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={content}
            onChange={setContent}
          />
          <div className="diaryLast">
            <p>
              현재 내용 길이: {new TextEncoder().encode(content).length} bytes
            </p>
            <Button
              className="submit-button"
              disabled={!isFormValid}
              onClick={handleSubmit}
            >
              게시하기
            </Button>
          </div>
        </TourContentContainer>
      </CreateDiaryContainer>
      {loading && (
        <Loading>
          <p>여행일지를 업로드 중입니다.</p>
        </Loading>
      )}
    </>
  );
};

export default CreateDiary;
