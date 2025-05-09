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
    fetch("http://localhost:4000/api/auth/me", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setResponses(data.user.responses || []);
      }); 

    fetch("http://localhost:4000/survey",{
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setSurveys(data));
  }, []);

  const surveyMap = new Map();
  surveys.forEach((s) => surveyMap.set(s._id, s));

  const participatedSurveys = responses
    .map((r) => surveyMap.get(r.surveyId))
    .filter(Boolean);

  // ✅ 나라별 참여/미참여 차트 데이터 구성
  const countryGroups = {};
  surveys.forEach((s) => {
    if (!countryGroups[s.country]) {
      countryGroups[s.country] = { total: 0, participated: 0 };
    }
    countryGroups[s.country].total += 1;
  });

  responses.forEach((r) => {
    const s = surveyMap.get(r.surveyId);
    if (s && countryGroups[s.country]) {
      countryGroups[s.country].participated += 1;
    }
  });

  const countryCharts = Object.entries(countryGroups).map(([country, stats]) => {
    return {
      country,
      data: [
        { name: "응답", value: stats.participated },
        { name: "미응답", value: stats.total - stats.participated },
      ],
    };
  });

  return (
    <MypageLayout>
      <Wrapper>
        <CommonHeader />
        <Container>
          <h2>나의 설문 응답 현황</h2>

          <ChartRow>
            {countryCharts.map((chart, index) => (
              <ChartBox key={index}>
                <h4>{chart.country}</h4>
                <PieChart width={200} height={200}>
                  <Pie
                    data={chart.data}
                    dataKey="value"
                    outerRadius={80}
                    label
                  >
                    {chart.data.map((_, i) => (
                      <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ChartBox>
            ))}
          </ChartRow>

          <ParticipatedSection>
            <h3>📌 참여한 설문 목록</h3>
            <p>총 참여 설문 수: {participatedSurveys.length}</p>
            {participatedSurveys.length === 0 ? (
              <p>아직 참여한 설문이 없습니다.</p>
            ) : (
              <SurveyList>
                {participatedSurveys.map((s) => (
                  <SurveyCard key={s._id}>
                    <img src={s.imageUrl} alt={s.entityName} />
                    <div>
                      <strong>{`${s.country} > ${s.category} > ${s.entityName}`}</strong>
                      <p>
                        응답한 문항 수: {responses.find((r) => r.surveyId === s._id)?.answers.length || 0}
                      </p>
                    </div>
                  </SurveyCard>
                ))}
              </SurveyList>
            )}
          </ParticipatedSection>
        </Container>
      </Wrapper>
    </MypageLayout>
  );
};

export default SurveyParticipation;

const Wrapper = styled.div`
  padding: 20px;
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
  text-align: center;
`;

const ParticipatedSection = styled.div`
  margin-top: 60px;
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
