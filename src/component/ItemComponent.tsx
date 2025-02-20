import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom"; // Link 임포트

const SpotContainer = styled(Link)`
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 10px auto;
  width: 80%;
  text-decoration: none;
  color: inherit;
  border-bottom: 1px solid #ddd;
`;

const SpotImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  margin-right: 10px;
`;

const SpotDescription = styled.div`
  display: flex;
`;

interface TourItemProps {
  image: string;
  description: string;
  id: string;
}

export const TourItem: React.FC<TourItemProps> = ({
  image,
  description,
  id,
}) => {
  return (
    <SpotContainer to={`/tourspot/${id}`}>
      <SpotImage src={image} alt="관광지 이미지" />
      <SpotDescription>{description}</SpotDescription>
    </SpotContainer>
  );
};
