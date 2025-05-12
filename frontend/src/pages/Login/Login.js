import React, { Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginLogoImage from "../../assets/img/loginlogo.png";

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
  margin-bottom: 30px;

  img {
    width: 150px;
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
    modalMessage: "",
    showModal: false,
    isError: false,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  openModal = (message, isError = false) => {
    this.setState({ modalMessage: message, showModal: true, isError });
  };

  closeModal = () => {
    this.setState({ showModal: false });
    if (!this.state.isError) {
      this.props.navigate("/mainpage");
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
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
        this.openModal(errorData.message || "로그인 실패", true);
        return;
      }

      const data = await response.json();
      console.log("✅ 로그인 성공:", data);

      if (data.role === "admin") {
        console.log("관리자 로그인 성공!");
        this.openModal("관리자로 로그인되었습니다.");
        this.props.navigate("/administrator");
      } else {
        this.openModal("로그인에 성공했습니다.");
      }

    } catch (error) {
      console.error("❌ 로그인 오류:", error);
      this.openModal("서버 오류로 로그인에 실패했습니다.", true);
    }
  };

  render() {
    return (
      <Container>
        <HeaderLogo>
          <img src={LoginLogoImage} alt="로고" />
        </HeaderLogo>

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

        {this.state.showModal && (
          <div style={modalBackgroundStyle}>
            <div style={modalBoxStyle}>
              <h3>{this.state.isError ? "❌ 로그인 실패" : "✅ 로그인 성공"}</h3>
              <p>{this.state.modalMessage}</p>
              <button onClick={this.closeModal} style={modalButtonStyle}>확인</button>
            </div>
          </div>
        )}
      </Container>
    );
  }
}

const modalBackgroundStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};

const modalBoxStyle = {
  background: "#fff",
  padding: "30px",
  borderRadius: "10px",
  textAlign: "center",
  width: "300px"
};

const modalButtonStyle = {
  marginTop: "20px",
  padding: "10px 20px",
  backgroundColor: "#68a0f4",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  fontWeight: "bold",
  cursor: "pointer",
};

export default withRouter(Login);
