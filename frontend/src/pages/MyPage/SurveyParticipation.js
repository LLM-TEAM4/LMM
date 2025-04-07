
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LogoImg from "../../assets/img/logo.png";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import KoreaFlag from "../../assets/img/korea.png";
import ChinaFlag from "../../assets/img/china.png";
import JapanFlag from "../../assets/img/japan.png";
import MypageLayout from "../../layouts/MypageLayout";

ChartJS.register(ArcElement, Tooltip);

const chartData = [
  { country: "한국", data: [70, 30] },
  { country: "중국", data: [50, 50] },
  { country: "일본", data: [60, 40] },
];

const colors = {
  backgroundColor: ["#FF4D4D", "#FFC04D"],
  hoverBackgroundColor: ["#FF6666", "#FFD166"],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false, // 개별 차트의 범례 제거
    },
  },
};
const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;


const Content = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 15px;
  font-size: 14px;
  min-height: 600px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Arial, sans-serif;
  height: 100vh;
`;

const FixedHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #ddd;
  z-index: 1000;
`;

const HeaderLogo = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  img {
    width: 150px;
    cursor: pointer;
  }
`;

const NavButtons = styled.div`
  display: flex;
  gap: 30px;
  margin-right: 20px;
`;

const NavButton = styled(Link)`
  padding: 10px 15px;
  font-size: 16px;
  text-decoration: none;
  font-weight: bold;
  color: black;
  background-color: white;
  border: none;
  border-radius: 6px;
  transition: background 0.3s;

  &:hover {
    background-color: #68a0f4;
    color: white;
  }
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  
  width: 100%;
  
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  margin-top: 50px;
  height: calc(100vh - 60px);
`;

const LeftSidebar = styled.div`
  width: 220px;
  padding: 20px;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-right: 1px solid #ddd;
`;

const SidebarButton = styled(Link)`
  display: flex;
  padding: 12px;
  
  font-size: 16px;
  font-weight:bold;
  text-decoration: none;
  color: black;
  background-color:  #F5F5F5;
  border: none;
  border-radius: 6px;
  transition: background 0.3s;
  text-align: left;
  align-items: center;
  justify-content: space-between;
   

  &:hover,
  &.active {
    background-color: #68a0f4;
    color: white;
  }
`;

const RightContent = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  margin-left: 20px;
`;

const TotalResponses = styled.p`
  margin-top: 150px;
  padding: 10px 15px;
  
  display: inline-block;
`;

const LegendWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 14px;
  font-weight: 500;
  margin-left: auto;
  white-space: nowrap;
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
    display: inline-block;
    border-radius: 3px;
  }
`;



const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between; 
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #ddd;  
   
`;

const countryFlags = {
  한국: KoreaFlag,
  중국: ChinaFlag,
  일본: JapanFlag,
};

const totalResponsesCount = chartData.reduce((sum, { data }) => sum + data[0], 0);

const SurveyParticipation = () => {
  const [isSurveyMenuOpen, setSurveyMenuOpen] = useState(false);
  const toggleSurveyMenu = () => {
    setSurveyMenuOpen((prev) => !prev); // 🔹 토글 기능
  };
  return (
<MypageLayout>
      <Content>

          <div style={{
             display: "flex", 
             alignItems: "center", 
             justifyContent: "space-between", 
             width: "100%",  
             }}>

          <TitleWrapper>
            <SectionTitle> 참여 설문</SectionTitle>
            <LegendWrapper>
             <LegendItem color="#FF4D4D">응답</LegendItem>
             <LegendItem color="#FFC04D">미응답</LegendItem>
            </LegendWrapper>
          </TitleWrapper>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: "30px" }}>
            {chartData.map(({ country, data }, index) => (
              <div key={index} style={{ width: "200px", height: "200px", marginTop: "30px" }}>
                <p style={{ 
                  textAlign: "center", 
                  marginTop: "30px", 
                  fontWeight: "600", 
                  fontSize: "15px" ,
                  display: "flex", 
                  flexDirection: "column",  
                  alignItems: "center", 
                  justifyContent: "center"
                  }}>
                <img 
                  src={countryFlags[country]} 
                  alt={`${country} 국기`} 
                  style={{ width: "30px", height: "30px", marginBottom: "5px" }} />
                {country}
                </p>
                <Doughnut data={{ labels: ["응답", "미응답"], datasets: [{ data, backgroundColor: colors.backgroundColor, hoverBackgroundColor: colors.hoverBackgroundColor, marginTop: "30px" }] }} options={options} />
                
                
              </div>
            ))}
          </div>
          <TotalResponses> ⏩ 종합설계1님이 남긴 총 응답 수는 {totalResponsesCount}개 입니다.</TotalResponses>
      </Content>
      </MypageLayout>
  );
};

export default SurveyParticipation;
