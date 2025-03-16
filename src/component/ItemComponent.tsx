import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { colors } from "../style/GlobalStyled";
import { areas, types } from "../util/TourCodes";
import { ServiceCode } from "../util/ServiceCode";
import { useMemo } from "react";
import basicImg from "../img/item/type_200.png";
import { GetProfileImageSrc } from "./ProfileComponent";
import { FaRegCalendarAlt, FaWonSign } from "react-icons/fa";

// 관광지 목록 아이템 컴포넌트 -------------------------------------------------------------------
const SpotContainer = styled(Link)`
  display: flex;
  align-items: center;
  padding: 10px 10px 20px;
  margin: 10px auto 0;
  width: 95%;
  text-decoration: none;
  color: inherit;
  border-bottom: 1px solid #ddd;
`;

const SpotImage = styled.img`
  min-width: 150px;
  min-height: 110px;
  max-width: 150px;
  max-height: 110px;
  margin-right: 10px;
  object-fit: cover;
`;

const SpotDescription = styled.div`
  display: flex;
  flex-direction: column;
  height: 110px;
  justify-content: center;
  width: 100%;
  overflow: hidden;
  .title {
    font-size: 17px;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .addr {
    font-size: 13px;
    color: gray;
  }
  .summary {
    font-size: 13px;
    color: #222;
    margin: 3px 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .writer {
    display: flex;
    align-items: center;
    padding-top: 7px;
    .profile {
      min-width: 40px;
      min-height: 40px;
      max-width: 40px;
      max-height: 40px;
      margin-right: 10px;
      border-radius: 50%;
      overflow: hidden;
      object-fit: cover;
      img {
        width: 40px;
        height: 40px;
      }
    }
    .info {
      p {
        margin: 0;
      }
      .nickname {
        font-size: 13px;
      }
      .date {
        font-size: 10px;
        color: #666;
      }
    }
  }
`;

interface TourItemProps {
  image: string;
  description: React.ReactNode[];
  id: string;
}

export const TourItem: React.FC<TourItemProps> = ({
  image,
  description,
  id,
}) => {
  return (
    <SpotContainer to={`/tourspot/${id}`}>
      <SpotImage src={image || basicImg} alt="관광지 이미지" />{" "}
      <SpotDescription>
        <div className="title">{description[0]}</div>
        <div className="addr">{description[1]}</div>
      </SpotDescription>
    </SpotContainer>
  );
};
// 다이어리 목록 컴포넌트 ------------------------------------------------------------------------
interface DiaryItemProps {
  id?: string; // 다이어리에 고유 ID가 있다면 사용, 없으면 생략 가능
  thumbnail: string | null;
  profile?: string | null;
  description: React.ReactNode[];
}
export const DiaryItem: React.FC<DiaryItemProps> = ({
  id,
  thumbnail,
  profile,
  description,
}) => {
  return (
    <SpotContainer to={`/diary/${id}`}>
      <SpotImage src={thumbnail || basicImg} alt="다이어리 썸네일" />
      <SpotDescription>
        <div className="title">{description[0]}</div>
        <div className="summary">{description[1]}</div>
        {/* <div className="travel-info-container">
          <div className="travel-info">
            <FaRegCalendarAlt />{" "}
            <span>
              {diaryInfo?.startDate?.replaceAll("-", ". ")} ~{" "}
              {diaryInfo?.endDate?.replaceAll("-", ". ")}
            </span>
          </div>
          <div className="travel-info">
            <FaWonSign /> <span>{diaryInfo?.totalCost.toLocaleString()}</span>
          </div>
        </div> */}
        <div className="writer">
          <div className="profile">
            <img src={GetProfileImageSrc(profile ?? null)} alt="프로필" />
          </div>
          <div className="info">
            <p className="nickname">{description[2]}</p>
            <p className="date">{description[3]}.</p>
          </div>
        </div>
      </SpotDescription>
    </SpotContainer>
  );
};
// 관광지 검색 토글 컴포넌트 -------------------------------------------------------------------------------------
interface StyledToggleButtonProps {
  isopen: boolean;
}

const StyledToggleButton = styled.button<StyledToggleButtonProps>`
  background-color: transparent;
  width: 20px !important;
  height: 20px !important;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: ${(props) => (props.isopen ? colors.colorB : "#666")};
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  .icon {
    display: inline-block;
    transform: ${(props) => (props.isopen ? "rotate(180deg)" : "rotate(0deg)")};
    transition: transform 0.3s ease;

    @media (max-width: 768px) {
      font-size: 13px;
    }
  }
`;

interface ToggleButtonProps {
  isopen: boolean;
  onToggle: () => void;
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  isopen,
  onToggle,
}) => {
  return (
    <StyledToggleButton
      isopen={isopen}
      onClick={onToggle}
      className="toggle-button"
    >
      <span className="icon">{isopen ? "▼" : "▼"}</span>
    </StyledToggleButton>
  );
};

const SectionContainer = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 5px 0 10px 5px;
  border-bottom: 1px solid #ddd;
`;

const SectionContent = styled.div<{ isopen: boolean }>`
  overflow: hidden;
  transition: max-height 0.3s linear;
  max-height: ${(props) => (props.isopen ? "500px" : "0")};
`;

interface ToggleSectionProps {
  title: string;
  isopen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export const ToggleSection: React.FC<ToggleSectionProps> = ({
  title,
  isopen,
  onToggle,
  children,
}) => {
  return (
    <SectionContainer>
      <SectionTitle className="title-font">
        {title}
        <ToggleButton isopen={isopen} onToggle={onToggle} />
      </SectionTitle>
      <SectionContent isopen={isopen}>{children}</SectionContent>
    </SectionContainer>
  );
};

// 검색 토글 필터 컴포넌트 ---------------------------------------------------------------------------------------
const TopFilters = styled.div`
  align-self: flex-start;
  margin: 15px 0 10px 0;
  width: 100%;

  .filterList {
    width: 100%;
    display: flex;

    h4 {
      white-space: nowrap;
    }
  }

  .filter-tags {
    width: 100%;
    display: flex;
    gap: 10px;
    align-items: center;
    margin-left: 10px;
    flex-wrap: wrap;
  }

  .filter-tag {
    background-color: #f0f0f0;
    padding: 6px 10px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    white-space: nowrap;
    height: 20px;
  }

  .filter-tag button {
    background: none;
    border: none;
    margin-left: 4px;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    font-size: 13px;

    .filter-tag {
      font-size: 10px;
      padding: 3px 4px;
    }
  }
`;

// 필터 인터페이스 정의
interface SelectFilters {
  areaCode?: string;
  subAreaCode?: string;
  topTheme?: string;
  middleTheme?: string;
  bottomTheme?: string;
  category?: string;
  themeList?: string;
  searchQuery?: string;
  sortBy?: string;
  minPrice?: number;
  maxPrice?: number;
}

// 선택한 필터를 포맷하는 함수
const formatSelectedFilters = (filters: SelectFilters) => {
  const selectedFilters: { key: string; name: string }[] = [];

  if (filters.areaCode) {
    const selectedArea = areas.find((area) => area.code === filters.areaCode);
    if (selectedArea) {
      selectedFilters.push({ key: "areaCode", name: selectedArea.name });
      const selectedSubArea = selectedArea.subAreas.find(
        (subArea) => subArea.code === filters.subAreaCode
      );
      if (selectedSubArea) {
        selectedFilters.push({
          key: "subAreaCode",
          name: selectedSubArea.name,
        });
      }
    }
  }

  if (filters.topTheme) {
    const selectedTopTheme = ServiceCode.find(
      (cat) => cat.cat1 === filters.topTheme
    );
    if (selectedTopTheme) {
      selectedFilters.push({
        key: "topTheme",
        name: selectedTopTheme.cat1Name,
      });
    }
  }

  if (filters.middleTheme) {
    const selectedMiddleTheme = ServiceCode.find(
      (cat) => cat.cat1 === filters.topTheme
    )?.cat2List.find((cat2) => cat2.cat2 === filters.middleTheme);
    if (selectedMiddleTheme) {
      selectedFilters.push({
        key: "middleTheme",
        name: selectedMiddleTheme.cat2Name,
      });
    }
  }

  if (filters.bottomTheme) {
    const selectedBottomThemes = filters.bottomTheme
      .split(",")
      .map((cat3) =>
        ServiceCode.find((cat) => cat.cat1 === filters.topTheme)
          ?.cat2List.find((cat2) => cat2.cat2 === filters.middleTheme)
          ?.cat3List.find((cat3Item) => cat3Item.cat3 === cat3)
      )
      .filter(Boolean)
      .map((cat3) => ({ key: "bottomTheme", name: cat3?.cat3Name || "" }));
    selectedFilters.push(...selectedBottomThemes);
  }

  if (filters.category) {
    const selectedCategory = types.find(
      (type) => type.code === filters.category
    );
    if (selectedCategory) {
      selectedFilters.push({ key: "category", name: selectedCategory.name });
    }
  }

  if (filters.themeList) {
    const selectedThemes = filters.themeList.split(",").map((theme) => ({
      key: "themeList",
      name: theme,
    }));
    selectedFilters.push(...selectedThemes);
  }

  if (filters.searchQuery) {
    selectedFilters.push({
      key: "searchQuery",
      name: `검색어: ${filters.searchQuery}`,
    });
  }

  if (filters.sortBy) {
    const [field, direction] = filters.sortBy.split(",");
    const sortLabels: { [key: string]: string } = {
      "title-asc": "가나다순",
      "title.korean_sorted-asc": "가나다순",
      "rating-desc": "별점 높은 순",
      "rating-asc": "별점 낮은 순",
      "review_count-desc": "리뷰 많은 순",
      "review_count-asc": "리뷰 적은 순",
      "bookmark_count-desc": "북마크순",
      "created_time-desc": "최근 작성 순",
      "start_date-desc": "최근 여행 순",
    };
    // const directionLabel = direction === "ASC" ? "오름차순" : "내림차순";
    const sortLabel = sortLabels[field] || field; // 필드 라벨 매핑
    selectedFilters.push({
      key: "sortBy",
      // name: `${sortLabel} (${directionLabel})`,
      name: `${sortLabel}`,
    });
  }
  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    selectedFilters.push({
      key: "minPrice",
      name: `가격: ${
        String(filters.minPrice).length > 0
          ? String(filters.minPrice).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          : 0
      } ~ ${
        String(filters.maxPrice).length > 0
          ? String(filters.maxPrice).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          : ""
      }`,
    });
  }
  return selectedFilters;
};

// SelectedFilters의 props 타입 정의
interface SelectedFiltersProps {
  filters: SelectFilters;
  onRemoveFilter: (key: keyof SelectFilters, name: string) => void;
}

// 선택한 필터를 표시하고 클릭하면 필터를 제거하는 컴포넌트
export const SelectedFilters: React.FC<SelectedFiltersProps> = ({
  filters,
  onRemoveFilter,
}) => {
  // useMemo 사용하여 불필요한 렌더링 줄임
  const selectedFilters = useMemo(
    () => formatSelectedFilters(filters),
    [filters]
  );

  return (
    <TopFilters>
      <div className="filterList">
        <h4>태그:</h4>
        {selectedFilters.length > 0 && (
          <div className="filter-tags">
            {selectedFilters.map((filter, index) => (
              <span key={index} className="filter-tag">
                {filter.name}
                <button
                  onClick={() =>
                    onRemoveFilter(
                      filter.key as keyof SelectFilters,
                      filter.name
                    )
                  }
                >
                  x
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </TopFilters>
  );
};
