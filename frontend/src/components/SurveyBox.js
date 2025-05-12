import React from "react";
import styled from "styled-components";

const Box = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  padding: 20px;
  border-left: 6px solid #649eff;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    transform: translateY(-4px);
    background-color: #f0f4ff;
  }
`;



const Image = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 12px;
  object-fit: cover;
  margin-left:30px;

  margin-right: 50px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
`;



const Content = styled.div`
  flex: 1;
 
 
  
`;


const SurveyBox = ({ survey }) => (
  <Box>
    {survey.imageUrl && <Image src={survey.imageUrl} alt={survey.entityName} />}
    <Content>
      <h3>{survey.entityName}</h3>
      <p>국가: {survey.country}</p>
      <p>등록일: {survey.createdAt ? new Date(survey.createdAt).toLocaleDateString() : "알 수 없음"}</p>
      <p>응답자 수: {survey.responseUserCount ?? "알 수 없음"}</p>
      <p>평점: {survey.averageScore ?? "평점 없음"}</p>
    </Content>
  </Box>
);

export default SurveyBox;
