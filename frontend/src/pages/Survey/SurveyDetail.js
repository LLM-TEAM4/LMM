import React from "react";
import styled from "styled-components";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import CommonHeader from "../../components/CommonHeader";
import surveys from "../../data/SurveyData";

const Wrapper = styled.div`
  font-family: Arial, sans-serif;
  height: auto;
  overflow-y: scroll;
  padding-top: 60px;
  scrollbar-width: none;
  -ms-overflow-style: none;
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
  display: block;
  margin-left: auto;
  margin-right: auto;

  &:hover {
    background-color: #3a6fbd;
  }
`;

const SurveyDetail = () => {
  const navigate = useNavigate();
  const { title } = useParams();
  const location = useLocation();

  const { image, path } = location.state || {};
  const matchedSurvey = surveys.find((item) => item.title === title);
  const captionList = matchedSurvey?.caption || [];

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
          <strong>문화적으로 풍부한 캡션 (5점)</strong>
          <br />- 문화적 세부 사항이 정확하게 담겨있으며, 역사적, 의미적, 상징적
          맥락이 풍부하게 표현된 캡션
        </OptionBox>
        <OptionBox>
          <strong>문화적으로 매우 적절한 캡션 (4점)</strong>
          <br />- 적절한 이름, 국가 및 문화적 세부사항이 담겨있는 캡션
        </OptionBox>
        <OptionBox>
          <strong>문화적으로 올바른 캡션 (3점)</strong>
          <br />- 올바른 이름, 국가만이 담겨있는 캡션
        </OptionBox>
        <OptionBox>
          <strong>중립적 또는 일반적인 캡션 (2점)</strong>
          <br />- 문화적 요소는 포함되지 않고, 일반적인 설명이 포함된 캡션
        </OptionBox>
        <OptionBox>
          <strong>문화적으로 부적절한 캡션 (1점)</strong>
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
