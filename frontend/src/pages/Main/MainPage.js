import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import LogoImage from "../../assets/img/logo.png";
import surveyData from "../../data/SurveyData"; // 설문 데이터 가져오기

// 스타일 정의
const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
`;

const HeaderLogo = styled.h1`
  font-size: 20px;
  font-weight: bold;

  img {
    width: 150px;
    margin-right: 10px;
  }
`;

const Nav = styled.div`
  display: flex;
  gap: 20px;
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
  margin-top: 20px;
`;

const SurveyList = styled.div`
  display: flex;
  gap: 10px;
`;

const SurveyPreview = styled.div`
  width: 100px;
  cursor: pointer;
  text-align: center;

  img {
    width: 100px;
    height: 100px;
    border-radius: 8px;
    object-fit: cover;
  }

  p {
    font-size: 14px;
    margin-top: 5px;
  }
`;

const MainPage = () => {
  const navigate = useNavigate();

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

  // 진행 중인 설문만 필터링
  const ongoingSurveys = surveyData.filter(
    (item) => item.progress < item.total
  );

  return (
    <Container>
      {/* 상단 네비게이션 */}
      <Header>
        <HeaderLogo>
          <img src={LogoImage} alt="로고" />
        </HeaderLogo>
        <Nav>
          <Link to="/survey">설문조사</Link>
          <span>랭킹조회</span>
          <Link to="/mypage">
            <span>👤</span>
          </Link>
        </Nav>
      </Header>

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
        <SurveyList>
          {ongoingSurveys.map((survey, index) => (
            <SurveyPreview
              key={index}
              onClick={() =>
                navigate(`/survey/${survey.title}`, {
                  state: {
                    image: survey.image,
                    caption: survey.caption,
                    path: `한국 > ${survey.category} > ${survey.title}`,
                  },
                })
              }
            >
              <img src={survey.image} alt={survey.title} />
              <p>{survey.title}</p>
            </SurveyPreview>
          ))}
        </SurveyList>
      </SurveyContainer>
    </Container>
  );
};

export default MainPage;
