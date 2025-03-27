import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import MainImage from "../../assets/img/main.png"; // main.png 이미지 경로로 임포트
import LogoImage from "../../assets/img/logo.png"; // 로고 이미지 경로로 임포트

// 스타일 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
`;

const Header = styled.header`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; /* 로고와 텍스트 사이 간격 */
`;

const HeaderLogo = styled.img`
  width: 150px; /* 로고 크기 키움 */
  height: auto; /* 비율에 맞춰 자동으로 높이 조정 */
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  position: absolute;
  right: 20px; /* 버튼을 오른쪽으로 이동 */
`;

const Button = styled(Link)`
  padding: 10px 15px;
  background-color: #68a0f4;
  color: white;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  text-align: center;

  &:hover {
    background-color: #4a82d9;
  }
`;

class Main extends React.Component {
  render() {
    return (
      <Container>
        {/* 상단 헤더 (로고 + 로그인 + 시작하기 버튼) */}
        <Header>
          <LogoContainer>
            <HeaderLogo src={LogoImage} alt="로고" />
          </LogoContainer>
          <ButtonGroup>
            <Button to="/login">로그인</Button>
            <Button to="/signup">시작하기</Button>
          </ButtonGroup>
        </Header>

        {/* 본문 내용 제거하고 이미지만 표시 */}
        <img src={MainImage} alt="Main illustration" width="100%" />
      </Container>
    );
  }
}

export default Main;
