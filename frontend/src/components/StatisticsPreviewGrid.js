// components/StatisticsPreviewGrid.js
import React, { useEffect, useState } from "react";
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
`;

const ChartCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: transform 0.2s;
  height: 250px;
  overflow: hidden;

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

const StatisticsPreviewGrid = () => {
  const navigate = useNavigate();

  const [pendingSurveys, setPendingSurveys] = useState([]);
  const [countryStats, setCountryStats] = useState([]);
  const [categoryStats, setCategoryStats] = useState([]);

  useEffect(() => {
    // 승인 대기 설문
    fetch("http://localhost:4000/survey/all/posted", { credentials: "include" })
      .then(res => res.json())
      .then(data => setPendingSurveys(data.filter(s => s.status === "pending")))
      .catch(err => console.error("❌ 승인 설문 불러오기 실패:", err));

    // 국가별 통계
    fetch("http://localhost:4000/survey/statistics/country-averages", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setCountryStats(data))
      .catch(err => console.error("❌ 국가별 통계 실패:", err));

    // 카테고리별 통계 - 평균 점수 계산 포함
    fetch("http://localhost:4000/survey/statistics/category-averages", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(async data => {
        const processed = await Promise.all(
          data.map(async (item) => {
            const allScores = [];

            for (const survey of item.items) {
              const res = await fetch(`http://localhost:4000/survey/${survey._id}`, {
                credentials: "include",
              });
              const detail = await res.json();

              Object.values(detail.votes || {}).forEach(voteSet => {
                Object.entries(voteSet).forEach(([score, count]) => {
                  allScores.push(...Array(Number(count)).fill(Number(score)));
                });
              });
            }

            const avg =
              allScores.length > 0
                ? (allScores.reduce((a, b) => a + b, 0) / allScores.length).toFixed(2)
                : 0;

            return {
              name: item.category,
              avg: Number(avg),
            };
          })
        );
        setCategoryStats(processed);
      })
      .catch(err => console.error("❌ 카테고리별 통계 실패:", err));
  }, []);

  const sortedCountry = [...countryStats]
    .map(d => ({ country: d.country, avg: d.averageScore }))
    .sort((a, b) => a.avg - b.avg);

  return (
    <Grid>
      {/* 승인 요청 카드 */}
      <ChartCard onClick={() => navigate("/administrator/requests")}>
        <Title>승인 요청된 설문조사</Title>
        <p style={{ fontSize: "14px", marginBottom: "16px" }}>
          총 <strong>{pendingSurveys.length}</strong>개의 설문이 승인 대기 중입니다.
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

      {/* 전체 통계 요약 */}
      <ChartCard onClick={() => navigate("/administrator/statistics/summary/overall")}>
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
      <ChartCard onClick={() => navigate("/administrator/statistics/summary/country")}>
        <Title>국가별 통계</Title>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={sortedCountry.slice(0, 5)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="country" />
            <YAxis domain={[0, 5]} />
            <Tooltip />
            <Bar dataKey="avg" fill="#4caf50" barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* 카테고리별 통계 */}
      <ChartCard onClick={() => navigate("/administrator/statistics/summary/category")}>
        <Title>카테고리별 통계</Title>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={categoryStats}>
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
