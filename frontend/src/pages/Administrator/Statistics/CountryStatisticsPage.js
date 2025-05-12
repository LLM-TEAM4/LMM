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

  return (
    <Container>
  <Title>국가별 평균 응답 점수</Title>
  <Subtitle>
    점수가 낮을수록 해당 국가 이미지에 대해 생성형 AI의 문화적 편향성이
    높게 나타난 것을 의미합니다.
  </Subtitle>

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
