import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import CommonHeader from "../../components/CommonHeader";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const SurveyDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { title, image, caption, country, category, entityName, _id } = location.state || {};

  const handleStart = () => {
    const path = `${country} > ${category} > ${entityName}`;
    navigate(`/survey/${title}/start`, {
      state: {
        image,
        caption,
        path,
        surveyId: _id, // ✅ ObjectId 전달
      },
    });
  };

  return (
    <Wrapper>
      <CommonHeader />
      <Container>
        <Image src={image} alt={title} />
        <TextBox>
          <Title>{title}</Title>
          <Description>
            {country} / {category} / {entityName}
          </Description>
          <StartButton onClick={handleStart}>설문 시작하기</StartButton>
        </TextBox>
      </Container>
    </Wrapper>
  );
};

export default SurveyDetail;

// ✅ Styled Components
const Wrapper = styled.div`
  height: 100vh;
`;

const Container = styled.div`
  padding: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
`;

const Image = styled.img`
  width: 380px;
  height: 280px;
  object-fit: cover;
  border-radius: 12px;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Title = styled.h2`
  font-size: 26px;
  font-weight: bold;
`;

const Description = styled.p`
  font-size: 18px;
  color: #666;
`;

const StartButton = styled.button`
  margin-top: 20px;
  padding: 12px 24px;
  background-color: #649eff;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #3a6fbd;
  }
`;
