import React, { useState } from "react";
import styled from "styled-components";
import LogoImage from "../../assets/img/logo.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #fff;
`;

const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;

  img {
    width: 150px;
    margin-right: 10px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

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

const PasswordHint = styled.p`
  font-size: 12px;
  color: #888;
  margin: 5px 0 15px;
  display: flex;
  align-items: center;

  &::before {
    content: "✔";
    color: green;
    margin-right: 5px;
  }
`;

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

const LoginText = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: #666;
  text-align: center;

  a {
    text-decoration: none;
    font-weight: bold;
    color: #68a0f4;
  }
`;

const SignupID = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("회원가입 정보:", { id, password });
  };

  return (
    <Container>
      <HeaderLogo>
        <img src={LogoImage} alt="로고" /> {/* 이미지 소스 변경 */}
      </HeaderLogo>

      <p>빠르고 쉽게 계정을 만들어보세요!</p>

      {/* 회원가입 폼 */}
      <Form onSubmit={handleSubmit}>
        <label>아이디</label>
        <Input
          type="text"
          placeholder="아이디를 입력해주세요."
          value={id}
          onChange={(e) => setId(e.target.value)}
          autoComplete="off"
        />
        <label>비밀번호</label>
        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
        />
        <PasswordHint>문자 + 숫자 조합 6자 이상</PasswordHint>
        <Button type="submit">간편하게 시작하기</Button>
      </Form>

      <LoginText>
        이미 계정이 있으신가요? <a href="/login">로그인하기</a>
      </LoginText>
    </Container>
  );
};

export default SignupID;
