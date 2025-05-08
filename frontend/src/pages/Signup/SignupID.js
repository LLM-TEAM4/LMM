// ✅ SignupID.js 회원가입 처리 코드 반영
import React, { useState } from "react";
import styled from "styled-components";
import LogoImage from "../../assets/img/logo.png";
import { useNavigate } from "react-router-dom"; 
// 회원가입하면 자동으로 프로필이미지 기본이미지로 설정정
import DefaultProfile from "../../assets/img/profile.png";


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

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px); 
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBox = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
`;

const ModalButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #68a0f4;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #4a82d9;
  }
`;

const SignupID = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();  

  const handleSubmit = async (e) => {

    e.preventDefault();

    const blob = await fetch(DefaultProfile).then(res => res.blob());
    const base64 = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
    });
  
    try {
      const response = await fetch("http://localhost:4000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          password,
          profileImage: base64, // 기본 이미지 포함!
        }),
        credentials: "include",
      });
      console.log(response);
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error("서버 응답이 올바르지 않습니다.");
      }

      const data = await response.json();
      console.log("회원가입 성공:", data);

      setModalMessage("🎉 회원가입 성공! 메인화면으로 이동합니다.");
      setIsError(false);
      setShowModal(true);
    
    } catch (error) {
      console.error("회원가입 실패:", error);
      setModalMessage("회원가입 실패! 다른 아이디를 사용하세요");
      setIsError(true);
      setShowModal(true);
    }
  };
  
  const handleModalClose = () => {
    setShowModal(false);
    if (!isError) {
      navigate("/mainpage"); // 회원가입 성공 시 메인페이지로 이동
    }
  };

  return (
    <Container>
      <HeaderLogo>
        <img src={LogoImage} alt="로고" />
      </HeaderLogo>

      <p>빠르고 쉽게 계정을 만들어보세요!</p>

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

      {showModal && (
        <ModalBackground>
          <ModalBox>
            <h3>{isError ? "❌ 회원가입 실패" : "회원가입 성공"}</h3>
            <p style={{ whiteSpace: "pre-line" }}>{modalMessage}</p>
            <ModalButton onClick={handleModalClose}>확인</ModalButton>
          </ModalBox>
        </ModalBackground>
      )}
    </Container>
  );
};

export default SignupID;
