import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import DefaultProfile from "../../assets/img/profile.png";
import KoreaImage from "../../assets/img/korea.png"; // 한국 이미지 추가

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const SurveyComplete = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${BASE_URL}/survey/users`);
        const data = await res.json();
        setUsers(data.users);
      } catch (error) {
        console.error("사용자 정보 로드 실패:", error);
      }
    };

    fetchUsers();
  }, []);

  const sortedUsers = [...users].sort((a, b) => b.answerCount - a.answerCount);

  return (
    <Wrapper>
      <MessageBox>
        <Message>설문에 응해주셔서 감사합니다 :)</Message>
        <Content>
          <Image src={KoreaImage} alt="한국 이미지" />
          <Title>한국</Title>
        </Content>
        <UserGrid>
          {sortedUsers.map((user, index) => (
            <UserCard key={index}>
              <ProfileImage src={DefaultProfile} alt="프로필 이미지" />
              <Nickname>{user.nickname}</Nickname>
              <AnswerCount>응답 개수: {user.answerCount}</AnswerCount>
            </UserCard>
          ))}
        </UserGrid>
      </MessageBox>
    </Wrapper>
  );
};

export default SurveyComplete;

// Styled Components
const Wrapper = styled.div`
  padding: 20px;
`;

const MessageBox = styled.div`
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
`;

const Message = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
`;

const Content = styled.div`
  margin-bottom: 20px;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
`;

const Title = styled.h3`
  margin-top: 10px;
  font-size: 18px;
  color: #333;
`;

const UserGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const UserCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 10px;
  width: 120px;

  display: flex;
  flex-direction: column;
  align-items: center; /* 수직 방향 중앙 정렬 */
  justify-content: center;
  text-align: center;
`;

const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 50%;
`;

const Nickname = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: #333;
  text-align: center;
`;

const AnswerCount = styled.p`
  margin-top: 6px;
  font-size: 12px;
  color: #666;
  text-align: center;
`;

