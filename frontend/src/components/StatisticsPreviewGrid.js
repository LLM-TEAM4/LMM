// components/StatisticsPreviewGrid.js
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";
import surveyData from "../data/SurveyData";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
`;

const ChartCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.02);
  }
`;

const Title = styled.h3`
  font-size: 16px;
  margin-bottom: 15px;
  color: #333;
`;

const HighlightBox = styled.div`
  background-color: #fff3e0;
  border-left: 6px solid #ff9800;
  padding: 12px 16px;
  margin-top: 12px;
  border-radius: 8px;
`;

const HighlightTitle = styled.p`
  font-size: 14px;
  font-weight: bold;
  margin: 0 0 6px 0;
`;

const HighlightText = styled.p`
  font-size: 14px;
  margin: 0;
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

const StatisticsPreviewGrid = () => {
  const navigate = useNavigate();

  // 승인 대기 설문
  const pendingSurveys = surveyData.filter((s) => s.status === "pending");

  // 국가별 통계
  const countryMap = {};
  surveyData.forEach((s) => {
    if (!countryMap[s.country]) countryMap[s.country] = [];
    countryMap[s.country].push(aggregateScores(s.votes));
  });
  const countryData = Object.entries(countryMap).map(([country, scores]) => ({
    country,
    avg: Number((scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2)),
  }));
  const sortedCountry = [...countryData].sort((a, b) => a.avg - b.avg);

  // 카테고리별 통계
  const categoryMap = {};
  surveyData.forEach((s) => {
    if (!categoryMap[s.category]) categoryMap[s.category] = [];
    categoryMap[s.category].push(aggregateScores(s.votes));
  });
  const categoryData = Object.entries(categoryMap).map(
    ([category, scores]) => ({
      name: category,
      avg: Number(
        (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2)
      ),
    })
  );

  return (
    <Grid>
      {/* 승인 요청 카드 */}
      <ChartCard onClick={() => navigate("/administrator/requests")}>
        <Title>승인 요청된 설문조사</Title>
        <p style={{ fontSize: "14px", marginBottom: "16px" }}>
          총 <strong>{pendingSurveys.length}</strong>개의 설문이 승인 대기
          중입니다.
        </p>
        <ul style={{ marginBottom: "16px", paddingLeft: "20px" }}>
          {pendingSurveys.slice(0, 3).map((s) => (
            <li key={s._id} style={{ fontSize: "13px", color: "#444" }}>
              설문조사 &gt; {s.country} &gt; {s.category}
            </li>
          ))}
          {pendingSurveys.length > 3 && (
            <li style={{ fontSize: "13px", color: "#999" }}>
              ...외 {pendingSurveys.length - 3}개
            </li>
          )}
        </ul>
      </ChartCard>

      <ChartCard
        onClick={() => navigate("/administrator/statistics/summary/overall")}
      >
        <Title>전체 통계</Title>
        <p style={{ fontSize: "14px", marginBottom: "16px" }}>
          전체 설문에 대한 평균 점수 및 주요 통계를 확인할 수 있습니다.
        </p>
        <HighlightBox>
          <HighlightTitle>📉 가장 편향성이 큰 국가</HighlightTitle>
          <HighlightText>
            <strong>{sortedCountry[0]?.country}</strong> — 평균 점수{" "}
            <strong>{sortedCountry[0]?.avg}</strong>점
          </HighlightText>
        </HighlightBox>
      </ChartCard>

      {/* 국가별 통계 */}
      <ChartCard
        onClick={() => navigate("/administrator/statistics/summary/country")}
      >
        <Title>국가별 통계</Title>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={countryData.slice(0, 5)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="country" />
            <YAxis domain={[0, 5]} />
            <Tooltip />
            <Bar dataKey="avg" fill="#4caf50" barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* 카테고리별 통계 */}
      <ChartCard
        onClick={() => navigate("/administrator/statistics/summary/category")}
      >
        <Title>카테고리별 통계</Title>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 5]} />
            <Tooltip />
            <Bar dataKey="avg" fill="#2196f3" barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </Grid>
  );
};

export default StatisticsPreviewGrid;
