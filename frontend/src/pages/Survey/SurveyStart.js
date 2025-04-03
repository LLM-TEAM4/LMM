import React, { useState } from "react";
import styled from "styled-components";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import CommonHeader from "../../components/CommonHeader";
import BulgogiImg from "../../assets/img/bulgogi.png";

const Wrapper = styled.div`
  font-family: Arial, sans-serif;
  max-height: 100vh;
  overflow-y: auto;
  padding-top: 100px;
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
  justify-content: center;
  margin: 30px 0;
  flex-wrap: wrap;
`;

const Option = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 15px;
  font-size: 14px;
  cursor: pointer;

  input[type="radio"] {
    width: 24px;
    height: 24px;
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
  const location = useLocation();
  const navigate = useNavigate();
  const { image, caption = [], path } = location.state || {};

  const [selected, setSelected] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const fallbackImage = BulgogiImg;
  const fallbackCaption = "설명이 제공되지 않았습니다.";

  const handleNext = () => {
    if (currentIndex < caption.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      navigate("/survey", {
        state: {
          completedTitle: title,
        },
        replace: true,
      });
    }
  };

  return (
    <Wrapper>
      <CommonHeader />

      <Container>
        <TopBar>
          <Breadcrumb>{path || `한국 > cuisine > ${title}`}</Breadcrumb>
          <Progress>
            {caption.length > 0 ? currentIndex + 1 : 0}/{caption.length || 5}
          </Progress>
        </TopBar>

        <Image src={image || fallbackImage} alt={title} />

        <Caption>{caption[currentIndex] || fallbackCaption}</Caption>

        <Options>
          {[1, 2, 3, 4, 5].map((num) => (
            <Option key={num}>
              <input
                type="radio"
                name={`rating-${currentIndex}`}
                value={num}
                checked={selected[currentIndex] === num}
                onChange={() =>
                  setSelected((prev) => ({ ...prev, [currentIndex]: num }))
                }
              />
              {
                [
                  "문화적으로 풍부하다",
                  "문화적으로 매우 적절하다",
                  "문화적으로 적절하다",
                  "중립적 또는 일반적이다",
                  "문화적으로 부적절하다",
                ][num - 1]
              }
            </Option>
          ))}
        </Options>

        <NextButton
          disabled={selected[currentIndex] == null}
          onClick={handleNext}
        >
          다음으로
        </NextButton>
      </Container>
    </Wrapper>
  );
};

export default SurveyStart;
