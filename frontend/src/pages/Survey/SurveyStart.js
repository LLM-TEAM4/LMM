//surveyId로 응답 저장
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import CommonHeader from "../../components/CommonHeader";
import BulgogiImg from "../../assets/img/bulgogi.png";

const QUESTIONS_PER_SESSION = 5;

const SurveyStart = () => {
  const { title } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { image, caption = [], path, surveyId } = location.state || {};
  const [selected, setSelected] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [isSurveyComplete, setIsSurveyComplete] = useState(false);

  useEffect(() => {
    const shuffled = caption.map(() => {
      return [1, 2, 3, 4, 5].sort(() => Math.random() - 0.5);
    });
    setShuffledOptions(shuffled);

    const fetchProgress = async () => {
      try {
        const res = await fetch(`http://localhost:4000/survey/${surveyId}/progress`, {
          credentials: "include",
        });
        const data = await res.json();

        if (res.ok) {
          setCurrentIndex(data.progress);
          if (data.progress >= caption.length) {
            setIsSurveyComplete(true);
          }
        }
      } catch (err) {
        console.error("❌ 진행도 불러오기 실패:", err);
      }
    };

    fetchProgress();
  }, [caption]);

  const fallbackImage = BulgogiImg;
  const fallbackCaption = "설명이 제공되지 않았습니다.";

  const handleNext = async () => {
    // ✅ 응답한 것만 추려서 저장
    const filteredAnswers = Object.entries(selected)
      .filter(([_, value]) => value > 0) // 0 제외
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([_, value]) => value);


    const isLastInThisSession =
      currentIndex === caption.length - 1 ||
      (currentIndex + 1) % QUESTIONS_PER_SESSION === 0;

    if (!isLastInThisSession) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      

      try {
        const res = await fetch(`http://localhost:4000/survey/${surveyId}/answer`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({  answers: filteredAnswers }),
        });

        if (!res.ok) throw new Error("응답 저장 실패");

        navigate("/survey", {
          state: {
            completedTitle: title,
          },
          replace: true,
        });
      } catch (err) {
        alert("응답 저장에 실패했습니다.");
        console.error(err);
      }
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

        <ContentBox>
          <ImageBox>
            <Image src={image || fallbackImage} alt={title} />
          </ImageBox>

          <TextBox>
            {isSurveyComplete ? (
              <CompleteMessage>
                해당 설문의 모든 문항을 완료했습니다.
              </CompleteMessage>
            ) : (
              <>
                <Caption>{caption[currentIndex] || fallbackCaption}</Caption>
                <Options>
                  {shuffledOptions[currentIndex]?.map((num) => (
                    <Option key={num}>
                      <RadioCircle
                        type="radio"
                        name={`rating-${currentIndex}`}
                        value={num}
                        size={22}
                        checked={selected[currentIndex] === num}
                        onChange={() =>
                          setSelected((prev) => ({ ...prev, [currentIndex]: num }))
                        }
                      />
                      <OptionLabel>
                        {
                          [
                            "문화적으로 풍부하다 (5점)",
                            "문화적으로 매우 적절하다 (4점)",
                            "문화적으로 적절하다 (3점)",
                            "중립적 또는 일반적이다 (2점)",
                            "문화적으로 부적절하다 (1점)",
                          ][num - 1]
                        }
                      </OptionLabel>
                    </Option>
                  ))}
                </Options>

                <NextButton
                  disabled={selected[currentIndex] == null}
                  onClick={handleNext}
                >
                  {(currentIndex + 1) % QUESTIONS_PER_SESSION === 0 ||
                  currentIndex === caption.length - 1
                    ? "설문조사 끝내기"
                    : "다음으로"}
                </NextButton>
              </>
            )}
          </TextBox>
        </ContentBox>
      </Container>
    </Wrapper>
  );
};

export default SurveyStart;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Arial, sans-serif;
  height: 100vh;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Container = styled.div`
  padding: 80px;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Breadcrumb = styled.div`
  font-size: 18px;
  color: #666;
`;

const Progress = styled.div`
  font-size: 18px;
  color: #333;
`;

const ContentBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0px;
  margin-bottom: 40px;
  padding-top: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageBox = styled.div`
  flex: 0.9;
`;

const TextBox = styled.div`
  flex: 1.3;
`;

const Image = styled.img`
  width: 98%;
  height: 98%;
  object-fit: cover;
  border-radius: 10px;
`;

const Caption = styled.p`
  font-size: 18px;
  font-weight: bold;
  line-height: 1.6;
  color: #333;
  margin-bottom: 20px;
  margin-left: 20px;
  height: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
  margin: 30px 0;
  padding-left: 20px;
`;

const Option = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  cursor: pointer;
  transition: transform 0.2s;
`;

const RadioCircle = styled.input`
  appearance: none;
  width: ${(props) => props.size || 22}px;
  height: ${(props) => props.size || 22}px;
  border-radius: 50%;
  border: 2px solid #4a82d9;
  background-color: white;
  cursor: pointer;
  box-sizing: border-box;
  transition: all 0.25s ease;

  &:checked {
    background-color: #4a82d9;
    transform: scale(1.2);
  }

  &:hover {
    background-color: #649eff;
    transform: scale(1.1);
  }
`;

const OptionLabel = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: #333;
  margin-left: 20px;
  text-align: center;
  transition: all 0.2s ease;

  ${Option}:hover & {
    transform: scale(1.05);
    color: #4a82d9;
  }

  ${RadioCircle}:checked + & {
    transform: scale(1.1);
    font-weight: bold;
    color: #4a82d9;
  }
`;

const NextButton = styled.button`
  display: block;
  margin: 0 auto;
  padding: 12px 30px;
  font-size: 16px;
  background-color: #649eff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3a6fbd;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const CompleteMessage = styled.div`
  font-size: 20px;
  color: #4a82d9;
  font-weight: bold;
  padding: 40px;
  text-align: center;
`;
