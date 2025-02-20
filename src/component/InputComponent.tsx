import React from "react";
import styled from "styled-components";
import { colors } from "../style/GlobalStyled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// input상자 컴포넌트--------------------------------------------------------------------------
interface InputBoxProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
  width?: string;
  padding?: string;
  fontSize?: string;
  borderColor?: string;
  borderRadius?: string;
  readOnly?: boolean;
}

const StyledInput = styled.input<InputBoxProps>`
  width: ${(props) => props.width || "100%"};
  padding: ${(props) => props.padding || "8px"};
  font-size: ${(props) => props.fontSize || "15px"};
  border: 1px solid ${(props) => props.borderColor || "#ccc"};
  border-radius: ${(props) => props.borderRadius || "30px"};
  box-sizing: border-box;
  outline: none;

  &:focus {
    border-color: ${(props) => props.borderColor || colors.colorB};
  }
`;

export const InputBox: React.FC<InputBoxProps> = ({
  type = "text",
  placeholder,
  value,
  onChange,
  onKeyDown,
  className,
  width,
  padding,
  fontSize,
  borderColor,
  borderRadius,
  readOnly,
}) => {
  return (
    <StyledInput
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className={className}
      width={width}
      padding={padding}
      fontSize={fontSize}
      borderColor={borderColor}
      borderRadius={borderRadius}
      readOnly={readOnly}
    />
  );
};

// 검색창 컴포넌트 -------------------------------------------------------------------------------
interface SearchBoxProps {
  searchTerm: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  width?: string;
  inputHeight?: string;
  borderColor?: string;
  borderRadius?: string;
  fontSize?: string;
  iconColor?: string;
}

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const StyleInput = styled.input<{
  width?: string;
  inputHeight?: string;
  borderColor?: string;
  borderRadius?: string;
  fontSize?: string;
}>`
  width: ${({ width }) => width || "100%"};
  height: ${({ inputHeight }) => inputHeight || "20px"};
  padding: 10px 20px;
  border: 1px solid ${({ borderColor }) => borderColor || "#ccc"};
  border-radius: ${({ borderRadius }) => borderRadius || "50px"};
  font-size: ${({ fontSize }) => fontSize || "14px"};
  outline: none;
`;

const SearchIcon = styled(FontAwesomeIcon)<{ iconColor?: string }>`
  position: absolute;
  right: 10px;
  font-size: 16px;
  color: ${({ iconColor }) => iconColor || "#888"};
  cursor: pointer;
`;

export const SearchBox: React.FC<SearchBoxProps> = ({
  searchTerm,
  onChange,
  onKeyDown,
  onSearch,
  width,
  inputHeight,
  borderColor,
  borderRadius,
  fontSize,
  iconColor,
}) => {
  return (
    <SearchContainer>
      <StyleInput
        type="text"
        placeholder="검색어를 입력하세요"
        value={searchTerm}
        onChange={onChange}
        onKeyDown={onKeyDown}
        width={width}
        inputHeight={inputHeight}
        borderColor={borderColor}
        borderRadius={borderRadius}
        fontSize={fontSize}
      />
      <SearchIcon icon={faSearch} onClick={onSearch} iconColor={iconColor} />
    </SearchContainer>
  );
};
