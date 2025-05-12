import React from "react";
import styled from "styled-components";
import AdminHeader from "../components/AdminHeader";
import { useNavigate } from "react-router-dom";

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
  margin-top:40px;

`;

const SidebarTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 20px;
`;

const MenuItem = styled.div`
  padding: 10px 0;
  cursor: pointer;
  color: #333;
  &:hover {
    color: #649eff;
  }
`;

const RightContent = styled.div`
  flex: 1;
  
`;



const AdminStatisticsLayout = ({ children, activeMenu, onMenuChange  }) => {
  const navigate = useNavigate();

  return (
    <LayoutWrapper>
      <AdminHeader />
      <ContentWrapper>
        <Sidebar>
          <SidebarTitle>통합 통계</SidebarTitle>
          <MenuItem $active={activeMenu === "country"} onClick={() => onMenuChange("country")}>
  국가별 통계
</MenuItem>
<MenuItem $active={activeMenu === "category"} onClick={() => onMenuChange("category")}>
  카테고리별 통계
</MenuItem>

</Sidebar>
        <RightContent>
          {children}
        </RightContent>
      </ContentWrapper>
    </LayoutWrapper>
  );
};

export default AdminStatisticsLayout;
