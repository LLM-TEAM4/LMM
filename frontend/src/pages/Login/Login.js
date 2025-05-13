// ✅ Login.js - 서버 연동 로그인 구현
import React, { Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import LogoImage from "../../assets/img/logo.png";
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

function withRouter(Component) {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

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
  margin-bottom: 20px;

  img {
    width: 150px;
    margin-right: 10px;
  }
`;

// ✅ 설명문 하늘색 박스 추가
const DescriptionBox = styled.div`
  background-color: #eaf3ff;
  padding: 16px;
  border-radius: 10px;
  margin-bottom: 20px;
  width: 320px;
  font-size: 14px;
  color: #333;
  text-align: center;
  line-height: 1.5;
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

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: email.trim(),
          password: password.trim().replace(/\n/g, ""),
        }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ 로그인 실패 응답:", errorData);
        alert(errorData.message || "로그인 실패");
        return;
      }

      const data = await response.json();
      console.log("✅ 로그인 성공:", data);

      if (data.role === "admin") {
        alert("관리자로 로그인되었습니다.");
        this.props.navigate("/administrator");
      } else {
        alert("로그인에 성공했습니다.");
        this.props.navigate("/survey");
      }
    } catch (error) {
      console.error("❌ 로그인 오류:", error);
      alert("서버 오류로 로그인에 실패했습니다.");
    }
  };

  render() {
    return (
      <Container>
        <HeaderLogo>
          <img src={LogoImage} alt="로고" />
        </HeaderLogo>

        {/* ✅ 설명문 하늘색 박스 */}
        <DescriptionBox>
         <strong>생성한 계정으로 로그인을 진행해주세요 😊</strong> 
        </DescriptionBox>

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

        <SignupText>
          계정이 없으신가요? <Link to="/signup">계정 만들기</Link>
        </SignupText>
      </Container>
    );
  }
}

export default withRouter(Login);
