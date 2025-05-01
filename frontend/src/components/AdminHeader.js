import React from "react";
import { NavLink } from "react-router-dom";
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

const AdminHeader = () => {
  return (
    <HeaderContainer>
      <LogoWrapper>
        <LogoImageStyled src={LogoImage} alt="로고" />
      </LogoWrapper>
    </HeaderContainer>
  );
};

export default AdminHeader;
