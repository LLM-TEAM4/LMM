// 요소별, 캡션별 통계

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import Header from "../../../components/AdminHeader";
import surveyData from "../../../data/SurveyData";

const Container = styled.div`
  padding: 100px 40px 40px;
  background-color: #ffffff;
  min-height: 100vh;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
`;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  justify-items: center;
`;

const ChartWrapper = styled.div`
  text-align: center;
`;

const DetailRow = styled.div`
  display: flex;
  margin-top: 40px;
  align-items: flex-start;
  padding-bottom: 30px;
`;

const TextBlock = styled.div`
  flex: 2;
`;

const ImageBlock = styled.div`
  flex: 1;
`;

const DetailTitle = styled.h3`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 8px;
`;

const DetailSubtitle = styled.p`
  font-size: 14px;
  margin-bottom: 16px;
`;

const CaptionItem = styled.p`
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 8px;
`;

const Image = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 10px;
  object-fit: cover;
`;

const ExportWrapper = styled.div`
  position: relative;
  display: inline-block;
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

const Dropdown = styled.div`
  position: absolute;
  top: 40px;
  left: 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  z-index: 3;
  min-width: 150px;
`;

const DropdownItem = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const BackButton = styled.button`
  padding: 10px 20px;
  background-color: #649eff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 40px;

  &:hover {
    background-color: #4a82d9;
  }
`;

const COLORS = ["#8884d8", "#8dd1e1", "#82ca9d", "#ffc658", "#ff7f50"];

const SurveyStatisticsPage = () => {
  const { id } = useParams();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const survey = surveyData.find((s) => String(s._id) === id);

  const votes = {
    0: { 1: 5, 2: 3, 3: 2, 4: 1, 5: 0 },
    1: { 1: 2, 2: 3, 3: 4, 4: 5, 5: 6 },
    2: { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4 },
    3: { 1: 1, 2: 1, 3: 2, 4: 2, 5: 10 },
    4: { 1: 3, 2: 2, 3: 1, 4: 1, 5: 0 },
  };

  const formatChartData = (votesObj) => {
    return [1, 2, 3, 4, 5].map((score) => ({
      name: `${score}점`,
      value: votesObj?.[score] ?? 0,
    }));
  };

  const exportData = (type) => {
    if (!survey) return;

    const exportObj = {
      country: survey.country,
      category: survey.category,
      entityName: survey.entityName,
      captions: survey.captions,
      votes,
    };

    if (type === "json") {
      const blob = new Blob([JSON.stringify(exportObj, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `survey_${id}.json`;
      link.click();
    } else if (type === "csv") {
      let csv = "캡션,1점,2점,3점,4점,5점\n";
      survey.captions.forEach((caption, i) => {
        const v = votes[i] || {};
        csv += `${caption},${v[1] || 0},${v[2] || 0},${v[3] || 0},${
          v[4] || 0
        },${v[5] || 0}\n`;
      });
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `survey_${id}.csv`;
      link.click();
    }

    setShowDropdown(false);
  };

  if (!survey) return <p>설문 정보를 찾을 수 없습니다.</p>;

  return (
    <>
      <Header />
      <Container>
        <TitleRow>
          <SectionTitle>캡션별 응답 분포</SectionTitle>
          <ExportWrapper>
            <ExportButton onClick={() => setShowDropdown(!showDropdown)}>
              내보내기 ⬇
            </ExportButton>
            {showDropdown && (
              <Dropdown>
                <DropdownItem onClick={() => exportData("csv")}>
                  CSV로 내보내기
                </DropdownItem>
                <DropdownItem onClick={() => exportData("json")}>
                  JSON으로 내보내기
                </DropdownItem>
              </Dropdown>
            )}
          </ExportWrapper>
        </TitleRow>

        <DetailRow>
          <ImageBlock>
            <Image src={survey.imageUrl} alt="entity" />
          </ImageBlock>
          <TextBlock>
            <DetailTitle>{survey.entityName}</DetailTitle>
            <DetailSubtitle>
              {survey.country} / {survey.category}
            </DetailSubtitle>
            {survey.captions.map((cap, i) => (
              <CaptionItem key={i}>- {cap}</CaptionItem>
            ))}
          </TextBlock>
        </DetailRow>

        <ChartGrid>
          {survey.captions.map((caption, idx) => {
            const chartData = formatChartData(votes[idx]);
            return (
              <ChartWrapper key={idx}>
                <h4>캡션 {idx + 1}</h4>
                <ResponsiveContainer width={180} height={180}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={70}
                      label
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </ChartWrapper>
            );
          })}
        </ChartGrid>
        <BackButton onClick={() => navigate(-1)}>
          ← 목록으로 돌아가기
        </BackButton>
      </Container>
    </>
  );
};

export default SurveyStatisticsPage;
