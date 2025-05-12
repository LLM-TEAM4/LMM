//CategoryStatisticsPage에서 이동하는 페이지임임

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import SurveyBox from "../../../components/SurveyBox"; 
import Header from "../../../components/AdminHeader"; 

const Container = styled.div`
  padding: 100px 40px 40px;
  background-color: #f9f9f9;
  min-height: 100vh;
`;


const BackButton = styled.button`
  margin-top: 30px;
  padding: 10px 20px;
  background-color: #649eff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #4a82d9;
  }
`;

const CategorySurveyListPage = () => {
  const { categoryName } = useParams();
  const [surveys, setSurveys] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:4000/survey/category/${categoryName}`, { credentials: "include" })
      .then(res => res.json())
      .then(data => setSurveys(data))
      .catch(err => console.error("설문 불러오기 실패:", err));
  }, [categoryName]);

  return (
  <>
    <Header />  {/* ✅ 헤더 추가 */}
    <Container>
      <h2 style={{ fontSize: "20px", fontWeight: "400", marginBottom: "10px", paddingBottom: "10px" }}>
        📮" {categoryName} "  카테고리에 존재하는 설문은 {surveys.length}개입니다.
      </h2>

      {surveys.length === 0 ? (
        <p>해당 카테고리에 등록된 설문이 없습니다.</p>
      ) : (
        surveys.map((survey) => (
          <SurveyBox key={survey._id} survey={survey} />
        ))
      )}
      <BackButton onClick={() => navigate(-1)}>← 목록으로 돌아가기</BackButton>
    </Container>
  </>
);
};

export default CategorySurveyListPage;
