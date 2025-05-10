import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/AdminHeader";

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

const BarBackground = styled.div`
  background-color: #eee;
  border-radius: 5px;
  height: 30px;
  position: relative;
  display: flex;
  overflow: hidden;
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

const SCORE_COLORS = {
  1: "#f44336",  // 빨강
  2: "#ff9800",  // 주황
  3: "#ffeb3b",  // 노랑
  4: "#4caf50",  // 초록
  5: "#2196f3"   // 파랑
};

const SurveyResultPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const res = await fetch(`http://localhost:4000/survey/${id}`, { credentials: "include" });
        const data = await res.json();
        console.log("서버 응답 데이터", data);
        setSurvey(data);
      } catch (error) {
        console.error("설문 데이터 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSurvey();
  }, [id]);

  if (loading) return <Container>로딩 중...</Container>;
  if (!survey) return <Container>설문 데이터를 찾을 수 없습니다.</Container>;

  const options = (survey.captions || []).map((caption, i) => {
    const votes = survey.votes?.[i] || {};
    const totalVotes = Object.values(votes).reduce((sum, v) => sum + v, 0);
    return { caption, votes, totalVotes };
  });

  return (
    <>
      <Header />
      <Container>
        <Title>설문 결과 - {survey.entityName}</Title>
        <ResultBox>
          <Question>각 캡션별 결과는 아래와 같습니다.</Question>

          <p style={{ fontSize: "16px", marginBottom: "20px", color: "#555" }}>
            현재까지 참여자 수: <strong>{survey.participantCount}명</strong>
          </p>

          {/* ✅ 레전드 추가 */}
          <p style={{ marginBottom: "20px" }}>
            <div style={{ color: SCORE_COLORS[1], marginRight: "10px" }}>■ 1점: 문화적으로 부적절하다</div>
            <div style={{ color: SCORE_COLORS[2], marginRight: "10px" }}>■ 2점: 중립적 또는 일반적이다</div>
            <div style={{ color: SCORE_COLORS[3], marginRight: "10px" }}>■ 3점: 문화적으로 적절하다</div>
            <div style={{ color: SCORE_COLORS[4], marginRight: "10px" }}>■ 4점: 문화적으로 매우 적절하다</div>
            <div style={{ color: SCORE_COLORS[5], marginRight: "10px" }}>■ 5점: 문화적으로 풍부하다</div>
          
            
            
          </p>


          {options.map((option, index) => (
            <div key={index} style={{ marginBottom: "30px" }}>
              <h3>{option.caption}</h3>
              {option.totalVotes === 0 ? (
                <p style={{ color: "#999" }}>아직 응답이 없습니다.</p>  // ✅ 응답 없음 표시
              ) : (
                <BarBackground>
                  {[1, 2, 3, 4, 5].map(score => {
                    const count = option.votes?.[score] || 0;
                    const percent = option.totalVotes > 0 ? ((count / option.totalVotes) * 100).toFixed(1) : 0;
                    return (
                      <div
                        key={score}
                        style={{
                          width: `${percent}%`,
                          backgroundColor: SCORE_COLORS[score],
                          color: "#fff",
                          textAlign: "center",
                          lineHeight: "30px",
                          fontSize: "12px",
                          minWidth: percent > 0 && percent < 5 ? "5%" : "auto"
                        }}
                      >
                        {percent > 5 ? `${score}점 ${percent}%` : ""}
                      </div>
                    );
                  })}
                </BarBackground>
              )}
            </div>
          ))}

          

          <BackButton onClick={() => navigate(-1)}>← 목록으로 돌아가기</BackButton>
        </ResultBox>
      </Container>
    </>
  );
};

export default SurveyResultPage;
