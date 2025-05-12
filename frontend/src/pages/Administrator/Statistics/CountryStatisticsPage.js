// CountryStatisticsPage.js
import React from "react";
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
  Cell,
} from "recharts";

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

const CountryStatisticsPage = () => {
  const navigate = useNavigate();
  const countryMap = {};

  surveyData.forEach((s) => {
    if (!countryMap[s.country]) {
      countryMap[s.country] = {
        cuisine: [],
        clothes: [],
        architecture: [],
        game: [],
        tooleh: [],
      };
    }
    if (countryMap[s.country][s.category]) {
      countryMap[s.country][s.category].push(aggregateScores(s.votes));
    }
  });

  const chartData = Object.entries(countryMap).map(([country, categories]) => {
    const avg = (arr) =>
      arr.length > 0
        ? Number((arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2))
        : 0;
    return {
      country,
      cuisine: avg(categories.cuisine),
      clothes: avg(categories.clothes),
      architecture: avg(categories.architecture),
      game: avg(categories.game),
      tooleh: avg(categories.tooleh),
    };
  });

  return (
    <>
      <Header />
      <Container>
        <Title>국가별 응답 평균</Title>
        <Subtitle>
          국가별로 응답 평균을 확인할 수 있습니다. 각 카테고리(음식, 의복, 건축,
          게임, 도구)에 대한 응답 평균을 바 차트로 시각화했습니다.
        </Subtitle>

        <ChartWrapper>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="country"
                angle={-15}
                textAnchor="end"
                height={60}
              />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="architecture" fill="#007b83" name="Architecture" />
              <Bar dataKey="clothes" fill="#f2aa00" name="Clothing" />
              <Bar dataKey="cuisine" fill="#e16162" name="Food" />
              <Bar dataKey="game" fill="#6a1b9a" name="Game" />
              <Bar dataKey="tool" fill="#00796b" name="Tool" />
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>

        <BackButton onClick={() => navigate(-1)}>
          ← 목록으로 돌아가기
        </BackButton>
      </Container>
    </>
  );
};

export default CountryStatisticsPage;
