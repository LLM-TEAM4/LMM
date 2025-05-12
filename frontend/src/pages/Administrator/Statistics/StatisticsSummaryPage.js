import React, { useState } from "react";
import styled from "styled-components";
import AdminStatisticsLayout from "../../../layouts/AdminStatisticsLayout";
import CountryStatisticsPage from "./CountryStatisticsPage";
import CategoryStatisticsPage from "./CategoryStatisticsPage";
import OverallStatisticsPage from "./OverallStatisticsPage";
import AdminHeader from "../../../components/AdminHeader";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StatisticsSummaryPage = () => {
  const [activeMenu, setActiveMenu] = useState(() => {
    return localStorage.getItem("adminStatisticsActiveTab") || "country";
  });

  const handleMenuChange = (menu) => {
    setActiveMenu(menu);
    localStorage.setItem("adminStatisticsActiveTab", menu);
  };

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
    <AdminStatisticsLayout activeMenu={activeMenu} onMenuChange={handleMenuChange}>
      <PageWrapper>{renderContent()}</PageWrapper>
    </AdminStatisticsLayout>
  );
};

export default StatisticsSummaryPage;
