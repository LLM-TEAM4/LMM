import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 30px;

  img {
    width: 30px;
    margin-right: 10px;
  }
`;

// 입력 폼 스타일
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

// 입력 필드 스타일
const Input = styled.input`
  padding: 12px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  outline: none;

  &::placeholder {
    color: #aaa;
  }
`;

// 버튼 스타일
const Button = styled.button`
  padding: 15px;
  background-color: #68a0f4;
  color: white;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #4a82d9;
  }
`;

// 하단 회원가입 문구
const SignupText = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: #666;

  a {
    text-decoration: none;
    font-weight: bold;
    color: #68a0f4;
  }
`;

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("로그인 시도:", this.state);
    // 이후 API 요청 코드 추가 가능
  };

  render() {
    return (
      <Container>
        {/* 로고 */}
        <Logo>
          <img src="/logo.png" alt="logo" /> Survey Archive
        </Logo>

        {/* 로그인 폼 */}
        <Form onSubmit={this.handleSubmit}>
          <label>아이디</label>
          <Input
            type="text"
            name="email"
            placeholder="아이디를 입력해주세요."
            value={this.state.email}
            onChange={this.handleChange}
            autoComplete="off"
          />
          <label>비밀번호</label>
          <Input
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요."
            value={this.state.password}
            onChange={this.handleChange}
            autoComplete="off"
          />
          <Button type="submit">시작하기</Button>
        </Form>

        {/* 회원가입 안내 */}
        <SignupText>
          계정이 없으신가요? <Link to="/signup">계정 만들기</Link>
        </SignupText>
      </Container>
    );
  }
}

export default Login;
