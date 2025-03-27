import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LogoImage from "../../assets/img/logo.png";

// 전체 컨테이너
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #fff;
`;

// 로고 스타일
const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;

  img {
    width: 150px;
    margin-right: 10px;
  }
`;

// 소개 문구
const Description = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
`;

// 버튼 공통 스타일
const Button = styled.button`
  width: 300px;
  padding: 15px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
`;

// SNS 시작하기 버튼
const SNSButton = styled(Button)`
  background-color: #fff;
  border: 1px solid #ddd;
  color: #333;
  margin-bottom: 15px;

  &:hover {
    background-color: #f7f7f7;
  }
`;

// 구분선
const Divider = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  margin: 15px 0;
  color: #aaa;
  font-size: 14px;

  &::before,
  &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #ddd;
    margin: 0 10px;
  }
`;

// 아이디로 시작하기 버튼
const IDButton = styled(Button)`
  background-color: #68a0f4;
  color: white;
  border: none;

  &:hover {
    background-color: #4a82d9;
  }
`;

// 로그인 안내 문구
const LoginText = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: #666;

  a {
    text-decoration: none;
    font-weight: bold;
    color: #68a0f4;
  }
`;

class Signup extends React.Component {
  render() {
    return (
      <Container>
        {/* 로고 */}
        <HeaderLogo>
          <img src={LogoImage} alt="로고" /> {/* 이미지 소스 변경 */}
        </HeaderLogo>
        <Description>빠르고 쉽게 계정을 만들어보세요!</Description>

        {/* SNS로 시작하기 버튼 */}
        <Link to="/signupsns">
          <SNSButton>SNS로 시작하기</SNSButton>
        </Link>

        {/* 구분선 */}
        <Divider>OR</Divider>

        {/* 아이디로 시작하기 버튼 */}
        <Link to="/signupid">
          <IDButton>아이디로 시작하기</IDButton>
        </Link>

        {/* 로그인 안내 */}
        <LoginText>
          이미 계정이 있으신가요? <Link to="/login">로그인하기</Link>
        </LoginText>
      </Container>
    );
  }
}

export default Signup;
