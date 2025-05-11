import React from "react";
import styled from "styled-components";
import Header from "../../../components/AdminHeader";
import surveyData from "../../../data/SurveyData";
import { useNavigate } from "react-router-dom";

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
  padding: 100px 40px;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

const Title = styled.h1`
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
  margin-bottom: 30px;
`;

const HighlightBox = styled.div`
  background-color: #fff4f4;
  border-left: 6px solid #f44336;
  padding: 20px 25px;
  border-radius: 10px;
  margin-bottom: 30px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
`;

const HighlightTitle = styled.h2`
  font-size: 20px;
  color: #d32f2f;
  margin-bottom: 10px;
`;

const HighlightText = styled.p`
  font-size: 16px;
  color: #555;
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

const ExportButton = styled.button`
  background-color: #4a82d9;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
`;

const OverallStatisticsPage = () => {
  const countryStats = {};
  const navigate = useNavigate();

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

  const sorted = [...countryAverages].sort((a, b) => a.average - b.average);

  const getColor = (value) => {
    if (value < 2.5) return "#f44336";
    if (value < 3.5) return "#ff9800";
    return "#4caf50";
  };
  const exportData = (type) => {
    const data = sorted; // 국가별 평균 점수 정렬된 배열

    if (type === "json") {
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "overall_statistics.json";
      link.click();
    } else if (type === "csv") {
      let csv = "국가,평균 점수\n";
      data.forEach((item) => {
        csv += `${item.country},${item.average}\n`;
      });

      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "overall_statistics.csv";
      link.click();
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Title>전체 설문 요약 통계</Title>
        <Subtitle>
          국가별 평균 응답 점수를 기반으로 생성형 AI의 문화적 편향 정도를
          시각화합니다. 평균 점수가 낮을수록 편향성이 더 큽니다.
        </Subtitle>

        {/* 가장 편향성 높은 국가 강조 */}
        <HighlightBox>
          <HighlightTitle>📉 가장 편향성이 큰 국가</HighlightTitle>
          <HighlightText>
            <strong>{sorted[0]?.country}</strong> — 평균 점수{" "}
            <strong>{sorted[0]?.average}</strong>점
          </HighlightText>
        </HighlightBox>

        <div style={{ marginBottom: "30px", textAlign: "right" }}>
          <ExportButton onClick={() => exportData("csv")}>
            CSV로 내보내기
          </ExportButton>
          <ExportButton
            onClick={() => exportData("json")}
            style={{ marginLeft: "10px" }}
          >
            JSON으로 내보내기
          </ExportButton>
        </div>

        {/* 국가별 평균 응답 점수 그래프 */}
        <ChartWrapper>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sorted}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="country" />
              <YAxis domain={[0, 5]} tickCount={6} />
              <Tooltip
                formatter={(value) => `${value}점`}
                labelFormatter={(label) => `국가: ${label}`}
              />
              <Bar dataKey="average" barSize={40}>
                {sorted.map((entry, index) => (
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

export default OverallStatisticsPage;
