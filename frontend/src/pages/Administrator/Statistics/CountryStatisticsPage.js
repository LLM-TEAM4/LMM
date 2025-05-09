// 국가별 통계
import React from "react";
import styled from "styled-components";
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
} from "recharts";

const Container = styled.div`
  padding: 100px 40px 40px;
  background-color: #ffffff;
  min-height: 100vh;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 30px;
`;

const ChartWrapper = styled.div`
  width: 100%;
  height: 400px;
  margin-top: 40px;
`;

const CountryStatisticsPage = () => {
  // 국가별 평균 계산
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

  return (
    <>
      <Header />
      <Container>
        <Title>국가별 평균 응답 점수</Title>

        <ChartWrapper>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={countryAverages}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="country" />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Bar dataKey="average" fill="#649eff" />
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>
      </Container>
    </>
  );
};

export default CountryStatisticsPage;
