import React from "react";
import { DiaryItem } from "../../component/ItemComponent";
import { Diary } from "../../types/ItemTypes";
import { SelectFilters, DiaryFilters } from "../../types/ItemTypes";
import { ToggleSection, SelectedFilters } from "../../component/ItemComponent";
import { areas } from "../../util/TourCodes";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  SelectSearchItem,
  PriceRange,
  FilterButton,
  List,
  ItemList,
} from "../../style/ListStyled";
import { FaUndo } from "react-icons/fa";
import { Button } from "../../component/ButtonComponent";
import { SearchBox } from "../../component/InputComponent";
import ReactSlider from "react-slider";
import { FaBars } from "react-icons/fa";
import { ItemApi } from "../../api/ItemApi";
import { Loading } from "../../component/Loading";
import { Paginating } from "../../component/PaginationComponent";

export const DiaryList: React.FC = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [numberOfElements, setNumberOfElements] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [isPriceOpen, setIsPriceOpen] = useState<boolean>(true);
  const [isSortOpen, setIsSortOpen] = useState(true);
  const [isAreaOpen, setIsAreaOpen] = useState(true);
  const [isSubAreaOpen, setIsSubAreaOpen] = useState(true);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const sortOptions = [
    {
      value: "title.korean_sorted-asc",
      label: "가나다순",
      newSortBy: "title.korean_sorted,ASC",
    },
    {
      value: "bookmark_count-desc",
      label: "북마크 순",
      newSortBy: "bookmark_count,DESC",
    },
    {
      value: "created_time-desc",
      label: "최근 작성 순",
      newSortBy: "created_time,DESC",
    },
    {
      value: "start_date-desc",
      label: "최근 여행 순",
      newSortBy: "start_date, DESC",
    },
  ];
  const [filters, setFilters] = useState<DiaryFilters>(() => {
    const queryParams = new URLSearchParams(location.search);
    return {
      areaCode: queryParams.get("areaCode") || "",
      subAreaCode: queryParams.get("subAreaCode") || "",
      searchQuery: queryParams.get("searchQuery") || "",
      sortBy: queryParams.get("sortBy") || "",
      currentPage: parseInt(queryParams.get("page") || "0", 10),
      pageSize: parseInt(queryParams.get("pageSize") || "10", 10),
      minPrice: queryParams.has("minPrice")
        ? parseInt(queryParams.get("minPrice") || "0", 10)
        : undefined,
      maxPrice: queryParams.has("maxPrice")
        ? parseInt(queryParams.get("maxPrice") || "", 10)
        : undefined,
    };
  });
  const [searchQuery, setSearchQuery] = useState<string>(filters.searchQuery);
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        if (key === "searchQuery") {
          queryParams.set(key, value);
        } else {
          queryParams.set(key, value.toString());
        }
      }
    });
    queryParams.set("page", currentPage.toString());
    navigate(
      `/diarylist${queryParams.toString() ? `?${queryParams.toString()}` : ""}`,
      { replace: true }
    );
    fetchDiaries(currentPage);
  }, [filters, navigate, currentPage]);

  const fetchDiaries = async (page: number) => {
    setLoading(true);
    try {
      const data = await ItemApi.getDiaryList({
        keyword: filters.searchQuery || undefined,
        page: page,
        size: filters.pageSize,
        sort: filters.sortBy.replace(/-(?=[^-]*$)/, ",") || undefined,
        areaCode: filters.areaCode || undefined,
        sigunguCode: filters.subAreaCode || undefined,
        minPrice: parseInt(minPrice) || 0,
        maxPrice: parseInt(maxPrice) || 0,
      });
      setDiaries(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
      setNumberOfElements(data.numberOfElements);
      console.log(data.content);
    } catch (err) {
      setError("데이터를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const updateFilters = (key: keyof DiaryFilters, value: string | number) => {
    setFilters((prev) => {
      const newFilters: DiaryFilters = {
        ...prev,
        [key]: value,
        currentPage: key !== "currentPage" ? 0 : prev.currentPage,
      };
      return newFilters;
    });
  };
  // const handleSortFieldChange = (field: string) => {
  //   const [currentField, currentDirection] = filters.sortBy.split(",");
  //   const newDirection = currentDirection || "ASC"; // 기본값 ASC
  //   const newSortBy = currentField === field ? "" : `${field},${newDirection}`;
  //   updateFilters("sortBy", newSortBy);
  // };

  // // 정렬 방향 변경
  // const handleSortDirectionChange = (direction: "ASC" | "DESC") => {
  //   const [currentField] = filters.sortBy.split(",");
  //   if (!currentField) return; // 필드가 없으면 무시
  //   updateFilters("sortBy", `${currentField},${direction}`);
  // };
  const handleResetSelections = () => {
    setFilters({
      areaCode: "",
      subAreaCode: "",
      searchQuery: "",
      sortBy: "",
      currentPage: 0,
      pageSize: 10,
      minPrice: undefined,
      maxPrice: undefined,
    });
    setSearchQuery("");
    setMinPrice("");
    setMaxPrice("");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateFilters("currentPage", page);
  };

  const handleSearch = () => {
    updateFilters("searchQuery", searchQuery);
    setSearchQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleAreaChange = (areaCode: string) => {
    const newAreaCode = filters.areaCode === areaCode ? "" : areaCode;
    updateFilters("areaCode", newAreaCode);
    updateFilters("subAreaCode", "");
  };

  const handleSubAreaChange = (subAreaCode: string) => {
    const newSubAreaCode =
      filters.subAreaCode === subAreaCode ? "" : subAreaCode;
    updateFilters("subAreaCode", newSubAreaCode);
  };

  const handleTopFilterChange = (key: keyof SelectFilters, name: string) => {
    setFilters((prev) => {
      const newFilters: DiaryFilters = { ...prev };

      if (
        key === "areaCode" ||
        key === "subAreaCode" ||
        key === "searchQuery" ||
        key === "sortBy"
      ) {
        newFilters[key] = "";
      } else if (key === "minPrice") {
        newFilters.minPrice = undefined;
        newFilters.maxPrice = undefined;
        setMinPrice("");
        setMaxPrice("");
      }

      return newFilters;
    });
  };

  const handleToggleSelect = () => {
    setIsSelectOpen(!isSelectOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      setIsSelectOpen(false);
    }
  };
  const updatePriceRange = () => {
    const min =
      minPrice === ""
        ? ""
        : Math.min(Number(minPrice) || 0, Number(maxPrice) || 999999999);
    const max =
      maxPrice === ""
        ? ""
        : Math.max(Number(minPrice) || 0, Number(maxPrice) || 999999999);

    // minPrice와 maxPrice를 상태로 업데이트
    setMinPrice(String(min));
    setMaxPrice(String(max));

    // 필터에 적용
    updateFilters("minPrice", min);
    updateFilters("maxPrice", max);
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedAreaData = areas.find((area) => area.code === filters.areaCode);
  const formatPrice = (value: string) => {
    const numericValue = value.replace(/\D/g, ""); // 숫자만 남기기
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 1000 단위 콤마 추가
  };
  return (
    <>
      <FilterButton onClick={handleToggleSelect}>
        <FaBars />
      </FilterButton>
      <List>
        <SelectSearchItem
          className={isSelectOpen ? "open" : ""}
          ref={selectRef}
        >
          <button className="reset-button" onClick={handleResetSelections}>
            초기화
            <FaUndo style={{ marginLeft: "6px" }} />
          </button>
          <SearchBox
            searchTerm={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onSearch={handleSearch}
            placeholder={"검색어 입력 (태그: #사용 및 공백으로 구분)"}
          />
          {/* <PriceRange>
            <div>
              <ReactSlider
                className="slider"
                thumbClassName="thumb"
                trackClassName="track"
                min={0}
                max={1000}
                value={[minPrice, maxPrice]}
                onChange={(values) => {
                  setMinPrice(values[0]);
                  setMaxPrice(values[1]);
                }}
                renderThumb={(props) => <div {...props} key={props.key} />}
              />
            </div>
            <div>
              최소 금액: {minPrice} / 최대 금액: {maxPrice}
            </div>
            <Button onClick={updatePriceRange}>확인</Button>
          </PriceRange> */}
          <div className="price">
            <ToggleSection
              title="금액"
              isopen={isPriceOpen}
              onToggle={() => setIsPriceOpen(!isPriceOpen)}
            >
              <div className="price-input-container">
                <div
                  className="price-wrapper"
                  onClick={() =>
                    document.getElementById("minPriceInput")?.focus()
                  }
                >
                  <input
                    id="minPriceInput"
                    className="price-input"
                    type="text"
                    value={formatPrice(minPrice)}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, ""); // 숫자만 허용
                      if (value !== "" && Number(value) >= 1_000_000_000)
                        return; // 10억 이상 입력 방지
                      setMinPrice(value); // 빈 값도 허용
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        updatePriceRange();
                      }
                    }}
                  />
                  <span className="unit">원</span>
                </div>
                ~
                <div
                  className="price-wrapper"
                  onClick={() =>
                    document.getElementById("maxPriceInput")?.focus()
                  }
                >
                  <input
                    id="maxPriceInput"
                    className="price-input"
                    type="text"
                    value={formatPrice(maxPrice)}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, ""); // 숫자만 허용
                      if (value !== "" && Number(value) >= 1_000_000_000)
                        return; // 10억 이상 입력 방지
                      setMaxPrice(value); // 빈 값도 허용
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        updatePriceRange();
                      }
                    }}
                  />
                  <span className="unit">원</span>
                </div>
              </div>
              <Button className="confirm-button" onClick={updatePriceRange}>
                적용
              </Button>
            </ToggleSection>
          </div>
          <div className="sort">
            <ToggleSection
              title="정렬"
              isopen={isSortOpen}
              onToggle={() => setIsSortOpen(!isSortOpen)}
            >
              <div className="buttons">
                {sortOptions.map((option) => (
                  <Button
                    key={option.value}
                    onClick={() => updateFilters("sortBy", option.value)}
                    className={`sort-button ${
                      filters.sortBy.startsWith(option.value) ? "selected" : ""
                    }`}
                  >
                    # {option.label}
                  </Button>
                ))}
              </div>
            </ToggleSection>
          </div>
          <div className="mainarea">
            <ToggleSection
              title="지역 선택"
              isopen={isAreaOpen}
              onToggle={() => setIsAreaOpen(!isAreaOpen)}
            >
              <div className="buttons">
                {areas.map((area) => (
                  <Button
                    key={area.code}
                    onClick={() => handleAreaChange(area.code)}
                    className={`area-button ${
                      filters.areaCode === area.code ? "selected" : ""
                    }`}
                  >
                    # {area.name}
                  </Button>
                ))}
              </div>
            </ToggleSection>
          </div>

          {selectedAreaData && (
            <div className="subarea">
              <ToggleSection
                title="세부 지역 선택"
                isopen={isSubAreaOpen}
                onToggle={() => setIsSubAreaOpen(!isSubAreaOpen)}
              >
                <div className="buttons">
                  {selectedAreaData.subAreas.map((subArea) => (
                    <Button
                      key={subArea.code}
                      onClick={() => handleSubAreaChange(subArea.code)}
                      className={`subarea-button ${
                        filters.subAreaCode === subArea.code ? "selected" : ""
                      }`}
                    >
                      # {subArea.name}
                    </Button>
                  ))}
                </div>
              </ToggleSection>
            </div>
          )}
        </SelectSearchItem>
        <ItemList>
          <div className="totalCount">
            총{" "}
            {totalElements > 9999 ? "9,999+" : totalElements.toLocaleString()}건
          </div>
          <SelectedFilters
            filters={{
              areaCode: filters.areaCode,
              subAreaCode: filters.subAreaCode,
              searchQuery: filters.searchQuery,
              sortBy: filters.sortBy,
              minPrice: filters.minPrice,
              maxPrice: filters.maxPrice,
            }}
            onRemoveFilter={handleTopFilterChange}
          />
          {diaries.map((diary, index) => (
            <DiaryItem
              key={index}
              id={diary.diaryId}
              thumbnail={diary.thumbnail}
              profile={diary.writerImg}
              description={[
                diary.title,
                diary.contentSummary,
                diary.writer,
                diary.createdAt.slice(0, 10).replaceAll("-", ". "),
                new Date(diary.createdAt).toLocaleString(),
                `${diary.writer} (${new Date(
                  diary.createdAt
                ).toLocaleString()})`,
              ]}
            />
          ))}
          <Paginating
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </ItemList>
        {loading && (
          <Loading istransparent={"true"}>
            <p>목록을 불러오는 중 입니다.</p>
          </Loading>
        )}
      </List>
    </>
  );
};
