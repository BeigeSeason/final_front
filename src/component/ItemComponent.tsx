import React from "react";
import styled from "styled-components";

const SpotContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  margin: 10px 0;
  width: 300px; /* 네모칸의 너비 조정 */
`;

const SpotImage = styled.img`
  width: 80px; /* 이미지 크기 조정 */
  height: 80px;
  border-radius: 8px;
  margin-right: 10px;
`;

const SpotDescription = styled.div`
  flex: 1;
`;

interface TourItemProps {
  image: string;
  description: string;
}

export const TourItem: React.FC<TourItemProps> = ({ image, description }) => {
  return (
    <SpotContainer>
      <SpotImage src={image} alt="관광지 이미지" />
      <SpotDescription>{description}</SpotDescription>
    </SpotContainer>
  );
};
