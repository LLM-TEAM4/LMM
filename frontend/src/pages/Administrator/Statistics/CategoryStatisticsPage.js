
// CategoryStatisticsPage.js
import React from "react";


import React, { useState,useEffect } from "react";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/AdminHeader";
import surveyData from "../../../data/SurveyData";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

import { useNavigate } from "react-router-dom";
import AdminStatisticsLayout from "../../../layouts/AdminStatisticsLayout";


const Container = styled.div`
  padding: 100px 40px 40px;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

const Title = styled.h2`
  font-size: 26px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 15px;
  color: #666;
  margin-bottom: 30px;
`;


const ChartWrapper = styled.div`
  width: 100%;
  height: 500px;
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
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


const aggregateScores = (votes) => {
  const flatVotes = Object.values(votes || {}).flatMap((vote) =>
    Object.entries(vote).flatMap(([score, count]) =>
      Array(Number(count)).fill(Number(score))
    )
  );
  const sum = flatVotes.reduce((a, b) => a + b, 0);
  return flatVotes.length ? sum / flatVotes.length : 0;
};

const StatItem = styled.div`
  background: #fff;
  padding: 20px 25px;
  margin-bottom: 20px;
  border-left: 6px solid #649eff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
    background-color: #f0f4ff;
  }
`;



const CategoryStatisticsPage = () => {
  const navigate = useNavigate();

  const categoryMap = {
    cuisine: {},
    clothes: {},
    architecture: {},
    game: {},
    tooleh: {},
  };

  const [categoryStats, setCategoryStats] = useState([]);

  useEffect(() => {
  fetch("http://localhost:4000/survey/statistics/category-averages", { credentials: "include" })
    .then(res => res.json())
    .then(data => {
      console.log("✅ 카테고리별 서버 응답 데이터:", data);
      setCategoryStats(data);
    })
    .catch(err => console.error("카테고리별 통계 불러오기 실패:", err));
}, []);

  surveyData.forEach((s) => {
    if (!categoryMap[s.category][s.country]) {
      categoryMap[s.category][s.country] = [];
    }
    categoryMap[s.category][s.country].push(aggregateScores(s.votes));
  });

  const charts = Object.entries(categoryMap).map(
    ([category, countryScores]) => {
      const data = Object.entries(countryScores).map(([country, scores]) => ({
        country,
        average:
          scores.length > 0
            ? Number(
                (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2)
              )
            : 0,
      }));

      const colors = {
        cuisine: "#e16162",
        clothes: "#f2aa00",
        architecture: "#007b83",
        game: "#6a1b9a",
        tooleh: "#00796b",
      };

      const labels = {
        cuisine: "Food",
        clothes: "Clothing",
        architecture: "Architecture",
        game: "Game",
        tooleh: "Tooleh",
      };

      return (
        <ChartWrapper key={category}>
          <h3 style={{ marginBottom: "10px", color: "#333" }}>
            {labels[category]}
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="country"
                angle={-15}
                textAnchor="end"
                height={60}
              />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Bar dataKey="average" fill={colors[category]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>
      );
    }
  );

  return (

    <>
      <Header />
      <Container>
        <Title>카테고리별 국가 점수</Title>
        <Subtitle>
          각 문화 카테고리 내에서 국가별로 평가된 생성 이미지의 설명 일치도
          평균을 확인할 수 있습니다.
        </Subtitle>

        {charts}

        <BackButton onClick={() => navigate(-1)}>
          ← 목록으로 돌아가기
        </BackButton>
      </Container>
    </>


    <Container>
      <Title>카테고리별 설문 통계</Title>
      <Subtitle>
        설문 항목들은 음식(cuisine), 의복(clothes), 건축(architecture) 등의
        문화 카테고리로 분류되어 있으며, 각 카테고리별 항목 수를 확인할 수 있습니다.
      </Subtitle>

      {categoryStats.map((categoryItem) => (
  <StatItem 
    key={categoryItem.category}
    onClick={() => navigate(`/administrator/surveys/category/${categoryItem.category}`)}
    style={{ cursor: "pointer" }}
>
    <CategoryTitle> 
  📂 {categoryItem.category}
  </CategoryTitle>


    <Count>총 설문 수: {categoryItem.items.length}개</Count>
    <ItemList>
  {categoryItem.items.slice(0, 5).map((s) => (
    <Item key={s._id}>{s.entityName}</Item>
  ))}
  {categoryItem.items.length > 5 && (
    <Item>... 외 {categoryItem.items.length - 5}개</Item>
  )}
</ItemList>

  </StatItem>
))}

      <BackButton onClick={() => navigate(-1)}>
        ← 목록으로 돌아가기
      </BackButton>
    </Container>

  );
};

export default CategoryStatisticsPage;

