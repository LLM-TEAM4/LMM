import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import BannerImg from "../../assets/img/banner.png";
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
  padding-top: 100px; /* 헤더 높이만큼 띄우기 */
  box-sizing: border-box;
  background: #ffffff;

  @media (max-width: 768px) {
    padding: 120px 24px 40px;
    flex-direction: column;
    text-align: center;
  }
`;



const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 600px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #000;
  margin-bottom: -12px;

  span {
    color: #2b74ff;
  }
`;

const Headline = styled.h2`
  font-size: 32px;
  font-weight: 700;
  line-height: 1.5;
  margin-top: 0;
  color: #000;
`;

const Description = styled.p`
  font-size: 16px;
  color: #444;
  line-height: 1.8;
  margin-bottom: 12px;
`;


const Subtitle = styled.p`
  font-size: 20px;
  color: #555;
  line-height: 1.6;
`;

const CTAButton = styled(Link)`
  padding: 16px 30px;
  background-color: #68a0f4;
  color: white;
  font-weight: bold;
  font-size: 18px;
  border-radius: 999px;
  text-decoration: none;
  width: fit-content;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);

  &:hover {
    background-color: #4a82d9;
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
