import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Axios 추가
import Header from "../../components/CommonHeader";

const Container = styled.div`
  padding: 70px 20px 20px;
  font-family: Arial, sans-serif;
`;

const RankingContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
`;

const RankingBox = styled.div`
  width: 45%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const SurveyContainer = styled.div`
  margin: 20px 20px;
  padding: 10px 0px;
`;

const SurveyItem = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 12px;
  margin-bottom: 15px;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const SurveyImage = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 20px;
`;

const SurveyContent = styled.div`
  flex: 1;
`;

const ProgressText = styled.div`
  font-size: 14px;
  color: #555;
  margin: 5px 0;
`;

const ProgressBar = styled.progress`
  width: 95%;
  height: 16px;
  margin-bottom: 5px;
`;

const ContinueButton = styled.button`
  padding: 8px 12px;
  background-color: #649eff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  margin-left: auto;
  cursor: pointer;

  &:hover {
    background-color: #4a82d9;
  }
`;

const MainPage = () => {
  const navigate = useNavigate();
  const [surveyData, setSurveyData] = useState([]); // 설문 데이터를 저장할 상태

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/home");
        console.log("서버 응답:", response.data); // 응답 데이터 구조 확인
        setSurveyData(response.data);
      } catch (error) {
        console.error("설문 데이터를 불러오는 데 실패했습니다.", error);
      }
    };
  
    fetchSurveys();
  }, []);
  

  const weeklyRanking = [
    { id: 1, name: "user1", count: 18 },
    { id: 2, name: "user2", count: 16 },
    { id: 3, name: "user3", count: 10 },
    { id: 4, name: "user4", count: 8 },
    { id: 5, name: "user5", count: 2 },
  ];

  const monthlyRanking = [
    { id: 1, name: "user1", count: 52 },
    { id: 2, name: "user2", count: 46 },
    { id: 3, name: "user3", count: 30 },
    { id: 4, name: "user4", count: 28 },
    { id: 5, name: "user5", count: 25 },
  ];

  const ongoingSurveys = surveyData.filter(item => item.approved);

  return (
    <Container>
      <Header />

      {/* 주간 & 월간 순위 */}
      <RankingContainer>
        <RankingBox>
          <h3>🏆 주간 통합 순위</h3>
          {weeklyRanking.map((user) => (
            <p key={user.id}>
              <strong>{user.id}</strong> {user.name} {user.count}회
            </p>
          ))}
        </RankingBox>
        <RankingBox>
          <h3>🏆 월간 통합 순위</h3>
          {monthlyRanking.map((user) => (
            <p key={user.id}>
              <strong>{user.id}</strong> {user.name} {user.count}회
            </p>
          ))}
        </RankingBox>
      </RankingContainer>

      {/* 진행 중인 설문 */}
      <SurveyContainer>
        <h3>🔍 진행중인 설문</h3>
        {ongoingSurveys.length === 0 ? (
          <div>승인된 설문이 없습니다.</div>
        ) : (
          ongoingSurveys.map((item, index) => {
            const goal = 20;
            const responses = Array.isArray(item.responses) ? item.responses : [];
            const percent = Math.round((responses.length / goal) * 100);
          
            return (
              <SurveyItem
                key={index}
                onClick={() =>
                  navigate(`/survey/${item._id}`, {
                    state: {
                      image: item.imageUrl,
                      caption: item.captions?.[0] || "",
                      path: `한국 > ${item.category} > ${item.entityName}`,
                    },
                  })
                }
              >
                <SurveyImage src={item.imageUrl} alt={item.entityName} />
                <SurveyContent>
                  <strong>{item.entityName}</strong>
                  <ProgressText>진행상황</ProgressText>
                  <ProgressBar value={responses.length} max={goal} />
                  <ProgressText>
                    {percent}% ({responses.length} / {goal})
                  </ProgressText>
                </SurveyContent>
                <ContinueButton>이어서 진행하기</ContinueButton>
              </SurveyItem>
            );
          })          
        )}
      </SurveyContainer>
    </Container>
  );
};

export default MainPage;
