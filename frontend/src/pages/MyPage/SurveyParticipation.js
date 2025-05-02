import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import KoreaFlag from "../../assets/img/korea.png";
import ChinaFlag from "../../assets/img/china.png";
import JapanFlag from "../../assets/img/japan.png";
import MypageLayout from "../../layouts/MypageLayout";

ChartJS.register(ArcElement, Tooltip);

const COUNTRY_ORDER = ["한국", "중국", "일본"];
const COUNTRY_FLAGS = {
  한국: KoreaFlag,
  중국: ChinaFlag,
  일본: JapanFlag,
};
const COLORS = {
  backgroundColor: ["#FF4D4D", "#FFC04D"],
  hoverBackgroundColor: ["#FF6666", "#FFD166"],
};

const SurveyParticipation = () => {
  const [responses, setResponses] = useState([]);
  const [surveys, setSurveys] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:4000/api/auth/me", { credentials: "include" }).then(res => res.json()),
      fetch("http://localhost:4000/survey").then(res => res.json()),
    ]).then(([userData, surveyData]) => {
      if (userData.user) {
        setUserId(userData.user.id);
        setResponses(userData.user.responses || []);
      }
      setSurveys(surveyData || []);
    });
  }, []);

  const surveyMap = new Map(surveys.map(s => [s._id, s]));

  const counts = COUNTRY_ORDER.reduce((acc, country) => {
    acc[country] = 0;
    return acc;
  }, {});

  for (const { surveyId } of responses) {
    const matched = surveyMap.get(surveyId);
    if (matched && matched.country in counts) {
      counts[matched.country]++;
    }
  }

  const chartData = COUNTRY_ORDER.map((country) => ({
    country,
    data: [counts[country], Math.max(0, surveys.filter(s => s.country === country).length - counts[country])],
  }));

  return (
    <MypageLayout>
      <Content>
        <TitleWrapper>
          <SectionTitle>참여 설문</SectionTitle>
          <LegendWrapper>
            <LegendItem color={COLORS.backgroundColor[0]}>응답</LegendItem>
            <LegendItem color={COLORS.backgroundColor[1]}>미응답</LegendItem>
          </LegendWrapper>
        </TitleWrapper>

        <ChartWrapper>
          {chartData.map(({ country, data }) => (
            <ChartItem key={country}>
              <CountryLabel>
                <img src={COUNTRY_FLAGS[country]} alt={country} />
                {country}
              </CountryLabel>
              <Doughnut
                data={{
                  labels: ["응답", "미응답"],
                  datasets: [
                    {
                      data,
                      backgroundColor: COLORS.backgroundColor,
                      hoverBackgroundColor: COLORS.hoverBackgroundColor,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                }}
              />
            </ChartItem>
          ))}
        </ChartWrapper>

        <TotalResponses>⏩ {userId}님이 남긴 총 응답 수는 {responses.length}개 입니다.</TotalResponses>
      </Content>
    </MypageLayout>
  );
};

export default SurveyParticipation;

// ✅ Styled Components
const Content = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 15px;
  font-size: 14px;
  min-height: 600px;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
`;

const LegendWrapper = styled.div`
  display: flex;
  gap: 20px;
  font-size: 14px;
  font-weight: 500;
`;

const LegendItem = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  &::before {
    content: "";
    width: 14px;
    height: 14px;
    background-color: ${(props) => props.color};
    border-radius: 3px;
    display: inline-block;
  }
`;

const ChartWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 30px;
`;

const ChartItem = styled.div`
  width: 200px;
  height: 200px;
`;

const CountryLabel = styled.p`
  text-align: center;
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 30px;
    height: 30px;
    margin-bottom: 5px;
  }
`;

const TotalResponses = styled.p`
  margin-top: 100px;
  font-size: 15px;
  font-weight: bold;
`;
