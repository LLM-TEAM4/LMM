import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import LogoImage from "../assets/img/logo.png";

const HeaderContainer = styled.header`
  width: 100%;
  height: 44px;
  padding: 16px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.08);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  box-sizing: border-box;
  min-width: 320px;
`;

const LogoWrapper = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;

const LogoImageStyled = styled.img`
  height: 35px;
`;

// ✅ 일반 사용자와 동일한 스타일
const LoginButton = styled(NavLink)`
  padding: 10px 20px;
  border: 1px solid #68a0f4;
  border-radius: 999px;
  font-weight: 600;
  font-size: 16px;
  color: #000;
  background-color: white;
  text-decoration: none;

  &:hover {
    background-color: #f0f6ff;
  }
`;

const AdminHeader = () => {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <LogoWrapper to="/">
        <LogoImageStyled src={LogoImage} alt="로고" />
      </LogoWrapper>
      <LoginButton to="/login">👤</LoginButton>
    </HeaderContainer>
  );
};

export default AdminHeader;
