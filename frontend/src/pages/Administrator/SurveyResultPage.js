import React from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/AdminHeader";
import surveyData from "../../data/SurveyData";

const Container = styled.div`
  padding: 100px 40px 40px;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 30px;
`;

const ResultBox = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const Question = styled.h2`
  font-size: 20px;
  margin-bottom: 25px;
  color: #333;
`;

const BarContainer = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.div`
  font-size: 16px;
  margin-bottom: 6px;
  color: #444;
`;

const BarBackground = styled.div`
  background-color: #eee;
  border-radius: 5px;
  height: 30px;
  position: relative;
`;

const Bar = styled.div`
  height: 100%;
  background-color: #649eff;
  border-radius: 5px;
  width: ${({ width }) => width}%;
  transition: width 0.4s ease;
`;

const Count = styled.span`
  position: absolute;
  right: 10px;
  top: 4px;
  color: white;
  font-size: 14px;
  font-weight: bold;
`;

const BackButton = styled.button`
  padding: 10px 20px;
  background-color: #649eff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 30px;

  &:hover {
    background-color: #4a82d9;
  }
`;

const SurveyResultPage = () => {
  const { id } = useParams(); // URL에서 id 가져오기
  const navigate = useNavigate();

  // id가 숫자 형태일 경우 (예: 1, 2, 3...)로 넘긴다면 아래처럼
  const survey = surveyData.find((s, index) => String(index + 1) === id);

  // 또는 id가 title이라면 아래처럼 사용
  // const survey = surveyData.find((s) => s.title === decodeURIComponent(id));

  if (!survey) {
    return (
      <Container>
        <p>설문 데이터를 찾을 수 없습니다.</p>
      </Container>
    );
  }

  // 가짜 응답 수
  const fakeCounts = [18, 12, 5, 3, 22];

  const options = (survey.caption || []).map((cap, i) => ({
    text: cap,
    count: fakeCounts[i] || 0,
  }));

  const total = options.reduce((sum, o) => sum + o.count, 0);

  return (
    <>
      <Header />
      <Container>
        <Title>설문 결과 - {survey.title}</Title>
        <ResultBox>
          <Question>각 캡션별 결과는 아래와 같습니다.</Question>

          {/* ✅ 총 참여자 수 표시 */}
          <p style={{ fontSize: "16px", marginBottom: "20px", color: "#555" }}>
            총 참여자 수: <strong>{total}명</strong>
          </p>

          {options.map((option, index) => {
            const percent = ((option.count / total) * 100).toFixed(1);
            return (
              <BarContainer key={index}>
                <Label>
                  {option.text} ({option.count}명, {percent}%)
                </Label>
                <BarBackground>
                  <Bar width={percent} />
                  <Count>{percent}%</Count>
                </BarBackground>
              </BarContainer>
            );
          })}

          {/* ✅ 그래프 해석 설명 문구 */}
          <p style={{ fontSize: "14px", color: "#777", marginTop: "10px" }}>
            ※ 그래프에서{" "}
            <strong>0%에 가까울수록 문화적으로 부적절한 캡션</strong>,{" "}
            <strong>100%에 가까울수록 문화적으로 매우 적절한 캡션</strong>을
            의미합니다.
          </p>

          <BackButton onClick={() => navigate(-1)}>
            ← 목록으로 돌아가기
          </BackButton>
        </ResultBox>
      </Container>
    </>
  );
};

export default SurveyResultPage;
