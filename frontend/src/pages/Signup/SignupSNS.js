import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import naverLogo from "../../assets/img/naver.png";
import kakaoLogo from "../../assets/img/kakao.png";
import googleLogo from "../../assets/img/google.png";
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
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  background-color: #fff;
  margin-bottom: 10px;

  &:hover {
    background-color: #f7f7f7;
  }

  img {
    width: 20px;
    margin-right: 10px;
  }
`;

const GoogleButton = styled(Button)`
  img {
    width: 30px; // 기존보다 크게 설정
    height: 20px;
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

class SignupSNS extends React.Component {
  render() {
    return (
      <Container>
        {/* 로고 */}
        <HeaderLogo>
          <img src={LogoImage} alt="로고" /> {/* 이미지 소스 변경 */}
        </HeaderLogo>
        <Description>빠르고 쉽게 계정을 만들어보세요!</Description>

        {/* SNS 버튼 */}
        <Button>
          <img src={naverLogo} alt="네이버" /> 네이버로 시작하기
        </Button>
        <Button>
          <img src={kakaoLogo} alt="카카오" /> 카카오로 시작하기
        </Button>
        <GoogleButton>
          <img src={googleLogo} alt="구글" /> 구글로 시작하기
        </GoogleButton>

        {/* 로그인 안내 */}
        <LoginText>
          이미 계정이 있으신가요? <Link to="/login">로그인하기</Link>
        </LoginText>
      </Container>
    );
  }
}

export default SignupSNS;
