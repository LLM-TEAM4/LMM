import React, { useState } from "react";
import styled from "styled-components";
import LogoImage from "../../assets/img/logo.png"; // 로고 이미지 경로로 임포트
import userIcon from "../../assets/img/userIcon.png";
import CommonHeader from "../../components/CommonHeader";//상단바 컴포넌트트

const Container = styled.div`
  min-height: 100vh;
  background-color: #ffffff;
  padding: 1rem;
  font-family: sans-serif;
`;

const Main = styled.div`
  display: flex;
  margin-top: 100px;
`;

const Sidebar = styled.div`
  width: 15rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 0.5rem;
`;

const TabButton = styled.button`
  padding: 0.75rem;
  border: none;
  border-radius: 6px;
  text-align: left;
  background: white;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  background-color: ${(props) => (props.active ? "#68A0F4" : "white")};
  color: ${(props) => (props.active ? "white" : "black")};
`;

const Content = styled.div`
  flex: 1;
  margin-left: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

const Card = styled.div`
  background: #f5f5f5;
  padding: 2rem 1rem;
  border-radius: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Avatar = styled.div`
  width: 7rem;
  height: 7rem;
  background: #d9d9d9;
  border-radius: 50%;
  margin: 0 auto 0.5rem;
`;

const Country = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 2rem;
`;

const UserList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const UserItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #d9d9d9;
  padding: 0.5rem 1rem;
  border-radius: 7px;
  margin-bottom: 1rem;
`;

const UserIcon = styled.span`
  width: 1.5rem;
  height: 1.5rem;
  background: black;
  border-radius: 50%;
`;

const UserName = styled.span`
  flex: 1;
  text-align: center;
`;

const mockData = {
  weekly: {
    title: "🏆 주간 통합 순위",
    countries: ["한국", "중국", "일본"],
    users: ["user1", "user2", "user3", "user4", "user5"],
  },
  monthly: {
    title: "🎖️ 월간 통합 순위",
    countries: ["한국", "중국", "일본"],
    users: ["user1", "user2", "user3", "user4", "user5"],
  },
};

function Ranking() {
  const [selectedTab, setSelectedTab] = useState("weekly");
  const data = mockData[selectedTab];

  return (
    <Container>
      <CommonHeader />

      <Main>
        <Sidebar>
          <TabButton
            active={selectedTab === "weekly"}
            onClick={() => setSelectedTab("weekly")}
          >
            🏆 주간 통합 순위
          </TabButton>
          <TabButton
            active={selectedTab === "monthly"}
            onClick={() => setSelectedTab("monthly")}
          >
            🎖️ 월간 통합 순위
          </TabButton>
        </Sidebar>

        <Content>
          <SectionTitle>{data.title}</SectionTitle>
          <Grid>
            {data.countries.map((country) => (
              <Card key={country}>
                <Avatar />
                <Country>{country}</Country>
                <UserList>
                  {data.users.map((user) => (
                    <UserItem key={user}>
                      <UserIcon />
                      <UserName>{user}</UserName>
                    </UserItem>
                  ))}
                </UserList>
              </Card>
            ))}
          </Grid>
        </Content>
      </Main>
    </Container>
  );
}

export default Ranking;
