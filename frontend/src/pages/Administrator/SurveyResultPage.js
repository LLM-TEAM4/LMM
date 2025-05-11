import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/AdminHeader";

const exportToCSV = (data, filename = "export.csv") => {
  const csvRows = [];
  csvRows.push("캡션,1점,2점,3점,4점,5점,총 응답");

  data.forEach(option => {
    const row = [
      `"${option.caption}"`,
      option.votes[1] || 0,
      option.votes[2] || 0,
      option.votes[3] || 0,
      option.votes[4] || 0,
      option.votes[5] || 0,
      option.totalVotes
    ].join(",");
    csvRows.push(row);
  });

  const csvContent = "\uFEFF" + csvRows.join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.click();
};

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Container = styled.div`
  padding: 100px 40px 40px;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 24px;
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

const LegendBox = styled.div`
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 25px;
  margin-bottom: 50px;
`;


const SCORE_COLORS = {
  1: "#f44336",
  2: "#ff9800",
  3: "#ffeb3b",
  4: "#4caf50",
  5: "#2196f3"
};




// 왼쪽 고정 이미지 박스
const FixedSideImage = styled.div`
  position: fixed;
  top: 100px;
  left: 40px;
  width: 300px;  
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center; 
  text-align: center;  
  gap: 10px;          
`;

// 오른쪽 메인 내용
const MainContentExpanded = styled.div`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  max-width: 1000px;
  padding-left: 160px;  // 이미지 영역 확보
  padding-right: 40px;
`;


const ResultBox = styled.div`
  background: white;
  padding: 30px 40px;
  padding-top : 100px;
  padding-left:150px;
  padding-right:150px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #eee;
  margin-bottom: 40px;
`;




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
  
      {/* 왼쪽 고정 이미지 */}
      <FixedSideImage>
        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>
          📬 설문조사 {survey.entityName}
        </h2>
        
        <img
          src={survey.imageUrl}
          alt={survey.entityName}
          style={{ width: "100%", borderRadius: "8px" }}
        />
        <BackButton onClick={() => navigate(-1)}>← 목록으로 돌아가기</BackButton>
      </FixedSideImage>
  
      {/* 오른쪽 메인 영역 */}
      <MainContentExpanded>
        <ResultBox>
          <HeaderRow>
            <Title>설문 결과 </Title>
            <button
              onClick={() => exportToCSV(options)}
              style={{
                padding: "10px ",
                borderRadius: "6px",
                backgroundColor: "#649eff",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              CSV 다운로드
            </button>
          </HeaderRow>
  
          
          <p style={{ fontSize: "16px", marginBottom: "20px", color: "#555" }}>
            현재까지 참여자 수: <strong>{survey.participantCount}명</strong>
          </p>
  
          <LegendBox>
           <div><span style={{ color: SCORE_COLORS[1], marginRight: "5px" }}>■</span> <span style={{ color: "#000" }}>1점: 문화적으로 부적절하다</span></div>
           <div><span style={{ color: SCORE_COLORS[2], marginRight: "5px" }}>■</span> <span style={{ color: "#000" }}>2점: 중립적 또는 일반적이다</span></div>
           <div><span style={{ color: SCORE_COLORS[3], marginRight: "5px" }}>■</span> <span style={{ color: "#000" }}>3점: 문화적으로 적절하다</span></div>
           <div><span style={{ color: SCORE_COLORS[4], marginRight: "5px" }}>■</span> <span style={{ color: "#000" }}>4점: 문화적으로 매우 적절하다</span></div>
           <div><span style={{ color: SCORE_COLORS[5], marginRight: "5px" }}>■</span> <span style={{ color: "#000" }}>5점: 문화적으로 풍부하다</span></div>
          </LegendBox>

          {options.map((option, index) => (
            <div key={index} style={{ marginBottom: "30px" }}>
              <h3 style={{ fontWeight: "400" }}>{`${index + 1}번 캡션 : ${option.caption}`}</h3>
              {option.totalVotes === 0 ? (
                <p style={{ color: "#999" }}>아직 응답이 없습니다.</p>
              ) : (
                <BarBackground>
                  {[1, 2, 3, 4, 5].map((score) => {
                    const count = option.votes?.[score] || 0;
                    const percent = option.totalVotes > 0
                      ? ((count / option.totalVotes) * 100).toFixed(1)
                      : 0;
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
                          minWidth: percent > 0 && percent < 5 ? "5%" : "auto",
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
  
          
        </ResultBox>
      </MainContentExpanded>
    </>
  );
  

};

export default SurveyResultPage;
