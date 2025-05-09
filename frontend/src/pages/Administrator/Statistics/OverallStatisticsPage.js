// 전체 설문 항목 요약
// 📄 OverallStatisticsPage.js
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

const OverallStatisticsPage = () => {
  const total = surveyData.length;
  const byCountry = {};
  const byCategory = {};

  surveyData.forEach((item) => {
    byCountry[item.country] = (byCountry[item.country] || 0) + 1;
    byCategory[item.category] = (byCategory[item.category] || 0) + 1;
  });

  return (
    <>
      <Header />
      <Container>
        <Title>전체 설문 요약 통계</Title>
        <StatItem>
          <h3>총 설문 수: {total}</h3>
        </StatItem>
        <StatItem>
          <h3>국가별</h3>
          <ul>
            {Object.entries(byCountry).map(([country, count]) => (
              <li key={country}>
                {country}: {count}개
              </li>
            ))}
          </ul>
        </StatItem>
        <StatItem>
          <h3>카테고리별</h3>
          <ul>
            {Object.entries(byCategory).map(([cat, count]) => (
              <li key={cat}>
                {cat}: {count}개
              </li>
            ))}
          </ul>
        </StatItem>
      </Container>
    </>
  );
};

export default OverallStatisticsPage;
