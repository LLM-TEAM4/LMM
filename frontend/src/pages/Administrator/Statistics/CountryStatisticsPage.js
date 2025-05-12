
// CountryStatisticsPage.js
import React from "react";

// 국가별 통계
import React, { useState,useEffect} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/AdminHeader";
import surveyData from "../../../data/SurveyData";
import AdminStatisticsLayout from "../../../layouts/AdminStatisticsLayout";

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
  const [countryStats, setCountryStats] = useState([]);
  const [activeMenu, setActiveMenu] = useState("country");
  const [totalSurveys, setTotalSurveys] = useState(0);
  const [totalParticipants, setTotalParticipants] = useState(0);

  useEffect(() => {
    console.log("🚀 국가별 통계 API 호출 시작");
    fetch("http://localhost:4000/survey/statistics/country-averages", { credentials: "include" })
      .then(res => res.json())
      .then(data => {
      console.log("✅ 서버 응답 데이터:", data);  // 👈 여기에 콘솔 출력 추가
      setCountryStats(data);
    })
      .catch(err => console.error("국가별 통계 불러오기 실패:", err));

      fetch("http://localhost:4000/survey/statistics/summary", { credentials: "include" })
    .then(res => res.json())
    .then(data => {
      setTotalSurveys(data.totalSurveys);
      setTotalParticipants(data.totalParticipants);
    })
    .catch(err => console.error("통계 요약 불러오기 실패:", err));
  }, []);

  const sortedData = [...countryStats].sort((a, b) => a.averageScore - b.averageScore);

  const getColor = (value) => {
    if (value < 2.5) return "#f44336";
    if (value < 3.5) return "#ff9800";
    return "#4caf50";
  };

  const exportData = (type) => {
    
  const data = sortedData;  // 현재 국가별 정렬 데이터

  if (type === "json") {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "country_statistics.json";
    link.click();
  } else if (type === "csv") {
    let csv = "국가,평균 점수,총 설문 수,총 응답자 수\n";
    data.forEach(item => {
      csv += `${item.country},${item.averageScore},${item.totalSurveys ?? "없음"},${item.totalParticipants ?? "없음"}\n`;
    });
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "country_statistics.csv";
    link.click();
  }
};


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

    <Container>
  <Title>국가별 평균 응답 점수</Title>
  <Subtitle>
    점수가 낮을수록 해당 국가 이미지에 대해 생성형 AI의 문화적 편향성이
    높게 나타난 것을 의미합니다.
  </Subtitle>

  {/* 가장 편향성 높은 국가 강조 */}
<div style={{
  backgroundColor: '#fff4f4',
  borderLeft: '6px solid #f44336',
  padding: '20px 25px',
  borderRadius: '10px',
  marginBottom: '30px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.04)'
}}>
  <h2 style={{ fontSize: '20px', color: '#d32f2f', marginBottom: '10px' }}>📉 가장 편향성이 큰 국가</h2>
  <p style={{ fontSize: '16px', color: '#555' }}>
    <strong>{sortedData[0]?.country}</strong> — 평균 점수 <strong>{sortedData[0]?.averageScore}</strong>점
  </p>
</div>



  {/* ✅ 차트는 한 번만 */}
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
        <Bar dataKey="averageScore" barSize={30}>
          {sortedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getColor(entry.averageScore)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </ChartWrapper>

  {/* ✅ 설명은 나라별로 */}
  <div style={{ marginTop: "30px" }}>
    {sortedData.map((entry, index) => (
      <div key={index} style={{ marginBottom: "10px" }}>
        <strong>{entry.country}</strong> - 총 설문 수: {entry.totalSurveys ?? "데이터 없음"}개, 총 응답 사용자 수: {entry.totalParticipants ?? "데이터 없음"}명
      </div>
    ))}
  </div>

  <BackButton onClick={() => navigate(-1)}>
    ← 목록으로 돌아가기
  </BackButton>
</Container>

  );
};
export default CountryStatisticsPage;
