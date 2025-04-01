import React from "react";
import styled from "styled-components";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import LogoImage from "../../assets/img/logo.png";

const Wrapper = styled.div`
  font-family: Arial, sans-serif;
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
  padding: 40px;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Instruction = styled.p`
  font-size: 16px;
  margin-bottom: 25px;
  line-height: 1.6;
`;

const OptionBox = styled.div`
  background-color: #f4f4f4;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 15px;
  font-size: 15px;
  line-height: 1.5;
`;

const StartButton = styled.button`
  margin-top: 30px;
  padding: 12px 20px;
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

const SurveyDetail = () => {
  const navigate = useNavigate();
  const { title } = useParams();
  const location = useLocation();

  const { image } = location.state || {};

  const captions = {
    불고기: [
      "(1) A traditional Korean dish, Bulgogi is marinated thinly sliced beef that has been grilled or stir-fried.",
      "(2) Korean Bulgogi consists of marinated beef that has been cooked through grilling or stir-frying.",
      "(3) The image shows a plate of Chinese beef stir-fry, accompanied by noodles and steamed broccoli.",
      "(4) This image depicts a plate of food, likely featuring meat as the main ingredient.",
      "(5) Bulgogi, a classic Korean cuisine, features marinated beef that has been grilled or stir-fried.",
    ],
    김치: [
      "(1) Kimchi is a traditional Korean side dish made of fermented vegetables such as cabbage and radish.",
      "(2) This image shows sauerkraut, a popular German fermented cabbage side dish.",
      "(3) Kimchi includes chili pepper, garlic, ginger, and fish sauce as main ingredients.",
      "(4) The dish in the image is most likely coleslaw served as a Western salad.",
      "(5) Kimchi is known for its spicy, sour taste and is a staple in Korean meals.",
    ],
    비빔밥: [
      "(1) Bibimbap is a Korean mixed rice dish with assorted vegetables, meat, egg, and gochujang.",
      "(2) This image displays a Western rice bowl topped with grilled chicken and avocado.",
      "(3) Bibimbap is often served in a hot stone bowl to keep it warm while eating.",
      "(4) The dish shown could be considered a fusion of various Asian cuisines.",
      "(5) A healthy Korean rice bowl called bibimbap balances flavor and nutrition.",
    ],
  };

  const captionList = captions[title] || [];

  return (
    <Wrapper>
      <Header>
        <HeaderLogo>
          <img src={LogoImage} alt="로고" />
        </HeaderLogo>
        <BackButton onClick={() => window.history.back()}>뒤로가기</BackButton>
      </Header>

      <Container>
        <Title>
          LLM 기반 캡션과 사람의 생각이 일치하는 정도에 대한 설문조사입니다.
        </Title>
        <Instruction>이미지를 보시고 적절한 척도를 선택해주세요.</Instruction>

        <OptionBox>
          <strong>1. 문화적으로 풍부한 캡션</strong>
          <br />- 문화적 세부 사항이 정확하게 담겨있으며, 역사적, 의미적, 상징적
          맥락이 풍부하게 표현된 캡션
        </OptionBox>
        <OptionBox>
          <strong>2. 문화적으로 매우 적절한 캡션</strong>
          <br />- 적절한 이름, 국가 및 문화적 세부사항이 담겨있는 캡션
        </OptionBox>
        <OptionBox>
          <strong>3. 문화적으로 올바른 캡션</strong>
          <br />- 올바른 이름, 국가만이 담겨있는 캡션
        </OptionBox>
        <OptionBox>
          <strong>4. 중립적 또는 일반적인 캡션</strong>
          <br />- 문화적 요소는 포함되지 않고, 일반적인 설명이 포함된 캡션
        </OptionBox>
        <OptionBox>
          <strong>5. 문화적으로 부적절한 캡션</strong>
          <br />- 잘못된 이름이나 국가를 표현하거나 올바르지 않은 문화적 맥락을
          담고있는 캡션
        </OptionBox>

        <StartButton
          onClick={() =>
            navigate(`/survey/${title}/start`, {
              state: { image, caption: captionList },
            })
          }
        >
          설문 시작하기
        </StartButton>
      </Container>
    </Wrapper>
  );
};

export default SurveyDetail;
