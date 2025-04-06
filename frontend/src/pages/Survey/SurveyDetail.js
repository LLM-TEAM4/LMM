import React from "react";
import styled from "styled-components";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import CommonHeader from "../../components/CommonHeader";

const Wrapper = styled.div`
  font-family: Arial, sans-serif;
  height: auto; /**100vh 해놓으면 스크롤 생김**/
  overflow-y: scroll;
  padding-top: 60px;

  /* ✅ 스크롤바 숨기기 (모든 브라우저 대응) */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE, Edge */

  &::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`;

const Container = styled.div`
  padding: 10px 40px;
`;

const CategoryPath = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
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
  background-color: #649eff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #3a6fbd;
  }

  /* ✅ 가운데 정렬 */
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const SurveyDetail = () => {
  const navigate = useNavigate();
  const { title } = useParams();
  const location = useLocation();

  const { image, path } = location.state || {};

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
    한복: [
      "(1) Hanbok is a traditional Korean attire characterized by vibrant colors and elegant designs.",
      "(2) The image portrays a modern Western-style dress.",
      "(3) Korean Hanbok often includes intricate embroidery and detailed craftsmanship.",
      "(4) The garment in the image appears to be traditional clothing from another East Asian culture.",
      "(5) Hanbok is commonly worn during Korean celebrations and festivals.",
    ],
    경복궁: [
      "(1) Gyeongbokgung Palace is a historical royal palace located in Seoul, South Korea.",
      "(2) The image depicts a historical structure likely from China or Japan.",
      "(3) Gyeongbokgung is famous for its beautiful architecture and historical significance.",
      "(4) This building appears to be a modern interpretation of traditional architecture.",
      "(5) Gyeongbokgung was the main royal palace during the Joseon Dynasty.",
    ],
    만리장성: [
      "(1) The Great Wall of China is an ancient defensive structure stretching across northern China.",
      "(2) The image shows a medieval castle wall from Europe.",
      "(3) The Great Wall was built to protect China from invasions and raids.",
      "(4) This wall in the image is more likely part of a modern defensive structure.",
      "(5) The Great Wall is recognized as one of the world's great architectural achievements.",
    ],
    짜장면: [
      "(1) Jajangmyeon is a Korean-Chinese dish featuring noodles topped with black bean sauce.",
      "(2) The noodles shown here appear to be spaghetti with a tomato-based sauce.",
      "(3) Jajangmyeon is popular comfort food in South Korea.",
      "(4) This dish seems like a typical Chinese noodle stir-fry.",
      "(5) Jajangmyeon is commonly eaten on special occasions and delivery meals in Korea.",
    ],
    치파오: [
      "(1) Cheongsam, also known as Qipao, is a traditional Chinese dress noted for its fitted silhouette and ornate designs.",
      "(2) The image appears to show traditional Korean clothing rather than a Qipao.",
      "(3) The Cheongsam originated in 1920s Shanghai and became iconic Chinese attire.",
      "(4) This dress shown could represent another East Asian traditional attire.",
      "(5) Cheongsam is often worn for cultural events and formal occasions in China.",
    ],
    스시: [
      "(1) Sushi is a traditional Japanese dish consisting of vinegared rice accompanied by seafood and vegetables.",
      "(2) This image shows Korean-style rice rolls known as Kimbap.",
      "(3) Sushi is renowned globally for its presentation and delicate flavors.",
      "(4) The dish in the image could be sashimi, raw seafood without rice.",
      "(5) Sushi includes varieties such as nigiri, maki, and sashimi.",
    ],
    기모노: [
      "(1) The Kimono is a traditional Japanese garment worn for special occasions.",
      "(2) The image depicts Korean Hanbok rather than a Kimono.",
      "(3) Kimonos often feature elaborate patterns, colors, and symbolic motifs.",
      "(4) The clothing in the image might represent a traditional Chinese garment.",
      "(5) Kimono is traditionally worn at ceremonies, festivals, and cultural events in Japan.",
    ],
    도쿄타워: [
      "(1) Tokyo Tower is a prominent communications and observation tower in Tokyo, Japan.",
      "(2) This image resembles the Eiffel Tower located in Paris, France.",
      "(3) Tokyo Tower stands out with its distinct red-and-white design.",
      "(4) The tower in this image appears to be another famous landmark structure from Asia.",
      "(5) Tokyo Tower serves as a popular tourist destination and cultural symbol in Japan.",
    ],
  };

  const captionList = captions[title] || [];

  return (
    <Wrapper>
      <CommonHeader />

      <Container>
        {path && <CategoryPath>{path}</CategoryPath>}

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
              state: { image, caption: captionList, path },
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
