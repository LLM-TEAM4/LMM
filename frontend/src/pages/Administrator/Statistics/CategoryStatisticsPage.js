// 📄 CategoryStatisticsPage.js
import React from "react";
import styled from "styled-components";
import Header from "../../../components/AdminHeader";
import surveyData from "../../../data/SurveyData";

const Container = styled.div`
  padding: 100px 40px;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 30px;
`;

const StatItem = styled.div`
  background: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const CategoryStatisticsPage = () => {
  const categoryMap = {};

  surveyData.forEach((item) => {
    if (!categoryMap[item.category]) {
      categoryMap[item.category] = [];
    }
    categoryMap[item.category].push(item);
  });

  return (
    <>
      <Header />
      <Container>
        <Title>카테고리별 통계</Title>
        {Object.entries(categoryMap).map(([category, items]) => (
          <StatItem key={category}>
            <h3>{category}</h3>
            <p>총 설문 수: {items.length}개</p>
            <ul>
              {items.map((s) => (
                <li key={s.title}>{s.entityName || s.title}</li>
              ))}
            </ul>
          </StatItem>
        ))}
      </Container>
    </>
  );
};

export default CategoryStatisticsPage;
