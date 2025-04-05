import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import BannerImg from "../../assets/img/banner.svg";
import Header from "../../components/CommonHeader";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
`;

const HeroSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 💥 전체 화면 높이 */
  width: 100%;
  padding-top: 60px; /* 헤더 높이만큼 띄우기 */
  box-sizing: border-box;
  background: #ffffff;

  @media (max-width: 768px) {
    padding: 120px 24px 40px;
    flex-direction: column;
    text-align: center;
  }
`;





const BearImage = styled.img`
  width: 95%;
  height: 95%;

  @media (max-width: 768px) {
    width: 280px;
  }
`;


const Dots = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 30px;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? "#68a0f4" : "#ccc")};
`;

class Main extends React.Component {
  render() {
    return (
      <Container>
        <Header />

        <HeroSection>
  <BearImage src={BannerImg} alt="돋보기를 든 곰돌이" />
</HeroSection>
      </Container>
    );
  }
}

export default Main;
