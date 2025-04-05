import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

// SurveypageSidebar 스타일에 맞춰 수정된 Sidebar
const Sidebar = styled.div`
  width: 220px;
  padding: 20px 40px;
  border-right: 1px solid #ddd;
  background-color: #f0f8ff;
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
      <SectionTitle>마이페이지</SectionTitle>
      <ButtonGroup>
        <MenuButton to="/mypage" className={location.pathname === "/mypage" ? "active" : ""}>
           계정정보
        </MenuButton>
        <MenuButton to="/mypage/survey-participation" className={location.pathname === "/mypage/survey-participation" ? "active" : ""}>
           참여 설문
        </MenuButton>
        <MenuButton to="/mypage/survey-creation" className={location.pathname === "/mypage/survey-creation" ? "active" : ""}>
          설문 등록
        </MenuButton>
        <MenuButton to="/mypage/survey-creation-list" className={location.pathname === "/mypage/survey-creation-list" ? "active" : ""}>
          등록 설문
        </MenuButton>
      </ButtonGroup>
    </Sidebar>
  );
};

export default MypageSidebar;
