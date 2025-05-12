// 관리자 메인 대시보드 UI 예시 (승인요청 목록 + 통계 보기)
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "../../components/AdminHeader";
import StatisticsPreviewGrid from "../../components/StatisticsPreviewGrid";
import surveyData from "../../data/SurveyData";

const DashboardContainer = styled.div`
  padding: 100px 40px;
  background-color: #f5f7fa;
  min-height: 100vh;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-size: 20px;
  margin-bottom: 15px;
`;

const Description = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: #649eff;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  font-weight: bold;
  align-self: flex-start;

  &:hover {
    background-color: #4a82d9;
  }
`;

const AdminDashboard = () => {
  const navigate = useNavigate();

  // 승인 대기 설문 필터링
  const pendingSurveys = surveyData.filter((s) => s.status === "pending");

  return (
    <>
      <Header />
      <DashboardContainer>
        <h1>관리자 페이지</h1>
        <StatisticsPreviewGrid />
      </DashboardContainer>
    </>
  );
};

export default AdminDashboard;
