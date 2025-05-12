// 관리자 메인 대시보드 UI 예시 (승인요청 목록 + 통계 보기)
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "../../components/AdminHeader";
import StatisticsPreviewGrid from "../../components/StatisticsPreviewGrid";
import surveyData from "../../data/SurveyData";

const DashboardContainer = styled.div`
  padding: 100px 40px;
  background-color: #f5f7fa;
  min-height: 100vh;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-size: 20px;
  margin-bottom: 15px;
`;

const Description = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: #649eff;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  font-weight: bold;
  align-self: flex-start;

  &:hover {
    background-color: #4a82d9;
  }
`;

const AdminDashboard = () => {
  const navigate = useNavigate();

  // 승인 대기 설문 필터링
  const pendingSurveys = surveyData.filter((s) => s.status === "pending");

  return (
    <>
      <Header />
      <DashboardContainer>
        <h1>관리자 페이지</h1>
        <Grid>
          <Card>
            <Title>승인 요청된 설문조사</Title>
            <Description>
              총 <strong>{pendingSurveys.length}</strong>개의 설문조사가 승인
              대기 중입니다.
            </Description>

            {/* 미리보기 리스트 */}
            <ul style={{ marginBottom: "20px", paddingLeft: "20px" }}>
              {pendingSurveys.slice(0, 3).map((s) => (
                <li key={s._id} style={{ fontSize: "13px", color: "#444" }}>
                  설문조사 &gt; {s.country} &gt; {s.category}
                </li>
              ))}
              {pendingSurveys.length > 3 && (
                <li style={{ fontSize: "13px", color: "#999" }}>
                  ...외 {pendingSurveys.length - 3}개
                </li>
              )}
            </ul>

            <Button onClick={() => navigate("/administrator/requests")}>
              승인 요청 보기
            </Button>
          </Card>

          <Card>
            <Title>설문 통계 보기</Title>
            <Description>
              국가별, 카테고리별, 전체 설문 통계를 확인할 수 있어요.
            </Description>
            <Button
              onClick={() =>
                navigate("/administrator/statistics/summary/overall")
              }
            >
              통계 페이지 이동
            </Button>
          </Card>
        </Grid>
        <StatisticsPreviewGrid />
      </DashboardContainer>
    </>
  );
};

export default AdminDashboard;
