// src/components/CommonHeader.js
import React from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import LogoImage from "../assets/img/logo.png";

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

const HeaderLogo = styled.h1`
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;

  img {
    width: 180px;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 30px;

  a {
    text-decoration: none;
    font-size: 16px;
    color: #333;
    transition: color 0.2s;

    &:hover {
      color: #649eff;
    }
  }
`;

const CommonHeader = () => {
  const navigate = useNavigate();

  return (
    <HeaderWrapper>
      <HeaderLogo onClick={() => navigate("/mainpage")}>
        <img src={LogoImage} alt="로고" />
      </HeaderLogo>
      <Nav>
        <Link to="/survey">설문조사</Link>
        <Link to="/ranking">랭킹조회</Link>
        <Link to="/mypage">👤</Link>
      </Nav>
    </HeaderWrapper>
  );
};

export default CommonHeader;
