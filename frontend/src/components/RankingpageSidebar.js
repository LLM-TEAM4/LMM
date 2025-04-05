import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

// SurveypageSidebar 스타일에 맞춰 수정된 Sidebar
const Sidebar = styled.div`
  width: 220px;
  padding: 20px 40px;
  border-right: 1px solid #ddd;
  background-color: #ffffff;
`;

// Section 제목 스타일
const SectionTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
`;


// 메뉴 묶음 그룹
const ButtonGroup = styled.div`
  margin-bottom: 40px;
`;

// 버튼 스타일 (SurveypageSidebar의 CheckboxLabel에 맞춤)
const MenuButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 16px;
  line-height: 24px;
  color: #333;
  text-decoration: none;
  padding: 4px 0;

  &:hover {
    color: #649eff;
  }

  &.active {
    font-weight: bold;
    color: #4a82d9;
  }
  padding:10px 10px;
`;

const MypageSidebar = () => {
  const location = useLocation();

  return (
    <Sidebar>
      <SectionTitle>랭킹조회</SectionTitle>
      <ButtonGroup>
        <MenuButton to="/ranking/country" className={location.pathname === "/mypage" ? "active" : ""}>
           나라별
        </MenuButton>
        <MenuButton to="/ranking/category" className={location.pathname === "/mypage/survey-participation" ? "active" : ""}>
           카테고리별
        </MenuButton>
      </ButtonGroup>
    </Sidebar>
  );
};

export default MypageSidebar;
