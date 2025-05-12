import React, { useState } from "react";
import styled from "styled-components";
import AdminStatisticsLayout from "../../../layouts/AdminStatisticsLayout";
import CountryStatisticsPage from "./CountryStatisticsPage";
import CategoryStatisticsPage from "./CategoryStatisticsPage";
import OverallStatisticsPage from "./OverallStatisticsPage";
import AdminHeader from "../../../components/AdminHeader";


const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #f4f6fa;
  padding: 20px;
  border-right: 1px solid #ddd;
  margin-top: 50px;
`;

const SidebarTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 20px;
`;

const MenuItem = styled.div`
  padding: 10px 0;
  cursor: pointer;
  color: ${({ active }) => (active ? "#649eff" : "#333")};
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  &:hover {
    color: #649eff;
  }
`;

const RightContent = styled.div`
  flex: 1;
  padding: 40px;
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;


const StatisticsSummaryPage = () => {
  const [activeMenu, setActiveMenu] = useState("country");

  const renderContent = () => {
    switch (activeMenu) {
      case "country":
        return <CountryStatisticsPage />;
      case "category":
        return <CategoryStatisticsPage />;
      case "overall":
        return <OverallStatisticsPage />;
      default:
        return <p>선택된 메뉴가 없습니다.</p>;
    }
  };

  return (
    <AdminStatisticsLayout activeMenu={activeMenu} onMenuChange={setActiveMenu}>
      <PageWrapper>{renderContent()}</PageWrapper>
    </AdminStatisticsLayout>
  );
};

export default StatisticsSummaryPage;
