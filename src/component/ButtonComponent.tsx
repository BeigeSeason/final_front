import styled, { css } from "styled-components";
import { colors } from "../style/GlobalStyled";

interface StyledButtonProps {
  $margin?: string;
  $width?: string;
  $height?: string;
  padding?: string;
  fontSize?: string;
  $border?: string;
  borderRadius?: string;
  $bgColor?: string;
  color?: string;
  $hoverBgColor?: string;
}

const StyledButton = styled.button<StyledButtonProps>`
  ${(props) => props.$margin && `margin: ${props.$margin};`}
  ${(props) => props.$width && `width: ${props.$width};`}
  ${(props) => props.$height && `height: ${props.$height};`}
  padding: ${(props) => props.padding || "5px 20px"};
  font-size: ${(props) => props.fontSize || "16px"};
  border: ${(props) => props.$border || `none`};
  border-radius: ${(props) => props.borderRadius || "8px"};
  background-color: ${(props) => props.$bgColor || colors.colorA};
  color: ${(props) => props.color || "white"};
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  &:hover {
    opacity: 0.8;
    background-color: ${(props) => props.$hoverBgColor};
  }

  &:disabled {
    background-color: #ccc;
    color: #666;
    cursor: default;
    &:hover {
      opacity: 1;
    }
  }

  &.active {
    background-color: #c1b0b0;
  }
`;

// 일반 버튼 ----------------------------------------------------------------------
interface ButtonProps extends StyledButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  bgColor?: string;
  hoverBgColor?: string;
  border?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  bgColor,
  disabled,
  hoverBgColor,
  border,
  type = "button",
  ...props
}) => (
  <StyledButton
    onClick={onClick}
    className={className}
    $bgColor={bgColor}
    disabled={disabled}
    $hoverBgColor={hoverBgColor}
    $border={border}
    type={type}
    {...props}
  >
    {children}
  </StyledButton>
);

// 취소 버튼 ------------------------------------------------------------------------------
interface CancelButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  [key: string]: any;
}

export const CancelButton: React.FC<CancelButtonProps> = ({
  onClick,
  children,
  ...props
}) => (
  <Button onClick={onClick} {...props} bgColor="#c4c4c4" color="black">
    {children}
  </Button>
);

// 스크롤바 스타일 ------------------------------------------------------------------------------
export const ScrollBar = css`
  /* 전체 스크롤바 영역 스타일 */
  &::-webkit-scrollbar {
    width: 6px; /* 스크롤바 두께 */
    height: 6px; /* 가로 스크롤바 두께 */
  }
  /* 스크롤바 트랙(배경) 스타일 */
  &::-webkit-scrollbar-track {
    background: #f1f1f1; /* 연한 배경색 */
    border-radius: 10px; /* 부드러운 모서리 */
  }
  /* 스크롤바 핸들(움직이는 부분) 스타일 */
  &::-webkit-scrollbar-thumb {
    background: ${colors.colorC};
    border-radius: 10px; /* 핸들의 모서리 둥글게 */
  }
  /* 스크롤바 핸들에 마우스를 올렸을 때 */
  &::-webkit-scrollbar-thumb:hover {
    background: rgb(80, 156, 189);
  }
`;
