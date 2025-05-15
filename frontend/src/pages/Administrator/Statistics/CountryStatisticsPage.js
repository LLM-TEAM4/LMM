// ✅ CountryStatisticsPage.js (CSV + JSON 다운로드 드롭다운 반영 및 설문캡션 포함)
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/AdminHeader";
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

const CountryStatisticsPage = () => {
  const navigate = useNavigate();
  const [countryStats, setCountryStats] = useState([]);
  const [allSurveys, setAllSurveys] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/survey/statistics/country-averages", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setCountryStats(data))
      .catch((err) => console.error("국가별 통계 불러오기 실패:", err));

    fetch("http://localhost:4000/survey/all/posted", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setAllSurveys(data))
      .catch((err) => console.error("전체 설문 불러오기 실패:", err));
  }, []);

  const exportCountryDetailCSV = async (countryName) => {
    const surveys = allSurveys.filter((s) => s.country === countryName);
    let csv = "캡션,1점,2점,3점,4점,5점,총 응답\n";

    for (const survey of surveys) {
      const res = await fetch(`http://localhost:4000/survey/${survey._id}`, {
        credentials: "include",
      });
      const detail = await res.json();

      csv += `[설문: ${detail.country} > ${detail.category} > ${detail.entityName}]\n`;

      detail.captions.forEach((caption, i) => {
        const votes = detail.votes?.[i] || {};
        const total = Object.values(votes).reduce((a, b) => a + b, 0);
        const row = [
          caption.replace(/,/g, " "),
          votes[1] || 0,
          votes[2] || 0,
          votes[3] || 0,
          votes[4] || 0,
          votes[5] || 0,
          total,
        ].join(",");
        csv += row + "\n";
      });

      csv += "\n";
    }

    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${countryName}_설문_통계.csv`;
    link.click();
  };

  const exportCountryDetailJSON = async (countryName) => {
    const surveys = allSurveys.filter((s) => s.country === countryName);
    const result = [];

    for (const survey of surveys) {
      const res = await fetch(`http://localhost:4000/survey/${survey._id}`, {
        credentials: "include",
      });
      const detail = await res.json();

      const captions = detail.captions.map((caption, i) => {
        const votes = detail.votes?.[i] || {};
        const total = Object.values(votes).reduce((a, b) => a + b, 0);
        return { caption, votes, total };
      });

      result.push({
        title: `${detail.country} > ${detail.category} > ${detail.entityName}`,
        captions,
      });
    }

    const blob = new Blob([JSON.stringify(result, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${countryName}_설문_통계.json`;
    link.click();
  };

  const getColor = (value) => {
    if (value < 2.5) return "#f44336";
    if (value < 3.5) return "#ff9800";
    return "#4caf50";
  };

  const sortedData = [...countryStats].sort(
    (a, b) => a.averageScore - b.averageScore
  );

  return (
    <>
      <Header />
      <Container>
        <Title>국가별 응답 평균</Title>
        <Subtitle>
          국가별로 응답 평균을 확인할 수 있습니다. 각 카테고리(음식, 의복, 건축,
          게임, 도구)에 대한 응답 평균을 바 차트로 시각화했습니다.
        </Subtitle>

        <div style={{ marginBottom: "30px", textAlign: "right" }}>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            style={{ marginRight: "10px", padding: "8px", fontSize: "14px" }}
          >
            <option value="">국가 선택</option>
            {countryStats.map((c) => (
              <option key={c.country} value={c.country}>
                {c.country}
              </option>
            ))}
          </select>
          <button
            onClick={() => selectedCountry && exportCountryDetailCSV(selectedCountry)}
            style={{
              backgroundColor: "#4a82d9",
              color: "white",
              padding: "8px 16px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
              marginRight: "10px",
            }}
          >
            CSV 다운로드
          </button>
          <button
            onClick={() => selectedCountry && exportCountryDetailJSON(selectedCountry)}
            style={{
              backgroundColor: "#4a82d9",
              color: "white",
              padding: "8px 16px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            JSON 다운로드
          </button>
        </div>

        <ChartWrapper>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sortedData} margin={{ bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="country" angle={-15} textAnchor="end" height={60} />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="averageScore" name="평균 점수">
                {sortedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getColor(entry.averageScore)} />
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
