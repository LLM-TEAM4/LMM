import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import CommonHeader from "../../components/CommonHeader";
import BulgogiImg from "../../assets/img/bulgogi.png";

const SurveyStart = () => {
  const { title } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state || {};
  console.log("📌 Full state:", state);

  const { image, caption = [], path, surveyId, _id } = state;
  const resolvedSurveyId = surveyId || _id;
  console.log("📌 최종 surveyId 확인:", resolvedSurveyId);

  const [selected, setSelected] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [existingAnswers, setExistingAnswers] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/survey/${resolvedSurveyId}/progress`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setExistingAnswers(data.answers || []);
        setCurrentIndex(data.progress || 0);
      })
      .catch(console.error);
  }, [resolvedSurveyId]);

  const handleSave = async () => {
    const combinedAnswers = [...existingAnswers];
    Object.entries(selected).forEach(([idx, value]) => {
      combinedAnswers[idx] = value;
    });

    try {
      const res = await fetch(
        `http://localhost:4000/survey/${resolvedSurveyId}/answer`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ answers: combinedAnswers }),
        }
      );

      if (!res.ok) throw new Error("응답 저장 실패");
      alert("임시 저장 완료");
      navigate("/survey", { replace: true });
    } catch (error) {
      console.error(error);
      alert("저장 중 오류 발생");
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, caption.length - 1));
  };

  const handleSelect = (score) => {
    setSelected((prev) => ({ ...prev, [currentIndex]: score }));
  };

  const fallbackImage = BulgogiImg;
  const fallbackCaption = "설명이 제공되지 않았습니다.";

  return (
    <Wrapper>
      <CommonHeader />
      <Container>
        <Breadcrumb>{path || title}</Breadcrumb>
        <Progress>
          {currentIndex + 1}/{caption.length}
        </Progress>
        <ContentArea>
          <ImageBlock>
            <Image src={image || fallbackImage} alt={title} />
          </ImageBlock>
          <QuestionBlock>
            <Caption>{caption[currentIndex] || fallbackCaption}</Caption>
            <Options>
              {[5, 4, 3, 2, 1].map((score) => (
                <Option key={score}>
                  <input
                    type="radio"
                    checked={selected[currentIndex] === score}
                    onChange={() => handleSelect(score)}
                  />
                  <span>
                    {
                      {
                        5: "문화적으로 풍부하다 (5점)",
                        4: "문화적으로 매우 적절하다 (4점)",
                        3: "문화적으로 적절하다 (3점)",
                        2: "중립적 또는 일반적이다 (2점)",
                        1: "문화적으로 부적절하다 (1점)",
                      }[score]
                    }
                  </span>
                </Option>
              ))}
            </Options>
            <ButtonGroup>
              <ContinueButton
                onClick={handleSave}
                disabled={selected[currentIndex] == null}
              >
                임시 저장
              </ContinueButton>
              <ContinueButton
                onClick={
                  currentIndex >= caption.length - 1 ? handleSave : handleNext
                }
                disabled={selected[currentIndex] == null}
              >
                {currentIndex >= caption.length - 1 ? "설문 끝내기" : "다음"}
              </ContinueButton>
            </ButtonGroup>
          </QuestionBlock>
        </ContentArea>
      </Container>
    </Wrapper>
  );
};

export default SurveyStart;

// Styled Components
const Wrapper = styled.div`
  padding: 20px;
`;
const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;
const Breadcrumb = styled.div`
  margin-bottom: 10px;
`;
const Progress = styled.div`
  margin-bottom: 10px;
`;
const ContentArea = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
`;
const ImageBlock = styled.div`
  flex: 1;
`;
const QuestionBlock = styled.div`
  flex: 2;
`;
const Image = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 8px;
`;
const Caption = styled.div`
  margin-bottom: 10px;
  font-weight: bold;
`;
const Options = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const Option = styled.label`
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  gap: 8px;
`;
const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;
const ContinueButton = styled.button`
  padding: 8px 14px;
  background-color: #649eff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  margin-left: auto;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #4a82d9;
  }
`;
