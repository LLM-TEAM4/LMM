// src/components/CommonHeader.js
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import LogoImg from "../assets/img/logo.png";

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 60px;
  border-bottom: 1px solid #ddd;
  z-index: 1000;
`;

const HeaderLogo = styled.div`
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;

  img {
    width: 180px;
  }
`;

const NavButtons = styled.nav`
  display: flex;
  gap: 30px;
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
  transition: background 0.3s, color 0.3s;
  text-align: center;

  &:hover {
    background-color: #68a0f4;
    color: white;
  }

  &.active {
    background-color: #68a0f4;
    color: white;
  }
`;

const CommonHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <HeaderWrapper>
      <HeaderLogo onClick={() => navigate("/mainpage")}>
        <img src={LogoImg} alt="로고" />
      </HeaderLogo>
      <NavButtons>
        <NavButton to="/survey" className={location.pathname === "/survey" ? "active" : ""}>
          🔍설문조사
        </NavButton>
        <NavButton to="/ranking" className={location.pathname === "/ranking" ? "active" : ""}>
          🏅랭킹조회
        </NavButton>
        <NavButton to="/mypage" className={location.pathname === "/mypage" ? "active" : ""}>
          👤
        </NavButton>
      </NavButtons>
    </HeaderWrapper>
  );
};

export default CommonHeader;
