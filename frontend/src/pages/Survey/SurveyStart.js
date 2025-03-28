import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import LogoImage from "../../assets/img/logo.png";
import BulgogiImg from "../../assets/img/bulgogi.png";

const Wrapper = styled.div`
  font-family: Arial, sans-serif;
  max-height: 100vh;
  overflow-y: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  border-bottom: 1px solid #ddd;
`;

const HeaderLogo = styled.h1`
  font-size: 20px;
  font-weight: bold;
  img {
    width: 150px;
  }
`;

const BackButton = styled.button`
  background-color: #68a0f4;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #4a82d9;
  }
`;

const Container = styled.div`
  padding: 30px 40px;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Breadcrumb = styled.div`
  font-size: 14px;
  color: #666;
`;

const Progress = styled.div`
  font-size: 14px;
  color: #333;
`;

const Image = styled.img`
  width: 100%;
  height: 700px;
  object-fit: cover;
  border-radius: 10px;
  margin: 20px 0;
`;

const Caption = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: #333;
`;

const Options = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 0;
  flex-wrap: wrap;
`;

const Option = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
  margin: 10px;
  font-size: 14px;
  cursor: pointer;

  input[type="radio"] {
    margin-bottom: 8px;
  }
`;

const NextButton = styled.button`
  display: block;
  margin: 0 auto;
  padding: 12px 30px;
  font-size: 16px;
  background-color: #4a82d9;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #3a6fbd;
  }
`;

const SurveyStart = () => {
  const { title } = useParams();
  const [selected, setSelected] = useState(null);

  return (
    <Wrapper>
      <Header>
        <HeaderLogo>
          <img src={LogoImage} alt="로고" />
        </HeaderLogo>
        <BackButton onClick={() => window.history.back()}>뒤로가기</BackButton>
      </Header>

      <Container>
        <TopBar>
          <Breadcrumb>한국 cuisine {title}</Breadcrumb>
          <Progress>1/5</Progress>
        </TopBar>

        <Image src={BulgogiImg} alt="bulgogi" />

        <Caption>
          Traditional Korean dish, Bulgogi is marinated thinly sliced beef that
          has been grilled or stir-fried. This popular meal is often served with
          rice and kimchi, a spicy fermented vegetable side dish. The marinade
          typically includes ingredients like soy sauce, sugar, garlic, ginger,
          sesame oil, and black pepper.
        </Caption>

        <Options>
          <Option>
            <input
              type="radio"
              name="rating"
              value="1"
              checked={selected === "1"}
              onChange={() => setSelected("1")}
            />
            문화적으로 풍부하다
          </Option>
          <Option>
            <input
              type="radio"
              name="rating"
              value="2"
              checked={selected === "2"}
              onChange={() => setSelected("2")}
            />
            문화적으로 매우 적절하다
          </Option>
          <Option>
            <input
              type="radio"
              name="rating"
              value="3"
              checked={selected === "3"}
              onChange={() => setSelected("3")}
            />
            문화적으로 적절하다
          </Option>
          <Option>
            <input
              type="radio"
              name="rating"
              value="4"
              checked={selected === "4"}
              onChange={() => setSelected("4")}
            />
            중립적 또는 일반적이다
          </Option>
          <Option>
            <input
              type="radio"
              name="rating"
              value="5"
              checked={selected === "5"}
              onChange={() => setSelected("5")}
            />
            문화적으로 부적절하다
          </Option>
        </Options>

        <NextButton disabled={!selected}>다음으로</NextButton>
      </Container>
    </Wrapper>
  );
};

export default SurveyStart;
