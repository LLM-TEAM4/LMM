import React, { useEffect, useState } from "react";
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

const CategoryStatisticsPage = () => {
  const navigate = useNavigate();
  const [categoryStats, setCategoryStats] = useState([]);
  const [rawStats, setRawStats] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/survey/statistics/category-averages", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(async (data) => {
        setRawStats(data);
        const processed = await Promise.all(
          data.map(async (categoryItem) => {
            const allScores = [];

            for (const survey of categoryItem.items) {
              const res = await fetch(`http://localhost:4000/survey/${survey._id}`, {
                credentials: "include",
              });
              const detail = await res.json();

              Object.values(detail.votes || {}).forEach((voteSet) => {
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
              name: categoryItem.category,
              avg: Number(avg),
            };
          })
        );

        setCategoryStats(processed);
      })
      .catch((err) => console.error("❌ 카테고리별 통계 불러오기 실패:", err));
  }, []);

  const exportCSV = async () => {
    const filteredStats = selectedCategory
      ? rawStats.filter((item) => item.category === selectedCategory)
      : rawStats;

    let csv = "캡션,1점,2점,3점,4점,5점,총 응답\n";

    for (const categoryItem of filteredStats) {
      for (const survey of categoryItem.items) {
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
    }

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${selectedCategory || "전체"}_카테고리_통계.csv`;
    link.click();
  };

  const exportJSON = async () => {
    const filteredStats = selectedCategory
      ? rawStats.filter((item) => item.category === selectedCategory)
      : rawStats;

    const result = [];

    for (const categoryItem of filteredStats) {
      const surveys = [];
      for (const survey of categoryItem.items) {
        const res = await fetch(`http://localhost:4000/survey/${survey._id}`, {
          credentials: "include",
        });
        const detail = await res.json();

        const captions = detail.captions.map((caption, i) => {
          const votes = detail.votes?.[i] || {};
          const total = Object.values(votes).reduce((a, b) => a + b, 0);
          return {
            caption,
            votes,
            total,
          };
        });

        surveys.push({
          title: `${detail.country} > ${detail.category} > ${detail.entityName}`,
          captions,
        });
      }

      result.push({
        category: categoryItem.category,
        surveys,
      });
    }

    const blob = new Blob([JSON.stringify(result, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${selectedCategory || "전체"}_카테고리_통계.json`;
    link.click();
  };

  const filteredChartData = selectedCategory
    ? categoryStats.filter((item) => item.name === selectedCategory)
    : categoryStats;

  const categoryOptions = ["architecture", "clothes", "cuisine", "game", "tool"];

  return (
    <>
      <Header />
      <Container>
        <Title>카테고리별 국가 점수</Title>
        <Subtitle>
          각 문화 카테고리 내에서 국가별로 평가된 생성 이미지의 설명 일치도 평균을 확인할 수 있습니다.
        </Subtitle>

        <div style={{ marginBottom: "30px", textAlign: "right" }}>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ marginRight: "10px", padding: "8px", fontSize: "14px" }}
          >
            <option value="">전체 카테고리</option>
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button
            onClick={exportCSV}
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
            onClick={exportJSON}
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
            <BarChart data={filteredChartData} margin={{ bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-15} textAnchor="end" height={60} />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Bar dataKey="avg" fill="#2196f3" barSize={20} />
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

export default CategoryStatisticsPage;
