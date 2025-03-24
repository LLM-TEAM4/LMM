import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// 스타일 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const Logo = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  position: absolute;
  right: 80px; /* 버튼을 왼쪽으로 이동 */
`;

const Button = styled(Link)`
  padding: 10px 15px;
  background-color: #68a0f4; /* 버튼 색상 변경 */
  color: white;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  text-align: center;

  &:hover {
    background-color: #4a82d9; /* 호버 시 약간 어두운 색 */
  }
`;

class Main extends React.Component {
  render() {
    return (
      <Container>
        {/* 상단 헤더 (로고 + 로그인 + 시작하기) */}
        <Header>
          <Logo>Survey Archive</Logo>
          <ButtonGroup>
            <Button to="/login">로그인</Button>
            <Button to="/signup">시작하기</Button>
          </ButtonGroup>
        </Header>
      </Container>
    );
  }
}

export default Main;
