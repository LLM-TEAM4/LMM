import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DefaultProfile from "../../assets/img/profile.png";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const RankingBox = () => {
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/ranking/weekly`);
        const data = await response.json();
        setRankings(data);
      } catch (error) {
        console.error("❌ 랭킹 데이터 가져오기 실패:", error);
      }
    };

    fetchRankings();
  }, []);

  return (
    <RankingWrapper>
      <ThankYouText>설문에 응해주셔서 감사합니다 :)</ThankYouText>
      <RankingContainer>
        <CountrySection>
          <CountryImage src="path/to/korea-image.png" alt="Korea" />
          <CountryTitle>한국</CountryTitle>
        </CountrySection>

        <RankingGrid>
          {rankings.map((user) => (
            <UserCard key={user.id}>
              <ProfileSection>
                <ProfileImage src={DefaultProfile} alt="User Profile" />
                <Nickname>{user.nickname}</Nickname>
              </ProfileSection>
              <ResponseCount>{user.count} 응답</ResponseCount>
            </UserCard>
          ))}
        </RankingGrid>
      </RankingContainer>
    </RankingWrapper>
  );
};

export default RankingBox;

// Styled Components

const RankingWrapper = styled.div`
  width: 100%;
  padding: 20px;
  background-color: #f5f5f5;
  text-align: center;
`;

const ThankYouText = styled.h2`
  margin-bottom: 30px;
  color: #444;
`;

const RankingContainer = styled.div`
  background-color: #ddd;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CountrySection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const CountryImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const CountryTitle = styled.h3`
  margin-top: 10px;
  color: #444;
`;

const RankingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  width: 100%;
`;

const UserCard = styled.div`
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Nickname = styled.p`
  font-weight: bold;
  color: #444;
`;

const ResponseCount = styled.p`
  margin-top: 10px;
  color: #444;
  font-size: 14px;
`;

