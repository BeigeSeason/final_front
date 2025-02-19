import styled from "styled-components";
import { colors } from "../style/GlobalStyled";

interface StyledButtonProps {
  $margin?: string;
  $width?: string;
  $height?: string;
  padding?: string;
  fontSize?: string;
  border?: string;
  borderRadius?: string;
  bgColor?: string;
  color?: string;
  hoverBgColor?: string;
}

const StyledButton = styled.button<StyledButtonProps>`
  ${(props) => props.$margin && `margin: ${props.$margin};`}
  ${(props) => props.$width && `width: ${props.$width};`}
  ${(props) => props.$height && `height: ${props.$height};`}
  padding: ${(props) => props.padding || "5px 20px"};
  font-size: ${(props) => props.fontSize || "16px"};
  border: ${(props) => props.border || `none`};
  border-radius: ${(props) => props.borderRadius || "8px"};
  background-color: ${(props) => props.bgColor || colors.colorA};
  color: ${(props) => props.color || "white"};
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  &:hover {
    opacity: 0.8;
    background-color: ${(props) => props.hoverBgColor};
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

interface ButtonProps extends StyledButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  bgColor,
  hoverBgColor,
  border,
  ...props
}) => (
  <StyledButton
    onClick={onClick}
    bgColor={bgColor}
    hoverBgColor={hoverBgColor}
    border={border}
    {...props}
  >
    {children}
  </StyledButton>
);

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
