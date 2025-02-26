import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import ReactQuill from "react-quill-new";
import "react-quill/dist/quill.snow.css";
import { modules, formats } from "./ReactQuillModule";
import { areas } from "../../util/TourCodes";
import { SelectBox, InputBox } from "../../component/InputComponent";
import { Button } from "../../component/ButtonComponent";
import { TipTap } from "./TipTap";
import {
  CreateDiaryContainer,
  TourInfoContainer,
  StyledWrapper,
  TourContentContainer,
} from "../../style/CreateDiaryStyled";
import React, { useState } from "react";

const CreateDiary = () => {
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

  // Tag
  const handleInputTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const specialChars = /[^a-zA-Z0-9_ ]/;
    if (specialChars.test(e.key)) {
      e.preventDefault();
    }

    if (e.key === "Enter" || e.key === " ") {
      if (inputTag.trim() === "") return;

      setTags((prevTags) => [...prevTags, inputTag.trim()]);
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
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     Quill.register("modules/imageCompress", QuillImageCompress);
  //   }
  // }, []);

  return (
    <CreateDiaryContainer>
      <TourInfoContainer>
        <Button className="submit-button" disabled={!isFormValid}>
          작성 완료
        </Button>
        <div className="select-container">
          <SelectBox
            value={selectedArea ?? ""}
            onChange={handleAreaChange}
            width="250px"
          >
            <option value="">지역 선택</option>
            {areas.map((area) => (
              <option key={area.name} value={area.name}>
                {area.name}
              </option>
            ))}
          </SelectBox>
          <SelectBox
            value={selectedSubArea ?? ""}
            onChange={(e) => setSelectedSubArea(e.target.value)}
            width="250px"
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
        </div>
        <div className="select-container">
          <InputBox
            value={inputTag}
            onChange={handleInputTagOnChange}
            onKeyDown={handleInputTagKeyDown}
            placeholder="추가할 태그를 입력해주세요."
            padding="8px 12px"
            width="250px"
          />
          <div className="tags-container">
            {tags.map((tag, index) => (
              <span key={index} className="tag-box">
                {tag}
                <button
                  className="tag-delete"
                  onClick={() => handleDeleteTag(index)}
                >
                  X
                </button>
              </span>
            ))}
          </div>
        </div>
        <div className="select-container">
          <InputBox
            placeholder="여행 총 경비"
            value={formatTravelCost(travelCost)}
            onChange={handleTravelCostChange}
            onKeyDown={handleTravelCostKeyDown}
            width="250px"
            padding="8px 12px"
          />
        </div>
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
        <div>
          현재 내용 길이: {new TextEncoder().encode(content).length} bytes
        </div>
      </TourContentContainer>
    </CreateDiaryContainer>
  );
};

export default CreateDiary;
