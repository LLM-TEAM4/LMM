import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/CommonHeader";
const BASE_URL = process.env.REACT_APP_API_BASE_URL;
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
  width: 30%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
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
  const [surveyData, setSurveyData] = useState([]);
  const [rankingData, setRankingData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {

        const surveyRes = await axios.get(`${BASE_URL}/survey`, { withCredentials: true });
        setSurveyData(surveyRes.data);

        const countries = ["한국", "중국", "일본"];
        const countryResults = {};

        for (const country of countries) {
          const res = await fetch(`http://localhost:4000/ranking/country/${country}`);
          const data = await res.json();
          countryResults[country] = data;
        }

        setRankingData(countryResults);
      } catch (error) {
        console.error("데이터 불러오기 실패", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Header />

      <RankingContainer>
  {["한국", "중국", "일본"].map((country) => (
    <RankingBox key={country}>
      <h3 style={{ textAlign: "center", marginBottom: "15px" }}>{country} 랭킹</h3>
      {(rankingData[country] || []).length === 0 ? (
        <p style={{ textAlign: "center" }}>데이터 없음</p>
      ) : (
        (rankingData[country] || []).slice(0, 5).map((user, index) => {
          const rankIcons = ["🥇", "🥈", "🥉"];
          const rankBadge = rankIcons[index] || `${index + 1}️⃣`;

          return (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "12px",
                marginBottom: "10px",
                backgroundColor: "#fefefe",
                boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>{rankBadge}</span>
              <div>
                <strong>{user.nickname}</strong>
                <div style={{ color: "#888", fontSize: "0.9rem" }}>
                  응답 {user.count}회
                </div>
              </div>
            </div>
          );
        })
      )}
    </RankingBox>  
  ))}
</RankingContainer>  


      <SurveyContainer>
        <h3>🔍 진행중인 설문</h3>
        {surveyData.length === 0 ? (
          <div>승인된 설문이 없습니다.</div>
        ) : (
          surveyData.map((item, index) => (
            <SurveyItem
              key={index}
              onClick={() =>
                navigate(`/survey/${item._id}`, {
                  state: {
                    image: item.imageUrl,
                    caption: item.captions?.[0] || "",
                    path: `${item.country} > ${item.category} > ${item.entityName}`,
                  },
                })
              }
            >
              <SurveyImage src={item.imageUrl} alt={item.entityName} />
              <SurveyContent>
                <strong>{item.entityName}</strong>
                <ProgressText>진행상황</ProgressText>
                <ProgressBar value={item.progress} max={item.total} />
                <ProgressText>{item.progress} / {item.total}</ProgressText>
              </SurveyContent>
              <ContinueButton>이어서 진행하기</ContinueButton>
            </SurveyItem>
          ))
        )}
      </SurveyContainer>
    </Container>
  );
};

export default MainPage;
