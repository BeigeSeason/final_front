import { DiaryItem } from "../../component/ItemComponent";
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

interface Filters {
  areaCode: string;
  subAreaCode: string;
  searchQuery: string;
  sortBy: string;
  currentPage: number;
  pageSize: number;
  minPrice?: number;
  maxPrice?: number;
}
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
interface Diary {
  diaryId: string;
  title: string;
  contentSummary: string;
  thumbnail: string | null;
  writer: string;
  writerImg: string | null;
  createdAt: string;
}
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
  const [isAreaOpen, setIsAreaOpen] = useState(true);
  const [isSubAreaOpen, setIsSubAreaOpen] = useState(true);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [isSortOpen, setIsSortOpen] = useState(true);
  const sortOptions = [
    { value: "bookmark_count", label: "북마크순" },
    { value: "title.keyword", label: "제목순" },
    { value: "created_time", label: "작성일순" },
    { value: "start_date", label: "여행시작일순" },
  ];
  const [filters, setFilters] = useState<Filters>(() => {
    const queryParams = new URLSearchParams(location.search);
    return {
      areaCode: queryParams.get("areaCode") || "",
      subAreaCode: queryParams.get("subAreaCode") || "",
      searchQuery: queryParams.get("searchQuery") || "",
      sortBy: queryParams.get("sort") || "",
      currentPage: parseInt(queryParams.get("page") || "0", 10),
      pageSize: parseInt(queryParams.get("pageSize") || "10", 10),
      minPrice: queryParams.has("minPrice")
        ? parseInt(queryParams.get("minPrice") || "0", 10)
        : undefined,
      maxPrice: queryParams.has("maxPrice")
        ? parseInt(queryParams.get("maxPrice") || "1000", 10)
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
      });
      setDiaries(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
      setNumberOfElements(data.numberOfElements);
      // console.log(data);
    } catch (err) {
      setError("데이터를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const updateFilters = (key: keyof Filters, value: string | number) => {
    setFilters((prev) => {
      const newFilters: Filters = {
        ...prev,
        [key]: value,
        currentPage: key !== "currentPage" ? 0 : prev.currentPage,
      };
      return newFilters;
    });
  };
  const handleSortFieldChange = (field: string) => {
    const [currentField, currentDirection] = filters.sortBy.split(",");
    const newDirection = currentDirection || "ASC"; // 기본값 ASC
    const newSortBy = currentField === field ? "" : `${field},${newDirection}`;
    updateFilters("sortBy", newSortBy);
  };

  // 정렬 방향 변경
  const handleSortDirectionChange = (direction: "ASC" | "DESC") => {
    const [currentField] = filters.sortBy.split(",");
    if (!currentField) return; // 필드가 없으면 무시
    updateFilters("sortBy", `${currentField},${direction}`);
  };
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
    setMinPrice(0);
    setMaxPrice(1000);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateFilters("currentPage", page);
  };

  const handleSearch = () => {
    updateFilters("searchQuery", searchQuery);
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
      const newFilters: Filters = { ...prev };

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
        setMinPrice(0);
        setMaxPrice(1000);
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
    updateFilters("minPrice", minPrice);
    updateFilters("maxPrice", maxPrice);
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedAreaData = areas.find((area) => area.code === filters.areaCode);

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
          />
          <PriceRange>
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
          </PriceRange>
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
                    onClick={() => handleSortFieldChange(option.value)}
                    className={`sort-button ${
                      filters.sortBy.startsWith(option.value) ? "selected" : ""
                    }`}
                  >
                    # {option.label}
                  </Button>
                ))}
                <Button
                  onClick={() => handleSortDirectionChange("ASC")}
                  className={`sort-direction ${
                    filters.sortBy.endsWith("ASC") ? "selected" : ""
                  }`}
                  disabled={!filters.sortBy.split(",")[0]}
                >
                  오름차순
                </Button>
                <Button
                  onClick={() => handleSortDirectionChange("DESC")}
                  className={`sort-direction ${
                    filters.sortBy.endsWith("DESC") ? "selected" : ""
                  }`}
                  disabled={!filters.sortBy.split(",")[0]}
                >
                  내림차순
                </Button>
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
              description={[
                diary.title,
                diary.contentSummary,
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
          <Loading>
            <p>목록을 불러오는 중 입니다.</p>
          </Loading>
        )}
      </List>
    </>
  );
};
