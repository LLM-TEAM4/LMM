import React, { useState } from "react";
import styled from "styled-components";
import AdminStatisticsLayout from "../../../layouts/AdminStatisticsLayout";
import CountryStatisticsPage from "./CountryStatisticsPage";
import CategoryStatisticsPage from "./CategoryStatisticsPage";


const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StatisticsSummaryPage = () => {
  const [activeMenu, setActiveMenu] = useState(() => {
  const stored = localStorage.getItem("adminStatisticsActiveTab");
  return stored === "overall" || !stored ? "country" : stored;
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
