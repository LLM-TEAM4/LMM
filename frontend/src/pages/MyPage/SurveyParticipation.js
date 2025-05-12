import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import CommonHeader from "../../components/CommonHeader";
import MypageLayout from "../../layouts/MypageLayout";

const COLORS = ["#0088FE", "#FF8042"];

const SurveyParticipation = () => {
  const [responses, setResponses] = useState([]);
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/survey/my", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setResponses(data));

    fetch("http://localhost:4000/survey", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setSurveys(data));
  }, []);

  const surveyMap = new Map();
  surveys.forEach((s) => surveyMap.set(s._id.toString(), s));

  // ✅ 중복 제거된 응답 목록
  const uniqueResponsesMap = new Map();
  responses
  .filter((r) => r.surveyId && r.surveyId._id)  // ✅ Null 체크 추가
  .forEach((r) => {
    const key = r.surveyId._id.toString();
    if (!uniqueResponsesMap.has(key)) {
      uniqueResponsesMap.set(key, r);
    }
  });


  // ✅ 나라별 참여/미참여 카운트 초기화
  const countryGroups = {};
  surveys.forEach((s) => {
    if (!countryGroups[s.country]) {
      countryGroups[s.country] = { total: 0, participated: 0 };
    }
    countryGroups[s.country].total += 1;
  });

  // ✅ 중복 없는 응답 기준으로 참여 카운트
  [...uniqueResponsesMap.values()].forEach((r) => {
    const surveyKey = r.surveyId && r.surveyId._id && r.surveyId._id.toString();
    const s = surveyMap.get(surveyKey);
    if (s && countryGroups[s.country]) {
      countryGroups[s.country].participated += 1;
    }
  });

  const countryCharts = Object.entries(countryGroups).map(([country, stats]) => ({
    country,
    data: [
      { name: "응답", value: stats.participated },
      { name: "미응답", value: stats.total - stats.participated },
    ],
  }));

  return (
    <MypageLayout>
      <CommonHeader />
      <Wrapper>
        
        
        <SectionTitle>📌 설문 응답 현황</SectionTitle>
        <SectionCard>
        

          <ChartRow>
            {countryCharts.map((chart, index) => (
              <ChartBox key={index}>
                <h4>{chart.country}</h4>
                <PieChart width={200} height={200}>
                  <Pie data={chart.data} dataKey="value" outerRadius={80} label>
                    {chart.data.map((_, i) => (
                      <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ChartBox>
            ))}
          </ChartRow>
          </SectionCard>
          <SectionTitle>📌 참여한 설문 목록</SectionTitle>
          <SectionCard>

          <ParticipatedSection>    
            <p>총 참여 설문 수: {uniqueResponsesMap.size}</p>
            {uniqueResponsesMap.size === 0 ? (
              <p>아직 참여한 설문이 없습니다.</p>
            ) : (
              <SurveyList>
                {[...uniqueResponsesMap.values()].map((r) => (
                  <SurveyCard key={r.surveyId._id}>
                    <img src={r.surveyId.imageUrl} alt={r.surveyId.entityName} />
                    <div>
                      <strong>{`${r.surveyId.country} > ${r.surveyId.category} > ${r.surveyId.entityName}`}</strong>
                      <p>응답한 문항 수: {r.answers.length}</p>
                    </div>
                  </SurveyCard>
                ))}
              </SurveyList>
            )}
          </ParticipatedSection>
        
        </SectionCard>
      </Wrapper>
    </MypageLayout>
  );
};

export default SurveyParticipation;

// 스타일 정의
const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  margin-top;50px;

`;

const SectionCard = styled.div`
  background: #f9f9f9;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;


const Wrapper = styled.div`
  padding: 400px 20px 20px 20px;
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const ChartRow = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 40px;
  margin-top: 20px;
  margin-bottom: 60px;
`;

const ChartBox = styled.div`
  margin-botton:30px;
  text-align: center;
  

`;

const ParticipatedSection = styled.div`
  margin-top: 5px;
`;

const SurveyList = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const SurveyCard = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 12px;

  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 6px;
  }

  strong {
    font-size: 16px;
  }

  p {
    margin: 4px 0 0;
    font-size: 14px;
    color: #555;
  }
`;
