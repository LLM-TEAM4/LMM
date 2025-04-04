import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import LogoImage from "../assets/img/logo.png"

const HeaderContainer = styled.header`
  width: 95%;
  height: 55px; /* 👈 명시적 세로 길이 설정 */
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

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;



const LogoImageStyled = styled.img`
  height: 35px; /* 28px → 약 20% 증가 */
`;


const NavLinks = styled.nav`
  display: flex;
  gap: 28px; /* 24px → 28px */
  justify-content: center;
  flex: 2;
  min-width: 0;
  overflow: hidden;
`;


const NavItem = styled(Link)`
  font-size: 14px; /* 16px → 19px */
  font-weight: 500;
  color: #222;
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    color: #000;
  }
`;


const LoginButton = styled(Link)`
  padding: 10px 20px; /* 8px 16px → 확대 */
  border: 1px solid #68a0f4;
  border-radius: 999px;
  font-weight: 600;
  font-size: 16px; /* 14px → 17px */
  color: #000;
  background-color: white;
  text-decoration: none;

  &:hover {
    background-color: #f0f6ff;
  }
`;


const LoginWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-shrink: 0;
`;

const StyledNavLink = styled(NavLink)`
  font-size: 14px;
  font-weight: 500;
  color: #222;
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    color: #000;
  }

  &.active {
    color: #2b74ff; /* Example active state color */
    font-weight: 700;
  }
`;



const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <HeaderContainer>
      <LogoWrapper as={Link} to="/main">
        <LogoImageStyled src={LogoImage} alt="로고" />
      </LogoWrapper>

      <NavButtons>
        <NavButton to="/survey" className={location.pathname === "/survey" ? "active" : ""}>
          진행 중인 설문조사
        </NavButton>
        <NavButton to="/ranking" className={location.pathname === "/ranking" ? "active" : ""}>
          사용자 랭킹 조회
        </NavButton>
        <NavButton to="/mypage" className={location.pathname === "/mypage" || location.pathname === '/mypage/survey-participation' || location.pathname === '/mypage/survey-creation' || location.pathname === '/mypage/survey-creation-list' || location.pathname === '/mypage/survey-creation-detail' ? "active" : ""}>
          마이 페이지
        </NavButton>
      </NavButtons>

      <LoginWrapper>
        <LoginButton to="/login">로그인</LoginButton>
      </LoginWrapper>
    </HeaderContainer>
  );
};


export default Header;
