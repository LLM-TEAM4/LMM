import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "../../components/AdminHeader";
import surveyData from "../../data/SurveyData";

const Container = styled.div`
  padding: 100px 20px 40px;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 30px;
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
`;

const Tab = styled.button`
  padding: 10px 20px;
  border: none;
  background: ${({ active }) => (active ? "#68a0f4" : "transparent")};
  color: ${({ active }) => (active ? "#fff" : "#000")};
  cursor: pointer;
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  border-radius: 6px 6px 0 0;
  margin-right: 5px;

  &:hover {
    background: #4a82d9;
    color: #fff;
  }
`;

const SurveyList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SurveyItem = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 20px;
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

const SurveyTitle = styled.h2`
  font-size: 18px;
  margin: 0 0 5px 0;
`;

const SurveyText = styled.p`
  font-size: 14px;
  color: #666;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const ApproveButton = styled.button`
  padding: 8px 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const RejectButton = styled.button`
  padding: 8px 12px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background-color: #e53935;
  }
`;

const Administrator = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("pending");
  const [surveys, setSurveys] = useState(
    surveyData.map((survey, index) => ({
      ...survey,
      id: index + 1,
      status: "pending",
    }))
  );

  const handleStatusChange = (id, status) => {
    setSurveys((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
  };

  const filteredSurveys = surveys.filter(
    (survey) => survey.status === activeTab
  );

  return (
    <>
      <Header />
      <Container>
        <Title>관리자 설문 승인 페이지</Title>
        <TabsContainer>
          <Tab
            active={activeTab === "approved"}
            onClick={() => setActiveTab("approved")}
          >
            승인됨
          </Tab>
          <Tab
            active={activeTab === "rejected"}
            onClick={() => setActiveTab("rejected")}
          >
            거절됨
          </Tab>
          <Tab
            active={activeTab === "pending"}
            onClick={() => setActiveTab("pending")}
          >
            대기 중
          </Tab>
        </TabsContainer>

        <SurveyList>
          {filteredSurveys.map((item) => (
            <SurveyItem
              key={item.id}
              onClick={() =>
                navigate("/administrator/detail", {
                  state: {
                    id: item.id,
                    country: item.country,
                    category: item.category,
                    entityName: item.title,
                    imageUrl: item.image,
                    captions: item.caption || [],
                    createdBy: item.createdBy,
                  },
                })
              }
            >
              <SurveyImage src={item.image} alt={item.title} />
              <SurveyContent>
                <SurveyTitle>{item.title}</SurveyTitle>
                <SurveyText>
                  국가: {item.country} / 분류: {item.category}
                </SurveyText>
                <SurveyText>
                  등록자: <strong>{item.createdBy || "알 수 없음"}</strong>
                </SurveyText>
              </SurveyContent>
              {activeTab === "pending" && (
                <ButtonGroup>
                  <ApproveButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStatusChange(item.id, "approved");
                    }}
                  >
                    승인
                  </ApproveButton>
                  <RejectButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStatusChange(item.id, "rejected");
                    }}
                  >
                    거절
                  </RejectButton>
                </ButtonGroup>
              )}
            </SurveyItem>
          ))}
          {filteredSurveys.length === 0 && <p>표시할 설문이 없습니다.</p>}
        </SurveyList>
      </Container>
    </>
  );
};

export default Administrator;
