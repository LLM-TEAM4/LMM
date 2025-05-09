// 국가별 통계
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
  height: 450px;
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

const CountryStatisticsPage = () => {
  const navigate = useNavigate();
  const countryStats = {};

  surveyData.forEach((s) => {
    const votes = Object.values(s.votes || {}).flatMap((voteObj) =>
      Object.entries(voteObj).flatMap(([score, count]) =>
        Array(Number(count)).fill(Number(score))
      )
    );
    const avg =
      votes.length > 0 ? votes.reduce((a, b) => a + b, 0) / votes.length : 0;

    if (!countryStats[s.country]) countryStats[s.country] = [];
    countryStats[s.country].push(avg);
  });

  const countryAverages = Object.entries(countryStats).map(
    ([country, avgs]) => ({
      country,
      average: Number(
        (avgs.reduce((a, b) => a + b, 0) / avgs.length).toFixed(2)
      ),
    })
  );

  const sortedData = [...countryAverages].sort((a, b) => a.average - b.average);

  const getColor = (value) => {
    if (value < 2.5) return "#f44336";
    if (value < 3.5) return "#ff9800";
    return "#4caf50";
  };

  return (
    <>
      <Header />
      <Container>
        <Title>국가별 평균 응답 점수</Title>
        <Subtitle>
          점수가 낮을수록 해당 국가 이미지에 대해 생성형 AI의 문화적 편향성이
          높게 나타난 것을 의미합니다.
        </Subtitle>

        <ChartWrapper>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sortedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="country" />
              <YAxis domain={[0, 5]} tickCount={6} />
              <Tooltip
                formatter={(value) => `${value}점`}
                labelFormatter={(label) => `국가: ${label}`}
              />
              <Bar dataKey="average" barSize={30}>
                {sortedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getColor(entry.average)} />
                ))}
              </Bar>
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
