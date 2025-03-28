import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  padding: 40px;
  font-family: Arial, sans-serif;
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

  return (
    <Container>
      <Title>
        LLM 기반 캡션과 사람의 생각이 일치하는 정도에 대한 설문조사입니다.
      </Title>
      <Instruction>이미지를 보고 적절한 캡션을 선택해주세요.</Instruction>
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
        <br />- 문화적 요소는 포함되지 않았고, 일반적인 설명이 포함된 캡션
      </OptionBox>
      <OptionBox>
        <strong>5. 문화적으로 부적절한 캡션</strong>
        <br />- 잘못된 이름이나 국가를 표현하거나 올바르지 않은 문화적 맥락을
        담고있는 캡션
      </OptionBox>
      <StartButton onClick={() => navigate("/survey/:title/start")}>
        설문 시작하기
      </StartButton>
    </Container>
  );
};

export default SurveyDetail;
