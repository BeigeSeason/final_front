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
import { DiaryData, EditDiaryData } from "../../types/DiaryTypes";
import { useNavigate } from "react-router-dom";
import { FaCalendar } from "react-icons/fa";

interface DiaryFormProps {
  mode: "create" | "edit";
  initialData?: EditDiaryData | null;
  onSubmit: (data: DiaryData) => Promise<void>;
}

export const DiaryForm = ({ mode, initialData, onSubmit }: DiaryFormProps) => {
  const navigate = useNavigate();
  const { userId } = useSelector((state: RootState) => state.auth);
  const diaryId = initialData?.diaryId || uuidv4();
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

  useEffect(() => {
    if (initialData && userId === initialData.ownerId) {
      console.log(initialData);
      const [area, subArea] = initialData.region.split(" ");
      setSelectedArea(area);
      setSelectedSubArea(subArea);
      setStartDate(
        initialData.startDate ? new Date(initialData.startDate) : null
      );
      setEndDate(initialData.endDate ? new Date(initialData.endDate) : null);
      setTags(initialData.tags);
      setTravelCost(initialData.totalCost || null);
      setTitle(initialData.title);
      setIsPublic(initialData.isPublic);
      setContent(initialData.content);
    } else if (initialData && userId !== initialData.ownerId) {
      navigate("/creatediary");
    }
  }, [initialData]);

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
      return null;
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

      setTags((prevTags) => {
        if (prevTags.length >= 10) {
          return prevTags; // 10개 이상이면 추가 안 함
        }
        if (prevTags.includes(formattedTag)) {
          return prevTags;
        }
        return [...prevTags, formattedTag];
      });
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
    if (value !== "" && Number(value) >= 1_000_000_000) return; // 10억 이상 입력 방지
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
    const value = e.target.value;
    // `#`이 포함되지 않고, 길이가 40자 이하일 때만 상태 업데이트
    if (!value.includes("#") && value.length <= 40) {
      setTitle(value);
    }
  };

  const handleFormSubmit = () => {
    const convertAreaName = (area: string) => {
      switch (area) {
        case "충북":
          return "충청북도";
        case "충남":
          return "충청남도";
        case "전북":
          return "전라북도";
        case "전남":
          return "전라남도";
        case "경북":
          return "경상북도";
        case "경남":
          return "경상남도";
        default:
          return area;
      }
    };
    const diaryData: DiaryData = {
      diaryId,
      title,
      region: `${convertAreaName(selectedArea as string)} ${selectedSubArea}`,
      areaCode: areas.find((area) => area.name === selectedArea)?.code,
      sigunguCode: areas
        .find((area) => area.name === selectedArea)
        ?.subAreas.find((subArea) => subArea.name === selectedSubArea)?.code,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate ?? startDate),
      tags,
      totalCost: travelCost || 0,
      content,
      userId: userId ?? "",
      isPublic,
    };
    onSubmit(diaryData);
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
              placeholder="태그 입력(10자 이하, 10개 이하)"
              disabled={tags.length >= 10}
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
                <p className="tagInfo">추가된 태그 목록</p>
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
            <p></p>
            {/* <p>
              현재 내용 길이: {new TextEncoder().encode(content).length} bytes
            </p> */}
            <Button
              className="submit-button"
              disabled={!isFormValid}
              onClick={handleFormSubmit}
            >
              {mode === "create" ? "게시하기" : "수정하기"}
            </Button>
          </div>
        </TourContentContainer>
      </CreateDiaryContainer>
    </>
  );
};
