// CountryStatisticsPage.js
import React, { useState, useEffect } from "react";
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
  const [countryStats, setCountryStats] = useState([]);
  const [totalSurveys, setTotalSurveys] = useState(0);
  const [totalParticipants, setTotalParticipants] = useState(0);

  const countryMap = {};

  surveyData.forEach((s) => {
    if (!countryMap[s.country]) {
      countryMap[s.country] = {
        cuisine: [],
        clothes: [],
        architecture: [],
        game: [],
        tool: [], // ✅ 수정
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
      tool: avg(categories.tool), // ✅ 수정
    };
  });

  useEffect(() => {
    fetch("http://localhost:4000/survey/statistics/country-averages", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ 서버 응답 데이터:", data);
        setCountryStats(data);
      })
      .catch((err) => console.error("국가별 통계 불러오기 실패:", err));

    fetch("http://localhost:4000/survey/statistics/summary", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setTotalSurveys(data.totalSurveys);
        setTotalParticipants(data.totalParticipants);
      })
      .catch((err) => console.error("통계 요약 불러오기 실패:", err));
  }, []);

  const sortedData = [...countryStats].sort(
    (a, b) => a.averageScore - b.averageScore
  );

  const getColor = (value) => {
    if (value < 2.5) return "#f44336";
    if (value < 3.5) return "#ff9800";
    return "#4caf50";
  };

  const exportData = (type) => {
    const data = sortedData;

    if (type === "json") {
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "country_statistics.json";
      link.click();
    } else if (type === "csv") {
      let csv = "국가,평균 점수,총 설문 수,총 응답자 수\n";
      data.forEach((item) => {
        csv += `${item.country},${item.averageScore},${
          item.totalSurveys ?? "없음"
        },${item.totalParticipants ?? "없음"}\n`;
      });
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "country_statistics.csv";
      link.click();
    }
  };

  // 카테고리별 평균 계산 함수
  const getCategoryAvg = (key) => {
    const all = chartData
      .map((item) => item[key])
      .filter((val) => typeof val === "number" && !isNaN(val));
    const sum = all.reduce((a, b) => a + b, 0);
    return all.length > 0 ? (sum / all.length).toFixed(2) : "0.00";
  };

  return (
    <>
      <Header />

      {/* 상단 국가별 카테고리별 평균 점수 차트 */}
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

        {/* 카테고리별 평균과 편향성이 낮은 국가 정보 요약 */}
        <div
          style={{
            marginTop: "30px",
            fontSize: "15px",
            color: "#444",
            lineHeight: "1.6",
          }}
        >
          {chartData.length > 0 && (
            <>
              <p>📊 각 카테고리별 국가 평균 응답 점수는 다음과 같습니다.</p>
              <ul style={{ marginLeft: "20px", marginBottom: "10px" }}>
                <li>
                  음식 (cuisine): <strong>{getCategoryAvg("cuisine")}</strong>점
                </li>
                <li>
                  의복 (clothes): <strong>{getCategoryAvg("clothes")}</strong>점
                </li>
                <li>
                  건축 (architecture):{" "}
                  <strong>{getCategoryAvg("architecture")}</strong>점
                </li>
                <li>
                  게임 (game): <strong>{getCategoryAvg("game")}</strong>점
                </li>
                <li>
                  도구 (tool): <strong>{getCategoryAvg("tool")}</strong>점
                </li>
              </ul>
              <p>
                📉 <strong>{sortedData[0]?.country}</strong>은 평균 점수{" "}
                <strong>{sortedData[0]?.averageScore}</strong>점으로 가장 낮은
                응답을 기록하였습니다. 이는 해당 국가가 타 문화에 대해
                상대적으로 더 큰 편향성을 가지고 있을 가능성이 있음을
                시사합니다.
              </p>
            </>
          )}
        </div>

        <BackButton onClick={() => navigate(-1)}>
          ← 목록으로 돌아가기
        </BackButton>
      </Container>
    </>
  );
};

export default CountryStatisticsPage;
