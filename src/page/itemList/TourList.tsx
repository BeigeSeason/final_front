// import { TourItem } from "../../component/ItemComponent";
import { ToggleSection, SelectedFilters } from "../../component/ItemComponent";
import { ServiceCode } from "../../util/ServiceCode";
import { types, areas } from "../../util/TourCodes";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { SelectSearchItem } from "../../style/ListStyled";
import { FaUndo } from "react-icons/fa";
import { Button } from "../../component/ButtonComponent";
import { SearchBox } from "../../component/InputComponent";

interface Filters {
  areaCode: string;
  subAreaCode: string;
  topTheme: string;
  middleTheme: string;
  bottomTheme: string;
  category: string;
  searchQuery: string;
  sortBy: string;
  currentPage: number;
  pageSize: number;
}

export const TourList: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAreaOpen, setIsAreaOpen] = useState(true);
  const [isSubAreaOpen, setIsSubAreaOpen] = useState(true);
  const [isTopThemeOpen, setIsTopThemeOpen] = useState(true);
  const [isMiddleThemeOpen, setIsMiddleThemeOpen] = useState(true);
  const [isBottomThemeOpen, setIsBottomThemeOpen] = useState(true);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [filters, setFilters] = useState<Filters>(() => {
    const queryParams = new URLSearchParams(location.search);
    return {
      areaCode: queryParams.get("areaCode") || "",
      subAreaCode: queryParams.get("subAreaCode") || "",
      topTheme: queryParams.get("cat1") || "",
      middleTheme: queryParams.get("cat2") || "",
      bottomTheme: queryParams.get("cat3") || "",
      category: queryParams.get("category") || "",
      searchQuery: queryParams.get("searchQuery")
        ? decodeURIComponent(queryParams.get("searchQuery")!)
        : "",
      sortBy: queryParams.get("sort") || "",
      currentPage: parseInt(queryParams.get("currentPage") || "0", 10),
      pageSize: parseInt(queryParams.get("pageSize") || "10", 10),
    };
  });
  const [searchQuery, setSearchQuery] = useState<string>(filters.searchQuery);
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // const fetchFilteredTravelSpots = async () => {
    //   try {
    //     setLoading(true);
    //     const validFilters = Object.fromEntries(
    //       Object.entries(filters).filter(([, value]) => value)
    //     );
    //     const data = await TravelSpotApi.getTravelSpots(validFilters);
    //     setTotalItems(data.totalElements);
    //     setTotalPages(data.totalPages);
    //     setTravelSpots(data.content);
    //   } catch (error) {
    //     setError("여행지 데이터를 가져오는 데 실패했습니다.");
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        if (key === "bottomTheme" && typeof value === "string") {
          queryParams.set("cat3", value);
        } else if (key === "topTheme") {
          queryParams.set("cat1", value);
        } else if (key === "middleTheme") {
          queryParams.set("cat2", value);
        } else if (key === "searchQuery") {
          queryParams.set(key, encodeURIComponent(value));
        } else {
          queryParams.set(key, value.toString());
        }
      }
    });

    navigate(
      `/tourlist${queryParams.toString() ? `?${queryParams.toString()}` : ""}`,
      { replace: true }
    );
    // fetchFilteredTravelSpots();
  }, [filters, navigate]);

  const updateFilters = (key: keyof Filters, value: string | number) => {
    setFilters((prev) => {
      const newFilters: Filters = {
        ...prev,
        [key]: value,
        currentPage: key !== "currentPage" ? 0 : prev.currentPage,
        sortBy: key !== "currentPage" ? "" : prev.sortBy,
      };

      if (key === "topTheme") {
        newFilters.middleTheme = "";
        newFilters.bottomTheme = "";
      } else if (key === "middleTheme") {
        newFilters.bottomTheme = "";
      }
      return newFilters;
    });
  };

  const handleResetSelections = () => {
    setFilters({
      areaCode: "",
      subAreaCode: "",
      topTheme: "",
      middleTheme: "",
      bottomTheme: "",
      category: "",
      searchQuery: "",
      sortBy: "",
      currentPage: 0,
      pageSize: 10,
    });
    setSearchQuery("");
  };

  const handlePageChange = (newPage: number) => {
    updateFilters("currentPage", newPage);
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      updateFilters("searchQuery", searchQuery.trim());
    }
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

  const handleTopThemeChange = (cat1: string) => {
    const newTopTheme = filters.topTheme === cat1 ? "" : cat1;
    updateFilters("topTheme", newTopTheme);
  };

  const handleMiddleThemeChange = (cat2: string) => {
    const newMiddleTheme = filters.middleTheme === cat2 ? "" : cat2;
    updateFilters("middleTheme", newMiddleTheme);
  };

  const handleBottomThemeChange = (cat3: string) => {
    setFilters((prev) => {
      let newSelectedBottomThemes = prev.bottomTheme
        ? prev.bottomTheme.split(",")
        : [];

      if (newSelectedBottomThemes.includes(cat3)) {
        newSelectedBottomThemes = newSelectedBottomThemes.filter(
          (item) => item !== cat3
        );
      } else {
        if (newSelectedBottomThemes.length >= 3) {
          return prev;
        }
        newSelectedBottomThemes.push(cat3);
      }
      return {
        ...prev,
        bottomTheme: newSelectedBottomThemes.join(","),
      };
    });
  };

  const handleCategoryChange = (category: string) => {
    const newCategory = filters.category === category ? "" : category;
    updateFilters("category", newCategory);
  };

  // const handleTopFilterChange = (key: keyof Filters, name: string) => {
  //   setFilters((prev) => {
  //     const newFilters: Filters = { ...prev };

  //     if (key === "bottomTheme") {
  //       const code = ServiceCode.flatMap((cat) =>
  //         cat.cat2List.flatMap((cat2) => cat2.cat3List)
  //       ).find((cat3) => cat3.cat3Name === name)?.cat3;

  //       if (code) {
  //         newFilters[key] = newFilters[key]
  //           ? newFilters[key]
  //               .split(",")
  //               .filter((theme) => theme !== code)
  //               .join(",")
  //           : ""; // newFilters[key]가 undefined일 경우 기본값 설정
  //       }
  //     } else {
  //       newFilters[key] = "";
  //     }

  //     return newFilters;
  //   });
  // };

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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedAreaData = areas.find((area) => area.code === filters.areaCode);

  return (
    <>
      <SelectSearchItem className={isSelectOpen ? "open" : ""} ref={selectRef}>
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

        <div className="mainarea">
          <ToggleSection
            title="지역 선택"
            isOpen={isAreaOpen}
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
                  {area.name}
                </Button>
              ))}
            </div>
          </ToggleSection>
        </div>

        {selectedAreaData && (
          <div className="subarea">
            <ToggleSection
              title="세부 지역 선택"
              isOpen={isSubAreaOpen}
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
                    {subArea.name}
                  </Button>
                ))}
              </div>
            </ToggleSection>
          </div>
        )}

        <div className="top">
          <ToggleSection
            title="대분류"
            isOpen={isTopThemeOpen}
            onToggle={() => setIsTopThemeOpen(!isTopThemeOpen)}
          >
            <div className="buttons">
              {ServiceCode.map((cat) => (
                <Button
                  key={cat.cat1}
                  onClick={() => handleTopThemeChange(cat.cat1)}
                  className={`theme-button ${
                    filters.topTheme === cat.cat1 ? "selected" : ""
                  }`}
                >
                  {cat.cat1Name}
                </Button>
              ))}
            </div>
          </ToggleSection>
        </div>

        {filters.topTheme && (
          <div className="middle">
            <ToggleSection
              title="중분류"
              isOpen={isMiddleThemeOpen}
              onToggle={() => setIsMiddleThemeOpen(!isMiddleThemeOpen)}
            >
              <div className="buttons">
                {ServiceCode.find(
                  (cat) => cat.cat1 === filters.topTheme
                )?.cat2List.map((cat2) => (
                  <Button
                    key={cat2.cat2}
                    onClick={() => handleMiddleThemeChange(cat2.cat2)}
                    className={`theme-button ${
                      filters.middleTheme === cat2.cat2 ? "selected" : ""
                    }`}
                  >
                    {cat2.cat2Name}
                  </Button>
                ))}
              </div>
            </ToggleSection>
          </div>
        )}

        {filters.middleTheme && (
          <div className="bottom">
            <ToggleSection
              title="소분류"
              isOpen={isBottomThemeOpen}
              onToggle={() => setIsBottomThemeOpen(!isBottomThemeOpen)}
            >
              <div className="buttons">
                {filters.middleTheme &&
                  ServiceCode.find((cat) => cat.cat1 === filters.topTheme)
                    ?.cat2List.find((cat2) => cat2.cat2 === filters.middleTheme)
                    ?.cat3List.map((cat3) => (
                      <Button
                        key={cat3.cat3}
                        onClick={() => handleBottomThemeChange(cat3.cat3)}
                        className={`theme-button ${
                          filters.bottomTheme.includes(cat3.cat3)
                            ? "selected"
                            : ""
                        }`}
                        disabled={
                          filters.bottomTheme.split(",").length >= 3 &&
                          !filters.bottomTheme.includes(cat3.cat3)
                        }
                      >
                        {cat3.cat3Name}
                      </Button>
                    ))}
              </div>
            </ToggleSection>
          </div>
        )}
        <div className="category">
          <ToggleSection
            title="카테고리 선택"
            isOpen={isCategoryOpen}
            onToggle={() => setIsCategoryOpen(!isCategoryOpen)}
          >
            <div className="buttons">
              {types.map((type) => (
                <Button
                  key={type.code}
                  onClick={() => handleCategoryChange(type.code)}
                  className={`category-button ${
                    filters.category === type.code ? "selected" : ""
                  }`}
                >
                  {type.name}
                </Button>
              ))}
            </div>
          </ToggleSection>
        </div>
      </SelectSearchItem>
      {/* <SelectedFilters
        filters={filters}
        onRemoveFilter={handleTopFilterChange}
      /> */}
    </>
  );
};
