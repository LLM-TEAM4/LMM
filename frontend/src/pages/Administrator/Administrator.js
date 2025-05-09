// 📄 Administrator.js
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
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
`;

const TabLeft = styled.div`
  display: flex;
`;

const Tab = styled.button`
  padding: 10px 20px;
  border: none;
  background: ${({ $active }) => ($active ? "#68a0f4" : "transparent")};
  color: ${({ $active }) => ($active ? "#fff" : "#000")};
  cursor: pointer;
  font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
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
  position: relative;

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

const StatisticsButton = styled.button`
  padding: 8px 12px;
  background-color: #ff9800;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #f57c00;
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

const DropdownWrapper = styled.div`
  position: relative;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 110%;
  right: 0;
  background-color: white;
  border: none;
  border-radius: 8px;
  padding: 10px;
  min-width: 180px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  z-index: 10;
`;

const DropdownButton = styled.button`
  display: block;
  width: 100%;
  background: none;
  border: none;
  text-align: left;
  padding: 8px 10px;
  font-size: 14px;
  color: #333;
  cursor: pointer;

  &:hover {
    background-color: #f0f4ff;
  }
`;

const Administrator = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("pending");
  const [openMenuId, setOpenMenuId] = useState(null);

  const [surveys, setSurveys] = useState(
    surveyData.map((survey, index) => ({
      ...survey,
      id: index + 1,
      status: "pending",
      rejectReason: "",
    }))
  );

  const handleStatusChange = (id, status) => {
    if (status === "rejected") {
      const reason = prompt("거절 사유를 입력하세요:");
      if (!reason) return;

      setSurveys((prev) =>
        prev.map((s) =>
          s.id === id ? { ...s, status: "rejected", rejectReason: reason } : s
        )
      );
    } else {
      setSurveys((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status: "approved" } : s))
      );
    }
    setOpenMenuId(null);
  };

  const filteredSurveys = surveys.filter((s) => s.status === activeTab);

  return (
    <>
      <Header />
      <Container>
        <Title>관리자 설문 승인 페이지</Title>
        <TabsContainer>
          <TabLeft>
            <Tab
              $active={activeTab === "approved"}
              onClick={() => setActiveTab("approved")}
            >
              승인됨
            </Tab>
            <Tab
              $active={activeTab === "rejected"}
              onClick={() => setActiveTab("rejected")}
            >
              거절됨
            </Tab>
            <Tab
              $active={activeTab === "pending"}
              onClick={() => setActiveTab("pending")}
            >
              대기 중
            </Tab>
          </TabLeft>
          <DropdownWrapper>
            <StatisticsButton
              onClick={() =>
                setOpenMenuId(openMenuId === "global" ? null : "global")
              }
            >
              📊 통합 통계 보기 ⬇
            </StatisticsButton>
            {openMenuId === "global" && (
              <DropdownMenu>
                <DropdownButton
                  onClick={() =>
                    navigate("/administrator/statistics/summary/country")
                  }
                >
                  ▶ 국가별 통계
                </DropdownButton>
                <DropdownButton
                  onClick={() =>
                    navigate("/administrator/statistics/summary/category")
                  }
                >
                  ▶ 카테고리별 통계
                </DropdownButton>
                <DropdownButton
                  onClick={() =>
                    navigate("/administrator/statistics/summary/overall")
                  }
                >
                  ▶ 전체 설문 요약
                </DropdownButton>
              </DropdownMenu>
            )}
          </DropdownWrapper>
        </TabsContainer>

        <SurveyList>
          {filteredSurveys.map((item) => (
            <SurveyItem
              key={item.id}
              onClick={() =>
                navigate(`/administrator/detail/${item.id}`, {
                  state: item,
                })
              }
            >
              <SurveyImage src={item.imageUrl} alt={item.entityName} />
              <SurveyContent>
                <SurveyTitle>{item.entityName}</SurveyTitle>
                <SurveyText>
                  국가: {item.country} / 분류: {item.category}
                </SurveyText>
                <SurveyText>
                  등록자: <strong>{item.admin || "알 수 없음"}</strong>
                </SurveyText>
                {activeTab === "rejected" && item.rejectReason && (
                  <SurveyText>❌ 거절 사유: {item.rejectReason}</SurveyText>
                )}
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

              {activeTab === "approved" && (
                <ButtonGroup>
                  <ApproveButton
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/administrator/result/${item.id}`);
                    }}
                  >
                    결과 보기
                  </ApproveButton>
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
