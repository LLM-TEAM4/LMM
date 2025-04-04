// MypageSidebar.js

import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LeftSidebar = styled.div`
  width: 220px;
  padding: 20px;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-right: 1px solid #ddd;

  a:first-child {
    margin-top: 40px;
  }
`;

const SidebarButton = styled(Link)`
  display: flex;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  color: black;
  background-color: #f5f5f5;
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

const MypageSidebar = () => {
  const [isSurveyMenuOpen, setSurveyMenuOpen] = useState(false);

  const toggleSurveyMenu = () => {
    setSurveyMenuOpen((prev) => !prev);
  };

  return (
    <LeftSidebar>
      <SidebarButton to="/mypage">👤 계정정보</SidebarButton>
      <SidebarButton to="/mypage/survey-participation">🔍 참여 설문</SidebarButton>
      <SidebarButton to="/mypage/survey-creation">✏️ 설문 등록</SidebarButton>
      <SidebarButton to="/mypage/survey-creation-list">🗒️ 등록 설문</SidebarButton>
      <SidebarButton as="button" onClick={toggleSurveyMenu}>
      </SidebarButton>
      
    </LeftSidebar>
  );
};

export default MypageSidebar;
